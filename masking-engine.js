"use strict";

/**
 * Masking Engine - マスキングエンジンのコア機能
 */

export function normalizeRegexPattern(pattern) {
  let flags = "g";
  let value = pattern;
  let consumed = true;
  while (consumed) {
    consumed = false;
    const match = value.match(/^\(\?([a-zA-Z]+)\)/);
    if (match) {
      consumed = true;
      value = value.slice(match[0].length);
      const raw = match[1];
      if (raw.includes("i")) flags += "i";
      if (raw.includes("m")) flags += "m";
      if (raw.includes("s")) flags += "s";
      if (raw.includes("u")) flags += "u";
      if (raw.includes("y")) flags += "y";
    }
  }
  return { value, flags };
}

export function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildRuleRegex(rule) {
  const normalized = normalizeRegexPattern(rule.pattern);
  return new RegExp(normalized.value, normalized.flags);
}

function formatCount(value, width) {
  const raw = String(value);
  if (!width || width <= raw.length) {
    return raw;
  }
  return raw.padStart(width, "0");
}

export class PlaceholderMap {
  constructor(sessionId, includeSessionId) {
    this.dictionaryId = sessionId;
    this.includeSessionId = Boolean(includeSessionId);
    this.sessionId = this.includeSessionId ? this.dictionaryId : "";
    this.maps = {};
    this.counts = {};
  }
  get(key, raw, prefix, width) {
    if (!this.maps[key]) {
      this.maps[key] = {};
      this.counts[key] = 0;
    }
    const bucket = this.maps[key];
    if (bucket[raw]) {
      return bucket[raw];
    }
    this.counts[key] += 1;
    const suffix = `${prefix}:${formatCount(this.counts[key], width)}`;
    const value = this.includeSessionId
      ? `{{${this.sessionId}:${suffix}}}`
      : `{{${suffix}}}`;
    bucket[raw] = value;
    return value;
  }
  getDictionary() {
    const mappings = {};
    for (const key in this.maps) {
      const bucket = this.maps[key];
      for (const original in bucket) {
        const masked = bucket[original];
        mappings[masked] = original;
      }
    }
    return {
      version: "1.0",
      session_id: this.includeSessionId ? this.sessionId : "",
      created_at: new Date().toISOString(),
      mappings: mappings
    };
  }
}

function buildDictionarySignaturePayload(dictionary) {
  if (!dictionary || typeof dictionary !== "object") {
    return null;
  }
  const mappings = dictionary.mappings && typeof dictionary.mappings === "object"
    ? dictionary.mappings
    : {};
  const sortedKeys = Object.keys(mappings).sort();
  const sortedMappings = {};
  for (const key of sortedKeys) {
    sortedMappings[key] = mappings[key];
  }
  const payload = {
    version: dictionary.version || "1.0",
    session_id: dictionary.session_id || "",
    created_at: dictionary.created_at || "",
    mappings: sortedMappings
  };
  return JSON.stringify(payload);
}

export async function computeDictionarySignature(dictionary) {
  const payload = buildDictionarySignaturePayload(dictionary);
  if (!payload) {
    return null;
  }
  if (
    !window.crypto ||
    !window.crypto.subtle ||
    typeof window.TextEncoder === "undefined"
  ) {
    return null;
  }
  const bytes = new TextEncoder().encode(payload);
  const hash = await window.crypto.subtle.digest("SHA-256", bytes);
  const hex = Array.from(new Uint8Array(hash))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
  return `sha256:${hex}`;
}
