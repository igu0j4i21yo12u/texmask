(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const ui = {
  inputText: document.getElementById("inputText"),
  outputText: document.getElementById("outputText"),
  maskForwardBtn: document.getElementById("maskForwardBtn"),
  unmaskBackwardBtn: document.getElementById("unmaskBackwardBtn"),
  savePlainTextBtn: document.getElementById("savePlainTextBtn"),
  plainTextUploadBtn: document.getElementById("plainTextUploadBtn"),
  plainTextFile: document.getElementById("plainTextFile"),
  maskedTextUploadBtn: document.getElementById("maskedTextUploadBtn"),
  unmaskDictUploadBtn: document.getElementById("unmaskDictUploadBtn"),
  unmaskDictStatus: document.getElementById("unmaskDictStatus"),
  copyBtn: document.getElementById("copyBtn"),
  clearBtn: document.getElementById("clearBtn"),
  sampleSelect: document.getElementById("sampleSelect"),
  useRandomSessionId: document.getElementById("useRandomSessionId"),
  regenSessionId: document.getElementById("regenSessionId"),
  dictDefaultPrefix: document.getElementById("dictDefaultPrefix"),
  dictRows: document.getElementById("dictRows"),
  dictAddRow: document.getElementById("dictAddRow"),
  dictImportBasic: document.getElementById("dictImportBasic"),
  dictTableStatus: document.getElementById("dictTableStatus"),
  ruleList: document.getElementById("ruleList"),
  toggleAllBtn: document.getElementById("toggleAllBtn"),
  resetOrderBtn: document.getElementById("resetOrderBtn"),
  presetSelect: document.getElementById("presetSelect"),
  presetLoad: document.getElementById("presetLoad"),
  presetDelete: document.getElementById("presetDelete"),
  presetName: document.getElementById("presetName"),
  presetSave: document.getElementById("presetSave"),
  presetDock: document.getElementById("presetDock"),
  presetToggle: document.getElementById("presetToggle"),
  presetPanel: document.getElementById("presetPanel"),
  presetClose: document.getElementById("presetClose"),
  presetExport: document.getElementById("presetExport"),
  presetImport: document.getElementById("presetImport"),
  presetImportFile: document.getElementById("presetImportFile"),
  presetStatus: document.getElementById("presetStatus"),
  stats: document.getElementById("stats"),
  appStats: document.getElementById("appStats"),
  saveMaskedTextBtn: document.getElementById("saveMaskedTextBtn"),
  tabs: document.querySelectorAll(".tab"),
  tabPanels: document.querySelectorAll(".tab-panel"),
  useAddressDict: document.getElementById("useAddressDict"),
  addressDictVersion: document.getElementById("addressDictVersion"),
  addressDictSource: document.getElementById("addressDictSource"),
  addressDictCount: document.getElementById("addressDictCount"),
  addressDictUpdated: document.getElementById("addressDictUpdated"),
  addressTownDictStatus: document.getElementById("addressTownDictStatus"),
  addressPrefectureList: document.getElementById("addressPrefectureList"),
  addressPrefAll: document.getElementById("addressPrefAll"),
  addressPrefNone: document.getElementById("addressPrefNone"),
  addressSearchInput: document.getElementById("addressSearchInput"),
  addressSearchResults: document.getElementById("addressSearchResults"),
  updateAddressDict: document.getElementById("updateAddressDict"),
  resetAddressDict: document.getElementById("resetAddressDict"),
  downloadDictBtn: document.getElementById("downloadDictBtn"),
  unmaskTextFile: document.getElementById("unmaskTextFile"),
  unmaskTextDrop: document.getElementById("unmaskTextDrop"),
  unmaskDictFile: document.getElementById("unmaskDictFile"),
  unmaskDictDrop: document.getElementById("unmaskDictDrop"),
  unmaskStats: document.getElementById("unmaskStats"),
  // Text Dictionary
  textDictAddBtn: document.getElementById("textDictAddBtn"),
  textDictForm: document.getElementById("textDictForm"),
  textDictFormTitle: document.getElementById("textDictFormTitle"),
  textDictLabel: document.getElementById("textDictLabel"),
  textDictPriority: document.getElementById("textDictPriority"),
  textDictContent: document.getElementById("textDictContent"),
  textDictFileInput: document.getElementById("textDictFileInput"),
  textDictFileFormatRow: document.getElementById("textDictFileFormatRow"),
  textDictFileRow: document.getElementById("textDictFileRow"),
  textDictTextareaRow: document.getElementById("textDictTextareaRow"),
  textDictInputModeRadios: document.getElementsByName("textDictInputMode"),
  textDictFileFormatRadios: document.getElementsByName("textDictFileFormat"),
  textDictCancelBtn: document.getElementById("textDictCancelBtn"),
  textDictSubmitBtn: document.getElementById("textDictSubmitBtn"),
  textDictList: document.getElementById("textDictList"),
  textDictListEmpty: document.getElementById("textDictListEmpty")
};
function updateStatusDisplay(message, isError = false) {
  ui.stats.textContent = message;
  ui.stats.classList.toggle("error", isError);
}
function updateDictTableStatusDisplay(message) {
  if (!ui.dictTableStatus) {
    return;
  }
  ui.dictTableStatus.textContent = message || "";
}
function updatePresetStatusDisplay(message, isError = false) {
  if (!ui.presetStatus) {
    return;
  }
  ui.presetStatus.textContent = message || "";
  ui.presetStatus.classList.toggle("error", isError);
}
const brandConfig = {
  productName: "TextMasker",
  pageTitle: "TextMasker - 簡単秘匿情報マスキング",
  logoText: "TextMasker",
  eyebrow: "簡単秘匿情報マスキング",
  ledeLines: [
    "業務で扱う機密情報を、ブラウザ内で安全にマスキングします。",
    "外部へのデータ送信は行っておりませんので、ローカルにダウンロードすればインターネット接続がなくても動作します。"
  ],
  demoUrl: "https://igs-service.github.io/textmasker/",
  demoLabel: "デモサイト（ブラウザで試す）",
  repoUrl: "https://github.com/igs-service/textmasker",
  repoLabel: "GitHubから取得",
  zipUrl: "https://github.com/igs-service/textmasker/releases/latest/download/TextMasker-latest.zip",
  zipLabel: "ZIPでダウンロード",
  footerText: "IGS LLC.",
  footerLinkUrl: "https://github.com/igs-service",
  footerLinkLabel: "TextMasker"
};
function getBrandConfig() {
  return brandConfig || {};
}
function getAppFilenameBase() {
  const config = getBrandConfig();
  return config.productName || "TexMask";
}
function setText(id, value) {
  if (!value) {
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}
function setLink(id, url, label) {
  const el = document.getElementById(id);
  if (!el) {
    return;
  }
  if (!url) {
    el.hidden = true;
    return;
  }
  el.href = url;
  if (label) {
    el.textContent = label;
  }
  el.hidden = false;
}
function applyBrandConfig() {
  const config = getBrandConfig();
  document.title = config.pageTitle || config.productName || document.title;
  setText("brandTitle", config.logoText || config.productName);
  setText("brandEyebrow", config.eyebrow);
  const lede = document.getElementById("brandLede");
  if (lede && Array.isArray(config.ledeLines)) {
    lede.textContent = config.ledeLines.join("\n");
  }
  setLink("demoLink", config.demoUrl, config.demoLabel || "デモサイト");
  setLink("repoLink", config.repoUrl, config.repoLabel || "GitHubから取得");
  setLink("zipLink", config.zipUrl, config.zipLabel || "ZIPでダウンロード");
  const footerEl = document.getElementById("footerText");
  if (footerEl) {
    const baseText = (footerEl.textContent || "").trim();
    const extraText = (config.footerText || "").trim();
    const linkLabel = (config.footerLinkLabel || "").trim();
    if (extraText && extraText !== linkLabel) {
      const lowerExtra = extraText.toLowerCase();
      const replaceBase = lowerExtra.startsWith("copyright") || extraText.includes("©");
      footerEl.textContent = replaceBase || !baseText ? extraText : `${baseText} ${extraText}`;
    }
  }
  setLink("footerLink", config.footerLinkUrl, config.footerLinkLabel);
}
const STORAGE_KEY = "masking-web-state-v1";
const PRESET_KEY = "masking-web-presets-v1";
const ADDRESS_DICT_CUSTOM_KEY = "masking-web-address-dict-custom-v1";
const ADDRESS_PREF_SELECTION_KEY = "masking-web-address-pref-selection-v1";
const TEXT_DICT_KEY = "masking-web-text-dict-v1";
const ADDRESS_DICT_LOCAL_URL = "data/address-dict.json";
const ADDRESS_TOWN_DICT_URL = "data/address-town-dict.json";
const GEOLONIA_API_URL = "https://geolonia.github.io/japanese-addresses/api/ja.json";
const ASYNC_MASK_THRESHOLD = 2e4;
const COPY_FEEDBACK_DURATION_MS = 1200;
const SESSION_ID_LENGTH = 4;
const ADDRESS_PATTERN_CHUNK_SIZE = 2e3;
const ADDRESS_SEARCH_LIMIT = 50;
const DICT_IMPORT_BACKUP_PREFIX = "転記前バックアップ";
const TEXT_DICT_MAX_LABELS = 10;
const TEXT_DICT_MAX_ROWS_PER_LABEL = 1e5;
const ADDRESS_PREFECTURES = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県"
];
const ADDRESS_PREFECTURES_SORTED = [...ADDRESS_PREFECTURES].sort(
  (left, right) => right.length - left.length
);
let addressPatterns = null;
let addressPatternChunks = [];
let addressCityPatterns = null;
let addressCityPatternsByPref = /* @__PURE__ */ new Map();
let addressTownPatternsByPref = null;
let addressTownPrefectures = null;
let addressDictLoadPromise = null;
let addressTownDictLoadPromise = null;
let addressSelectedPrefs = null;
let currentSessionId = null;
let currentMaskDictionary = null;
let currentUnmaskDictionary = null;
let maskRunId = 0;
let textDictionaries = [];
const state = {
  rules: []
};
function buildStatePayload(readDictRows2) {
  var _a;
  return {
    inputText: ui.inputText.value,
    sampleSelect: ui.sampleSelect.value,
    useRandomSessionId: ((_a = ui.useRandomSessionId) == null ? void 0 : _a.checked) ?? true,
    dictDefaultPrefix: ui.dictDefaultPrefix.value,
    dictRows: readDictRows2 ? readDictRows2() : [],
    rules: state.rules.map((rule) => ({
      name: rule.name,
      enabled: rule.enabled
    })),
    rulesOrder: state.rules.map((rule) => rule.name)
  };
}
function applyStatePayload(payload, baseRules2) {
  if (!payload || typeof payload !== "object") {
    return { dictRowsData: null, needsRulesRender: false };
  }
  let dictRowsData = null;
  let needsRulesRender = false;
  if (typeof payload.inputText === "string") {
    ui.inputText.value = payload.inputText;
  }
  if (typeof payload.sampleSelect === "string") {
    ui.sampleSelect.value = payload.sampleSelect;
  }
  if (typeof payload.useRandomSessionId === "boolean" && ui.useRandomSessionId) {
    ui.useRandomSessionId.checked = payload.useRandomSessionId;
  }
  if (typeof payload.dictDefaultPrefix === "string") {
    ui.dictDefaultPrefix.value = payload.dictDefaultPrefix;
  }
  if (Array.isArray(payload.dictRows)) {
    dictRowsData = payload.dictRows;
  }
  if (Array.isArray(payload.rules) && baseRules2) {
    const enabledMap = new Map(
      payload.rules.map((rule) => [rule.name, rule.enabled])
    );
    state.rules = baseRules2.map((rule) => ({
      ...rule,
      enabled: enabledMap.has(rule.name) ? enabledMap.get(rule.name) : true
    }));
    needsRulesRender = true;
  }
  if (Array.isArray(payload.rulesOrder)) {
    const orderMap = new Map(
      payload.rulesOrder.map((name, idx) => [name, idx])
    );
    state.rules.sort((a, b) => {
      const aPos = orderMap.has(a.name) ? orderMap.get(a.name) : Number.MAX_SAFE_INTEGER;
      const bPos = orderMap.has(b.name) ? orderMap.get(b.name) : Number.MAX_SAFE_INTEGER;
      return aPos - bPos;
    });
  }
  return { dictRowsData, needsRulesRender };
}
function buildPresetPayload(readDictRows2) {
  const payload = buildStatePayload(readDictRows2);
  payload.inputText = "";
  payload.sampleSelect = "";
  return payload;
}
function persistState(readDictRows2) {
  try {
    const payload = buildStatePayload(readDictRows2);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn("Failed to persist state to localStorage:", err);
  }
}
function restoreState(baseRules2) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { dictRowsData: null, needsRulesRender: false };
    }
    const payload = JSON.parse(raw);
    return applyStatePayload(payload, baseRules2);
  } catch (err) {
    console.warn("Failed to restore state from localStorage:", err);
    return { dictRowsData: null, needsRulesRender: false };
  }
}
function setAddressPatterns(value) {
  addressPatterns = value;
}
function setAddressPatternChunks(value) {
  addressPatternChunks = value;
}
function setAddressCityPatterns(value) {
  addressCityPatterns = value;
}
function setAddressCityPatternsByPref(value) {
  addressCityPatternsByPref = value;
}
function setAddressTownPatternsByPref(value) {
  addressTownPatternsByPref = value;
}
function setAddressTownPrefectures(value) {
  addressTownPrefectures = value;
}
function setAddressDictLoadPromise(value) {
  addressDictLoadPromise = value;
}
function setAddressTownDictLoadPromise(value) {
  addressTownDictLoadPromise = value;
}
function setAddressSelectedPrefs(value) {
  addressSelectedPrefs = value;
}
function setCurrentSessionId(value) {
  currentSessionId = value;
}
function setCurrentMaskDictionary(value) {
  currentMaskDictionary = value;
}
function setCurrentUnmaskDictionary(value) {
  currentUnmaskDictionary = value;
}
function incrementMaskRunId() {
  maskRunId++;
  return maskRunId;
}
function setTextDictionaries(value) {
  textDictionaries = value;
}
function sanitizeFileName(name) {
  return name.replace(/[\\/:*?"<>|]/g, "_").trim() || "config";
}
function formatTimestampForFilename(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(
    date.getDate()
  )}-${pad(date.getHours())}${pad(date.getMinutes())}`;
}
function saveMaskedOutput() {
  const value = ui.outputText.value;
  if (!value) {
    updateStatusDisplay("保存するテキストがありません。", true);
    return;
  }
  const timestamp = formatTimestampForFilename(/* @__PURE__ */ new Date());
  const baseName = getAppFilenameBase();
  const blob = new Blob([value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${baseName}_${timestamp}_masked.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  updateStatusDisplay("マスク後テキストを保存しました。");
}
function savePlainOutput() {
  const value = ui.inputText.value;
  if (!value) {
    updateStatusDisplay("保存するテキストがありません。", true);
    return;
  }
  const timestamp = formatTimestampForFilename(/* @__PURE__ */ new Date());
  const baseName = getAppFilenameBase();
  const blob = new Blob([value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${baseName}_${timestamp}_plain.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  updateStatusDisplay("テキストを保存しました。");
}
function loadPlainTextFile(file, readDictRows2) {
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const content = typeof reader.result === "string" ? reader.result : "";
    ui.inputText.value = content;
    persistState(readDictRows2);
  };
  reader.onerror = () => {
    updateStatusDisplay("ファイルの読み込みに失敗しました。", true);
  };
  reader.readAsText(file, "utf-8");
}
function parseImportedPayload(raw) {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  if (raw.payload && typeof raw.payload === "object") {
    return { name: raw.name || "", payload: raw.payload };
  }
  return { name: raw.name || "", payload: raw };
}
function exportPresetToFile(resolveExportName2, readDictRows2) {
  const name = resolveExportName2();
  if (!name) {
    updateStatusDisplay("設定名を入力してください。", true);
    return;
  }
  const payload = buildPresetPayload(readDictRows2);
  const exportPayload = {
    name,
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    payload
  };
  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${sanitizeFileName(name)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  updateStatusDisplay(`設定「${name}」をJSONに保存しました。`);
}
function importPresetFromFile(file, baseRules2, renderRules2, renderDictRows2, readDictRows2, scheduleMask2) {
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      const parsed = parseImportedPayload(data);
      if (!parsed || !parsed.payload) {
        throw new Error("invalid payload");
      }
      const result = applyStatePayload(parsed.payload, baseRules2);
      if (result.dictRowsData && renderDictRows2) {
        renderDictRows2(result.dictRowsData, scheduleMask2);
      }
      if (result.needsRulesRender && renderRules2) {
        renderRules2(readDictRows2, scheduleMask2);
      }
      persistState(readDictRows2);
      if (scheduleMask2) scheduleMask2();
      if (parsed.name) {
        ui.presetName.value = parsed.name;
      } else {
        ui.presetName.value = "";
      }
      updateStatusDisplay("JSON設定を読み込みました。");
    } catch (err) {
      updateStatusDisplay("JSONの読み込みに失敗しました。", true);
    } finally {
      ui.presetImportFile.value = "";
    }
  };
  reader.onerror = () => {
    updateStatusDisplay("JSONの読み込みに失敗しました。", true);
    ui.presetImportFile.value = "";
  };
  reader.readAsText(file, "utf-8");
}
async function copyOutput() {
  const value = ui.outputText.value;
  if (!value) {
    return;
  }
  try {
    await navigator.clipboard.writeText(value);
    ui.copyBtn.textContent = "コピー済み";
    setTimeout(() => {
      ui.copyBtn.textContent = "コピー";
    }, COPY_FEEDBACK_DURATION_MS);
  } catch (err) {
    console.warn("Failed to copy to clipboard:", err);
    ui.copyBtn.textContent = "失敗";
    setTimeout(() => {
      ui.copyBtn.textContent = "コピー";
    }, COPY_FEEDBACK_DURATION_MS);
  }
}
function normalizeRegexPattern(pattern) {
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
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function buildRuleRegex(rule) {
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
class PlaceholderMap {
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
    const value = this.includeSessionId ? `{{${this.sessionId}:${suffix}}}` : `{{${suffix}}}`;
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
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      mappings
    };
  }
}
function buildDictionarySignaturePayload(dictionary) {
  if (!dictionary || typeof dictionary !== "object") {
    return null;
  }
  const mappings = dictionary.mappings && typeof dictionary.mappings === "object" ? dictionary.mappings : {};
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
async function computeDictionarySignature(dictionary) {
  const payload = buildDictionarySignaturePayload(dictionary);
  if (!payload) {
    return null;
  }
  if (!window.crypto || !window.crypto.subtle || typeof window.TextEncoder === "undefined") {
    return null;
  }
  const bytes = new TextEncoder().encode(payload);
  const hash = await window.crypto.subtle.digest("SHA-256", bytes);
  const hex = Array.from(new Uint8Array(hash)).map((value) => value.toString(16).padStart(2, "0")).join("");
  return `sha256:${hex}`;
}
async function downloadDictionary() {
  if (!currentMaskDictionary) {
    updateStatusDisplay("マスク実行後に辞書をダウンロードできます。", true);
    return;
  }
  try {
    if (!currentMaskDictionary.signature) {
      const signature = await computeDictionarySignature(
        currentMaskDictionary
      );
      if (signature) {
        currentMaskDictionary.signature = signature;
        updateUnmaskDictStatus(currentMaskDictionary);
      }
    }
    const blob = new Blob(
      [JSON.stringify(currentMaskDictionary, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const baseName = getAppFilenameBase();
    link.download = `${baseName}_${formatTimestampForFilename(/* @__PURE__ */ new Date())}_unmask.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    updateStatusDisplay("辞書をダウンロードしました。");
  } catch (err) {
    updateStatusDisplay("辞書のダウンロードに失敗しました。", true);
    console.error("Dictionary download failed:", err);
  }
}
function getUnmaskSource() {
  return ui.outputText;
}
function getUnmaskTarget() {
  return ui.inputText;
}
function unmaskText(dictionary) {
  const source = getUnmaskSource();
  const target = getUnmaskTarget();
  if (!source || !target) {
    return;
  }
  const input = source.value || "";
  if (!input.trim()) {
    target.value = "";
    updateUnmaskStatusDisplay("入力テキストが空です。");
    return;
  }
  if (!dictionary || !dictionary.mappings) {
    target.value = "";
    updateUnmaskStatusDisplay("辞書が読み込まれていません。", true);
    updateUnmaskDictStatus(null);
    return;
  }
  let output = input;
  const stats = [];
  for (const [mask, original] of Object.entries(dictionary.mappings)) {
    const escapedMask = escapeRegExp(mask);
    const regex = new RegExp(escapedMask, "g");
    const matches = output.match(regex);
    if (matches) {
      stats.push({ mask, original, count: matches.length });
      output = output.replace(regex, original);
    }
  }
  const totalCount = stats.reduce((sum, s) => sum + s.count, 0);
  target.value = output;
  updateUnmaskStatusDisplay(`マスク解除件数: ${totalCount}`);
  updateUnmaskDictStatus(dictionary);
}
function updateUnmaskStatusDisplay(message, isError = false) {
  if (ui.unmaskStats) {
    ui.unmaskStats.textContent = message;
    ui.unmaskStats.classList.toggle("error", isError);
  }
}
function updateUnmaskDictStatus(dict) {
  if (!ui.unmaskDictStatus) {
    return;
  }
  if (!dict) {
    ui.unmaskDictStatus.textContent = "ID: (なし)";
    return;
  }
  if (typeof dict.session_id === "string" && dict.session_id) {
    ui.unmaskDictStatus.textContent = `ID: ${dict.session_id}`;
    return;
  }
  const signature = dict.signature;
  if (typeof signature === "string" && signature.length > 0) {
    const normalized = signature.replace(/^sha256:/, "");
    ui.unmaskDictStatus.textContent = `ID: ${normalized.slice(0, 8)}`;
    return;
  }
  ui.unmaskDictStatus.textContent = "ID: (なし)";
}
function loadUnmaskTextFile(file) {
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const content = typeof reader.result === "string" ? reader.result : "";
    const source = getUnmaskSource();
    if (source) {
      source.value = content;
    }
    if (currentUnmaskDictionary) {
      unmaskText(currentUnmaskDictionary);
    }
  };
  reader.onerror = () => {
    updateUnmaskStatusDisplay("テキストファイルの読み込みに失敗しました。", true);
  };
  reader.readAsText(file, "utf-8");
}
async function loadDictionaryFile(file) {
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data.mappings || typeof data.mappings !== "object") {
        throw new Error("辞書フォーマットが不正です");
      }
      if (data.signature) {
        const computed = await computeDictionarySignature(data);
        if (!computed || computed !== data.signature) {
          throw new Error("辞書の署名が一致しません");
        }
      }
      setCurrentUnmaskDictionary(data);
      unmaskText(data);
      updateUnmaskDictStatus(data);
      updateUnmaskStatusDisplay("辞書を読み込みました。");
    } catch (err) {
      updateUnmaskStatusDisplay("辞書の読み込みに失敗しました。", true);
      console.error("Dictionary load failed:", err);
      if (ui.unmaskDictFile) {
        ui.unmaskDictFile.value = "";
      }
    }
  };
  reader.onerror = () => {
    updateUnmaskStatusDisplay("辞書の読み込みに失敗しました。", true);
    if (ui.unmaskDictFile) {
      ui.unmaskDictFile.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}
function setupDropZone(zone, input, handler) {
  if (!zone || !input) {
    return;
  }
  const onDragOver = (event) => {
    event.preventDefault();
    zone.classList.add("is-dragover");
  };
  const onDragLeave = () => {
    zone.classList.remove("is-dragover");
  };
  const onDrop = (event) => {
    var _a, _b;
    event.preventDefault();
    zone.classList.remove("is-dragover");
    const file = (_b = (_a = event.dataTransfer) == null ? void 0 : _a.files) == null ? void 0 : _b[0];
    if (file) {
      handler(file);
    }
  };
  zone.addEventListener("dragover", onDragOver);
  zone.addEventListener("dragleave", onDragLeave);
  zone.addEventListener("drop", onDrop);
  zone.addEventListener("click", () => input.click());
  zone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      input.click();
    }
  });
}
function initUnmaskFeatures() {
  if (ui.downloadDictBtn) {
    ui.downloadDictBtn.addEventListener("click", downloadDictionary);
  }
  if (ui.maskedTextUploadBtn && ui.unmaskTextFile) {
    ui.maskedTextUploadBtn.addEventListener("click", () => {
      ui.unmaskTextFile.click();
    });
  }
  if (ui.unmaskDictUploadBtn && ui.unmaskDictFile) {
    ui.unmaskDictUploadBtn.addEventListener("click", () => {
      ui.unmaskDictFile.click();
    });
  }
  if (ui.unmaskTextFile) {
    ui.unmaskTextFile.addEventListener("change", () => {
      var _a;
      loadUnmaskTextFile((_a = ui.unmaskTextFile.files) == null ? void 0 : _a[0]);
      ui.unmaskTextFile.value = "";
    });
  }
  if (ui.unmaskDictFile) {
    ui.unmaskDictFile.addEventListener("change", () => {
      var _a;
      loadDictionaryFile((_a = ui.unmaskDictFile.files) == null ? void 0 : _a[0]);
      ui.unmaskDictFile.value = "";
    });
  }
  setupDropZone(ui.unmaskTextDrop, ui.unmaskTextFile, loadUnmaskTextFile);
  setupDropZone(ui.unmaskDictDrop, ui.unmaskDictFile, loadDictionaryFile);
  updateUnmaskDictStatus(currentUnmaskDictionary);
}
const RULE_EXAMPLES = {
  ipv4_subnet_pair: "192.168.0.1 255.255.255.0",
  aws_account_id: "123456789012",
  azure_subscription_id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
  jwt_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx.yyy",
  cidr_ipv4: "10.0.0.0/24 / 192.168.1.0/25",
  cidr_ipv6: "2001:db8::/32 / 2001:db8:1::/48 / 2001:0db8:85a3::/64",
  ipv6_address: "2001:db8::1 / fe80::1 / 2001:0db8:85a3:0000:0000:8a2e:0370:7334",
  ip_address: "192.168.0.10 / 10.0.5.12",
  email: "user@example.com / ops+alert@example.co.jp",
  fqdn: "app.internal.example.com / db-01.prod.example.co.jp",
  contract_number: "AB-1234 / XYZ-98765",
  phone_jp: "03-1234-5678 / 03 1234 5678 / (03)1234-5678 / 0120-123-456 / 090-1234-5678",
  phone_intl: "+1 212 555 1234 / +44 20 7946 0958 / +81 3 1234 5678 / +49-30-1234-5678",
  api_key: "XyZ123abcDEF456ghiJKL789mnoPQR012 / abcDEF1234567890GHIJklmnopQRSTuv",
  gcp_project_id: "sample-prod-001 / personal-ops-2024",
  postal_code_jp: "100-0001 / 123-4567"
};
const SAMPLE_DATA = {
  address: [
    "顧客: さくら情報システム",
    "担当: 佐藤 太郎 <taro.sato@example.com>",
    "所在地: 〒100-0001 東京都千代田区千代田1-1",
    "電話: 03-1234-5678",
    "サーバー: web-01.internal.example.com (192.168.0.10)",
    "",
    "顧客: みずほデータサービス",
    "担当: 鈴木 花子 <hanako.suzuki@example.com>",
    "所在地: 〒150-0002 東京都渋谷区渋谷2-2",
    "電話: 03-5678-9012",
    "サーバー: app-02.internal.example.com (10.0.5.12)",
    "",
    "顧客: こだまソリューションズ",
    "担当: 高橋 健 <ken.takahashi@example.com>",
    "所在地: 〒530-0001 大阪府大阪市北区梅田1-1",
    "電話: 06-1234-5678",
    "サーバー: db-01.internal.example.com (172.16.10.20)",
    "",
    "顧客: しらさぎネットワーク",
    "担当: 伊藤 愛 <ai.ito@example.com>",
    "所在地: 〒060-0001 北海道札幌市中央区北1条西1丁目",
    "電話: 011-234-5678",
    "サーバー: cache-03.internal.example.com (192.168.1.25)",
    "",
    "顧客: つばさ工業",
    "担当: 渡辺 翔 <sho.watanabe@example.com>",
    "所在地: 〒460-0002 愛知県名古屋市中区丸の内2-2",
    "電話: 052-123-4567",
    "サーバー: api-01.internal.example.com (10.1.2.3)",
    "",
    "顧客: ひかり情報サービス",
    "担当: 中村 彩 <aya.nakamura@example.com>",
    "所在地: 〒730-0001 広島県広島市中区基町1-1",
    "電話: 082-987-6543",
    "サーバー: app-10.internal.example.com (192.168.10.10)",
    "",
    "顧客: さつきリサーチ",
    "担当: 小林 優 <yu.kobayashi@example.com>",
    "所在地: 〒980-0001 宮城県仙台市青葉区中央1-1",
    "電話: 022-555-0101",
    "サーバー: web-08.internal.example.com (10.2.3.4)",
    "",
    "顧客: みなみ物流",
    "担当: 加藤 海 <kai.kato@example.com>",
    "所在地: 〒900-0001 沖縄県那覇市久茂地1-1",
    "電話: 098-123-4567",
    "サーバー: log-05.internal.example.com (172.20.0.5)",
    "",
    "顧客: やまと通信",
    "担当: 吉田 凛 <rin.yoshida@example.com>",
    "所在地: 〒810-0001 福岡県福岡市中央区天神1-1",
    "電話: 092-111-2222",
    "サーバー: proxy-02.internal.example.com (192.168.5.5)",
    "",
    "顧客: もみじテクノ",
    "担当: 山本 悠 <haruka.yamamoto@example.com>",
    "所在地: 〒220-0001 神奈川県横浜市西区みなとみらい1-1",
    "電話: 045-333-4444",
    "サーバー: gateway-01.internal.example.com (10.10.10.10)"
  ].join("\n"),
  config: [
    "primary_host=app.internal.example.com",
    "primary_ip=10.0.5.12",
    "backup_cidr=10.0.0.0/24",
    "support_email=helpdesk@example.com",
    "contract=AB-1234",
    "office_phone=03-9999-0000",
    "ipv6_host=2001:db8::1",
    "",
    "auth_host=auth.internal.example.com",
    "auth_ip=172.16.0.15",
    "api_cidr=192.168.10.0/24",
    "incident_mail=ops@example.com",
    "contract=ZX-7788",
    "office_phone=06-2222-3333",
    "ipv6_host=2001:db8:abcd::5",
    "",
    "log_host=log.internal.example.com",
    "log_ip=10.2.3.4",
    "backup_cidr=172.20.0.0/16",
    "support_email=desk@example.com",
    "contract=CD-5678",
    "office_phone=052-111-2222",
    "ipv6_host=2001:db8:1::7",
    "",
    "vpn_host=vpn.internal.example.com",
    "vpn_ip=203.0.113.14",
    "backup_cidr=192.0.2.0/24",
    "support_email=netops@example.com",
    "contract=EF-9012",
    "office_phone=045-123-9876",
    "ipv6_host=2001:db8:2::9",
    "",
    "db_host=db.internal.example.com",
    "db_ip=192.168.1.25",
    "backup_cidr=10.1.0.0/16",
    "support_email=db-support@example.com",
    "contract=GH-3456",
    "office_phone=092-555-0101",
    "ipv6_host=2001:db8:3::11",
    "",
    "cache_host=cache.internal.example.com",
    "cache_ip=10.10.10.10",
    "backup_cidr=172.18.0.0/16",
    "support_email=cache@example.com",
    "contract=JK-7890",
    "office_phone=011-777-8888",
    "ipv6_host=2001:db8:4::13",
    "",
    "proxy_host=proxy.internal.example.com",
    "proxy_ip=192.168.5.5",
    "backup_cidr=10.3.0.0/16",
    "support_email=proxy@example.com",
    "contract=LM-2468",
    "office_phone=098-333-4444",
    "ipv6_host=2001:db8:5::15",
    "",
    "report_host=report.internal.example.com",
    "report_ip=172.16.10.20",
    "backup_cidr=192.168.20.0/24",
    "support_email=report@example.com",
    "contract=NP-1357",
    "office_phone=022-111-2222",
    "ipv6_host=2001:db8:6::17",
    "",
    "batch_host=batch.internal.example.com",
    "batch_ip=10.4.5.6",
    "backup_cidr=10.5.0.0/16",
    "support_email=batch@example.com",
    "contract=QR-9753",
    "office_phone=082-555-6677",
    "ipv6_host=2001:db8:7::19",
    "",
    "edge_host=edge.internal.example.com",
    "edge_ip=203.0.113.120",
    "backup_cidr=198.51.100.0/24",
    "support_email=edge@example.com",
    "contract=ST-8642",
    "office_phone=03-5555-6666",
    "ipv6_host=2001:db8:8::21"
  ].join("\n"),
  support: [
    "件名: VPN接続不具合",
    "申請者: 山田 花子 <hanako.yamada@example.com>",
    "会社: ひまわりソフト",
    "対象IP: 203.0.113.14",
    "連絡先: 080-1111-2222",
    "FQDN: vpn.support.example.com",
    "発生時刻: 2024-06-18 09:15",
    "",
    "件名: VPN接続不具合",
    "申請者: 斎藤 修 <osamu.saito@example.com>",
    "会社: きらりテクノ",
    "対象IP: 198.51.100.45",
    "連絡先: 090-3333-4444",
    "FQDN: vpn.kirari.example.com",
    "発生時刻: 2024-06-18 10:42",
    "",
    "件名: VPN接続不具合",
    "申請者: 井上 直 <nao.inoue@example.com>",
    "会社: みなと通信",
    "対象IP: 192.0.2.23",
    "連絡先: 070-5555-6666",
    "FQDN: vpn.minato.example.com",
    "発生時刻: 2024-06-18 11:05",
    "",
    "件名: VPN接続不具合",
    "申請者: 森 結衣 <yui.mori@example.com>",
    "会社: さくら情報システム",
    "対象IP: 203.0.113.88",
    "連絡先: 080-7777-8888",
    "FQDN: vpn.sakura.example.com",
    "発生時刻: 2024-06-18 11:47",
    "",
    "件名: VPN接続不具合",
    "申請者: 山口 慧 <kei.yamaguchi@example.com>",
    "会社: こだまソリューションズ",
    "対象IP: 198.51.100.99",
    "連絡先: 090-9999-0000",
    "FQDN: vpn.kodama.example.com",
    "発生時刻: 2024-06-18 12:30",
    "",
    "件名: VPN接続不具合",
    "申請者: 木村 光 <hikaru.kimura@example.com>",
    "会社: みずほデータサービス",
    "対象IP: 192.0.2.77",
    "連絡先: 070-1111-2222",
    "FQDN: vpn.mizuho.example.com",
    "発生時刻: 2024-06-18 13:05",
    "",
    "件名: VPN接続不具合",
    "申請者: 池田 玲 <rei.ikeda@example.com>",
    "会社: さつきリサーチ",
    "対象IP: 203.0.113.150",
    "連絡先: 080-2222-3333",
    "FQDN: vpn.satsuki.example.com",
    "発生時刻: 2024-06-18 13:42",
    "",
    "件名: VPN接続不具合",
    "申請者: 石井 新 <arata.ishii@example.com>",
    "会社: しらさぎネットワーク",
    "対象IP: 198.51.100.10",
    "連絡先: 090-4444-5555",
    "FQDN: vpn.shirasagi.example.com",
    "発生時刻: 2024-06-18 14:25",
    "",
    "件名: VPN接続不具合",
    "申請者: 小川 渚 <nagisa.ogawa@example.com>",
    "会社: つばさ工業",
    "対象IP: 192.0.2.100",
    "連絡先: 080-6666-7777",
    "FQDN: vpn.tsubasa.example.com",
    "発生時刻: 2024-06-18 15:10",
    "",
    "件名: VPN接続不具合",
    "申請者: 高田 陸 <riku.takada@example.com>",
    "会社: ひかり情報サービス",
    "対象IP: 203.0.113.200",
    "連絡先: 090-8888-9999",
    "FQDN: vpn.hikari.example.com",
    "発生時刻: 2024-06-18 16:00"
  ].join("\n")
};
const baseRules = [
  {
    name: "ipv4_subnet_pair",
    label: "IPv4 + Subnet",
    pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\s+(?:255|254|252|248|240|224|192|128|0)\\.(?:255|254|252|248|240|224|192|128|0)\\.(?:255|254|252|248|240|224|192|128|0)\\.(?:255|254|252|248|240|224|192|128|0)\\b",
    mode: "pseudonymize",
    prefix: "SUBNET"
  },
  {
    name: "cidr_ipv4",
    label: "CIDR v4",
    pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}/\\d{1,2}\\b",
    mode: "pseudonymize",
    prefix: "CIDR"
  },
  {
    name: "cidr_ipv6",
    label: "CIDR v6",
    pattern: "(?i)(?<![A-F0-9:])(?:(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}|(?:[A-F0-9]{1,4}:){1,7}:|(?:[A-F0-9]{1,4}:){1,6}:[A-F0-9]{1,4}|(?:[A-F0-9]{1,4}:){1,5}(?::[A-F0-9]{1,4}){1,2}|(?:[A-F0-9]{1,4}:){1,4}(?::[A-F0-9]{1,4}){1,3}|(?:[A-F0-9]{1,4}:){1,3}(?::[A-F0-9]{1,4}){1,4}|(?:[A-F0-9]{1,4}:){1,2}(?::[A-F0-9]{1,4}){1,5}|[A-F0-9]{1,4}:(?:(?::[A-F0-9]{1,4}){1,6})|:(?:(?::[A-F0-9]{1,4}){1,7}|:))/\\d{1,3}(?![A-F0-9:])",
    mode: "pseudonymize",
    prefix: "CIDR6"
  },
  {
    name: "ipv6_address",
    label: "IPv6",
    pattern: "(?i)(?<![A-F0-9:])(?:(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}|(?:[A-F0-9]{1,4}:){1,7}:|(?:[A-F0-9]{1,4}:){1,6}:[A-F0-9]{1,4}|(?:[A-F0-9]{1,4}:){1,5}(?::[A-F0-9]{1,4}){1,2}|(?:[A-F0-9]{1,4}:){1,4}(?::[A-F0-9]{1,4}){1,3}|(?:[A-F0-9]{1,4}:){1,3}(?::[A-F0-9]{1,4}){1,4}|(?:[A-F0-9]{1,4}:){1,2}(?::[A-F0-9]{1,4}){1,5}|[A-F0-9]{1,4}:(?:(?::[A-F0-9]{1,4}){1,6})|:(?:(?::[A-F0-9]{1,4}){1,7}|:))(?![A-F0-9:])",
    mode: "pseudonymize",
    prefix: "IPV6"
  },
  {
    name: "ip_address",
    label: "IPv4",
    pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
    mode: "pseudonymize",
    prefix: "IPv4"
  },
  {
    name: "email",
    label: "Email",
    pattern: "(?i)[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}",
    mode: "pseudonymize",
    prefix: "EMAIL"
  },
  {
    name: "fqdn",
    label: "FQDN",
    pattern: "(?i)\\b(?:[A-Z0-9-]+\\.)+[A-Z]{2,}\\b",
    mode: "pseudonymize",
    prefix: "FQDN"
  },
  {
    name: "contract_number",
    label: "Contract No.",
    pattern: "\\b[A-Z]{2,4}-\\d{4,}\\b",
    mode: "pseudonymize",
    prefix: "CONTRACT"
  },
  {
    name: "phone_jp",
    label: "電話番号・日本",
    pattern: "(?<![\\d:])(?:\\(0\\d{1,4}\\)[\\s-]?\\d{2,4}[\\s-]?\\d{4}|0\\d{1,4}\\(\\d{2,4}\\)\\d{4}|0\\d{1,4}[\\s-]?\\d{2,4}[\\s-]?\\d{4}|(?:0120|0800|0570)[\\s-]?\\d{3}[\\s-]?\\d{3})(?![\\d:])",
    mode: "pseudonymize",
    prefix: "PHONEJP"
  },
  {
    name: "phone_intl",
    label: "電話番号・国番号形式",
    pattern: "(?<![\\d:])\\+\\d{1,3}(?:[\\s-]?\\(0\\))?(?:[\\s-]?\\d){9,14}(?![\\d:])",
    mode: "pseudonymize",
    prefix: "PHONEINTL"
  },
  {
    name: "azure_subscription_id",
    label: "Azure Subscription ID",
    pattern: "\\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\\b",
    mode: "pseudonymize",
    prefix: "AZURE"
  },
  {
    name: "jwt_token",
    label: "JWT",
    pattern: "eyJ[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+",
    mode: "pseudonymize",
    prefix: "JWT"
  },
  {
    name: "api_key",
    label: "API Key",
    pattern: "\\b[A-Za-z0-9_-]{32,}\\b",
    mode: "pseudonymize",
    prefix: "API"
  },
  {
    name: "gcp_project_id",
    label: "GCP Project ID",
    pattern: "\\b[a-z][a-z0-9-]{4,28}[a-z0-9]\\b",
    mode: "pseudonymize",
    prefix: "GCP"
  },
  {
    name: "postal_code_jp",
    label: "郵便番号",
    pattern: "\\b\\d{3}-?\\d{4}\\b",
    mode: "pseudonymize",
    prefix: "ZIP"
  },
  {
    name: "aws_account_id",
    label: "AWS Account ID",
    pattern: "\\b\\d{12}\\b",
    mode: "pseudonymize",
    prefix: "AWS"
  }
];
function renderRules(readDictRows2, scheduleMask2) {
  ui.ruleList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  state.rules.forEach((rule, index) => {
    const wrapper = document.createElement("label");
    wrapper.className = "rule-item";
    wrapper.draggable = true;
    wrapper.dataset.index = String(index);
    const handle = document.createElement("span");
    handle.className = "rule-handle";
    handle.textContent = "⋮⋮";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = rule.enabled;
    checkbox.addEventListener("change", () => {
      state.rules[index].enabled = checkbox.checked;
      persistState(readDictRows2);
      if (scheduleMask2) scheduleMask2();
    });
    const span = document.createElement("strong");
    span.className = "rule-label";
    span.textContent = rule.label;
    const example = document.createElement("span");
    example.className = "rule-example";
    const exampleText = RULE_EXAMPLES[rule.name] || "";
    if (exampleText) {
      example.textContent = ` (ex. ${exampleText})`;
    }
    wrapper.appendChild(handle);
    wrapper.appendChild(checkbox);
    wrapper.appendChild(span);
    if (exampleText) {
      wrapper.appendChild(example);
    }
    fragment.appendChild(wrapper);
  });
  ui.ruleList.appendChild(fragment);
  initRuleDrag(readDictRows2, scheduleMask2);
}
function initRuleDrag(readDictRows2, scheduleMask2) {
  const items = Array.from(ui.ruleList.querySelectorAll(".rule-item"));
  if (items.length === 0) {
    return;
  }
  let dragIndex = null;
  let placeholder = null;
  let lastDropIndex = null;
  let lastInsertBefore = true;
  const ensurePlaceholder = () => {
    if (placeholder) {
      return placeholder;
    }
    placeholder = document.createElement("div");
    placeholder.className = "rule-placeholder";
    return placeholder;
  };
  const removePlaceholder = () => {
    if (placeholder && placeholder.parentNode) {
      placeholder.parentNode.removeChild(placeholder);
    }
    placeholder = null;
  };
  const clearIndicators = () => {
    items.forEach((node) => {
      node.classList.remove("drop-target", "drop-before", "drop-after");
    });
  };
  items.forEach((item) => {
    item.addEventListener("dragstart", (event) => {
      dragIndex = Number(item.dataset.index);
      item.classList.add("dragging");
      event.dataTransfer.effectAllowed = "move";
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
      item.classList.remove("drop-target", "drop-before", "drop-after");
      removePlaceholder();
      dragIndex = null;
      lastDropIndex = null;
    });
    item.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      clearIndicators();
      const rect = item.getBoundingClientRect();
      const isBefore = event.clientY < rect.top + rect.height / 2;
      item.classList.add("drop-target");
      item.classList.add(isBefore ? "drop-before" : "drop-after");
      const dropIndex = Number(item.dataset.index);
      const insertTarget = ensurePlaceholder();
      if (isBefore) {
        item.parentNode.insertBefore(insertTarget, item);
      } else {
        item.parentNode.insertBefore(insertTarget, item.nextSibling);
      }
      lastDropIndex = dropIndex;
      lastInsertBefore = isBefore;
    });
    item.addEventListener("dragleave", () => {
      item.classList.remove("drop-target", "drop-before", "drop-after");
    });
    item.addEventListener("drop", (event) => {
      event.preventDefault();
      item.classList.remove("drop-target", "drop-before", "drop-after");
      const dropIndex = Number(item.dataset.index);
      if (Number.isNaN(dragIndex) || Number.isNaN(dropIndex) || dragIndex === dropIndex) {
        removePlaceholder();
        return;
      }
      const isBefore = lastDropIndex === dropIndex ? lastInsertBefore : true;
      const [moved] = state.rules.splice(dragIndex, 1);
      let insertIndex = dropIndex;
      if (dragIndex < dropIndex) {
        insertIndex = isBefore ? dropIndex - 1 : dropIndex;
      } else {
        insertIndex = isBefore ? dropIndex : dropIndex + 1;
      }
      state.rules.splice(insertIndex, 0, moved);
      removePlaceholder();
      persistState(readDictRows2);
      renderRules(readDictRows2, scheduleMask2);
      if (scheduleMask2) scheduleMask2();
    });
  });
  ui.ruleList.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  ui.ruleList.addEventListener("drop", (event) => {
    event.preventDefault();
    if (Number.isNaN(dragIndex) || dragIndex === null) {
      removePlaceholder();
      return;
    }
    if (lastDropIndex === null || Number.isNaN(lastDropIndex)) {
      removePlaceholder();
      return;
    }
    const [moved] = state.rules.splice(dragIndex, 1);
    let insertIndex = lastDropIndex;
    if (dragIndex < lastDropIndex) {
      insertIndex = lastInsertBefore ? lastDropIndex - 1 : lastDropIndex;
    } else {
      insertIndex = lastInsertBefore ? lastDropIndex : lastDropIndex + 1;
    }
    state.rules.splice(insertIndex, 0, moved);
    removePlaceholder();
    persistState(readDictRows2);
    renderRules(readDictRows2, scheduleMask2);
    if (scheduleMask2) scheduleMask2();
  });
}
function toggleAllRules(readDictRows2, scheduleMask2) {
  const shouldEnable = state.rules.some((rule) => !rule.enabled);
  state.rules = state.rules.map((rule) => ({ ...rule, enabled: shouldEnable }));
  renderRules(readDictRows2, scheduleMask2);
  persistState(readDictRows2);
}
function resetRuleOrder(readDictRows2, scheduleMask2) {
  state.rules = baseRules.map((rule) => {
    const existing = state.rules.find((item) => item.name === rule.name);
    return {
      ...rule,
      enabled: existing ? existing.enabled : true
    };
  });
  persistState(readDictRows2);
  renderRules(readDictRows2, scheduleMask2);
}
function generateSessionId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < SESSION_ID_LENGTH; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
function regenerateSessionId(maskText2) {
  const newId = generateSessionId();
  setCurrentSessionId(newId);
  if (maskText2) maskText2();
}
function updateSessionIdControls() {
  if (!ui.regenSessionId || !ui.useRandomSessionId) {
    return;
  }
  ui.regenSessionId.disabled = !ui.useRandomSessionId.checked;
}
function readDictRows() {
  if (!ui.dictRows) {
    return [];
  }
  return Array.from(ui.dictRows.querySelectorAll(".dict-row")).map((row) => {
    var _a, _b, _c, _d, _e, _f;
    return {
      enabled: ((_a = row.querySelector(".dict-enabled")) == null ? void 0 : _a.checked) ?? true,
      prefix: ((_c = (_b = row.querySelector(".dict-prefix")) == null ? void 0 : _b.value) == null ? void 0 : _c.trim()) || "",
      pattern: ((_e = (_d = row.querySelector(".dict-pattern")) == null ? void 0 : _d.value) == null ? void 0 : _e.trim()) || "",
      regex: ((_f = row.querySelector(".dict-regex")) == null ? void 0 : _f.checked) ?? false
    };
  });
}
function getDictDefaultPrefix() {
  var _a;
  const raw = ((_a = ui.dictDefaultPrefix) == null ? void 0 : _a.value) || "DICT";
  const trimmed = raw.trim();
  return trimmed ? trimmed.toUpperCase() : "DICT";
}
function validatePattern(pattern) {
  try {
    const normalized = normalizeRegexPattern(pattern);
    new RegExp(normalized.value, normalized.flags);
    return { valid: true };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}
function buildDictionaryRules() {
  const entries = readDictRows();
  const rules = [];
  updateDictTableStatusDisplay("");
  const defaultPrefix = getDictDefaultPrefix();
  let hasError = false;
  entries.forEach((entry, index) => {
    if (!entry.enabled || !entry.pattern) {
      return;
    }
    if (entry.regex) {
      const check = validatePattern(entry.pattern);
      if (!check.valid) {
        updateDictTableStatusDisplay(`辞書の正規表現が不正です。(行 ${index + 1})`);
        hasError = true;
        return;
      }
    }
    const pattern = entry.regex ? entry.pattern : escapeRegExp(entry.pattern);
    rules.push({
      name: `dictionary_${index}`,
      label: "辞書",
      pattern,
      isDictionary: true,
      prefix: (entry.prefix || defaultPrefix).toUpperCase()
    });
  });
  if (hasError) {
    return null;
  }
  return rules;
}
function createDictRow(entry = {}, scheduleMask2) {
  const row = document.createElement("div");
  row.className = "dict-row";
  const enabled = document.createElement("input");
  enabled.type = "checkbox";
  enabled.className = "dict-enabled";
  enabled.checked = entry.enabled ?? true;
  const prefix = document.createElement("input");
  prefix.type = "text";
  prefix.className = "dict-prefix";
  prefix.placeholder = "例: NAME";
  prefix.value = entry.prefix || "";
  const pattern = document.createElement("input");
  pattern.type = "text";
  pattern.className = "dict-pattern";
  pattern.placeholder = "例: さくら情報システム / \\d{12}";
  pattern.value = entry.pattern || "";
  const regexLabel = document.createElement("label");
  regexLabel.className = "toggle";
  const regex = document.createElement("input");
  regex.type = "checkbox";
  regex.className = "dict-regex";
  regex.checked = entry.regex ?? false;
  regexLabel.appendChild(regex);
  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "ghost small dict-remove";
  removeBtn.textContent = "削除";
  removeBtn.addEventListener("click", () => {
    row.remove();
    persistState(readDictRows);
  });
  const attach = (node, eventName = "input") => {
    node.addEventListener(eventName, () => {
      persistState(readDictRows);
      if (scheduleMask2) scheduleMask2();
    });
  };
  attach(enabled, "change");
  attach(prefix);
  attach(pattern);
  attach(regex, "change");
  row.appendChild(enabled);
  row.appendChild(prefix);
  row.appendChild(pattern);
  row.appendChild(regexLabel);
  row.appendChild(removeBtn);
  return row;
}
function renderDictRows(entries = [], scheduleMask2) {
  if (!ui.dictRows) {
    return;
  }
  ui.dictRows.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const rows = entries.length ? entries : [{ enabled: true, prefix: "", pattern: "", regex: false }];
  rows.forEach((entry) => {
    fragment.appendChild(createDictRow(entry, scheduleMask2));
  });
  ui.dictRows.appendChild(fragment);
}
function addDictRow(entry = {}, scheduleMask2) {
  if (!ui.dictRows) {
    return;
  }
  ui.dictRows.appendChild(createDictRow(entry, scheduleMask2));
  persistState(readDictRows);
}
function importBasicRulesToDict(renderRules2, scheduleMask2, savePreset2, buildStatePayload2) {
  const ok = window.confirm(
    "・基本設定の各項目が、正規表現として任意辞書の末尾にコピーされます。\n・基本設定の各項目がオフになります。\n・転記前の設定が以下の名前でマイ設定に保存されます。\n　　転記前バックアップ_YYYYmmdd-HHMM\n・以上、よろしければ「OK」を押してください。"
  );
  if (!ok) {
    return;
  }
  saveImportBackupPreset(savePreset2, buildStatePayload2);
  const entries = state.rules.map((rule) => ({
    enabled: rule.enabled,
    prefix: rule.prefix || "",
    pattern: rule.pattern || "",
    regex: true
  }));
  const current = readDictRows();
  renderDictRows([...current, ...entries], scheduleMask2);
  state.rules = state.rules.map((rule) => ({ ...rule, enabled: false }));
  if (renderRules2) renderRules2(readDictRows, scheduleMask2);
  persistState(readDictRows);
  updateStatusDisplay("基本設定を辞書へ転記しました。");
}
function saveImportBackupPreset(savePreset2, buildStatePayload2) {
  const payload = buildStatePayload2(readDictRows);
  const timestamp = formatBackupTimestamp(/* @__PURE__ */ new Date());
  const name = `${DICT_IMPORT_BACKUP_PREFIX}_${timestamp}`;
  if (savePreset2) {
    savePreset2(name, payload);
  }
}
function formatBackupTimestamp(date) {
  const pad = (value) => String(value).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}${month}${day}-${hours}${minutes}`;
}
const DEFAULT_FETCH_IDLE_TIMEOUT_MS = 1e4;
async function fetchJsonWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}
async function fetchJsonWithIdleTimeout(url, idleTimeoutMs) {
  if (typeof ReadableStream === "undefined" || typeof TextDecoder === "undefined") {
    return fetchJsonWithTimeout(url, idleTimeoutMs);
  }
  const controller = new AbortController();
  const response = await fetch(url, { signal: controller.signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  if (!response.body || typeof response.body.getReader !== "function") {
    return fetchJsonWithTimeout(url, idleTimeoutMs);
  }
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  let idleTimer = null;
  const resetIdleTimer = () => {
    if (idleTimer) {
      clearTimeout(idleTimer);
    }
    idleTimer = setTimeout(() => controller.abort(), idleTimeoutMs);
  };
  resetIdleTimer();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (value) {
        chunks.push(value);
        total += value.length;
      }
      resetIdleTimer();
    }
  } finally {
    if (idleTimer) {
      clearTimeout(idleTimer);
    }
  }
  const buffer = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.length;
  }
  const text = new TextDecoder("utf-8").decode(buffer);
  return JSON.parse(text);
}
function getPrefectureList() {
  return Array.isArray(addressTownPrefectures) && addressTownPrefectures.length ? addressTownPrefectures : ADDRESS_PREFECTURES;
}
function loadAddressPrefSelection(prefectures) {
  try {
    const raw = localStorage.getItem(ADDRESS_PREF_SELECTION_KEY);
    if (!raw) {
      return new Set(prefectures);
    }
    const data = JSON.parse(raw);
    if (!Array.isArray(data) || data.length === 0) {
      return new Set(prefectures);
    }
    const valid = new Set(prefectures);
    const filtered = data.filter((pref) => valid.has(pref));
    return filtered.length ? new Set(filtered) : new Set(prefectures);
  } catch (err) {
    return new Set(prefectures);
  }
}
function saveAddressPrefSelection(selection) {
  try {
    localStorage.setItem(ADDRESS_PREF_SELECTION_KEY, JSON.stringify(selection));
  } catch (err) {
  }
}
function syncAddressPrefectureSelection(prefectures) {
  if (!addressSelectedPrefs) {
    setAddressSelectedPrefs(loadAddressPrefSelection(prefectures));
  } else {
    const valid = new Set(prefectures);
    const filtered = Array.from(addressSelectedPrefs).filter(
      (pref) => valid.has(pref)
    );
    setAddressSelectedPrefs(
      filtered.length ? new Set(filtered) : new Set(prefectures)
    );
  }
  saveAddressPrefSelection(Array.from(addressSelectedPrefs));
  renderAddressPrefectureFilters();
}
function renderAddressPrefectureFilters() {
  if (!ui.addressPrefectureList) {
    return;
  }
  const prefectures = getPrefectureList();
  if (!addressSelectedPrefs) {
    setAddressSelectedPrefs(loadAddressPrefSelection(prefectures));
  }
  ui.addressPrefectureList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  prefectures.forEach((prefecture) => {
    const label = document.createElement("label");
    label.className = "pref-option";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = prefecture;
    input.checked = addressSelectedPrefs.has(prefecture);
    input.dataset.prefecture = prefecture;
    const text = document.createElement("span");
    text.textContent = prefecture;
    label.appendChild(input);
    label.appendChild(text);
    fragment.appendChild(label);
  });
  ui.addressPrefectureList.appendChild(fragment);
}
function handlePrefectureSelectionChange(prefecture, isSelected, scheduleMask2) {
  if (!addressSelectedPrefs) {
    setAddressSelectedPrefs(new Set(getPrefectureList()));
  }
  if (isSelected) {
    addressSelectedPrefs.add(prefecture);
  } else {
    addressSelectedPrefs.delete(prefecture);
  }
  saveAddressPrefSelection(Array.from(addressSelectedPrefs));
  applyAddressPrefectureFilters(scheduleMask2);
}
function setAllPrefecturesSelection(isSelected, scheduleMask2) {
  const prefectures = getPrefectureList();
  setAddressSelectedPrefs(isSelected ? new Set(prefectures) : /* @__PURE__ */ new Set());
  saveAddressPrefSelection(Array.from(addressSelectedPrefs));
  renderAddressPrefectureFilters();
  applyAddressPrefectureFilters(scheduleMask2);
}
function getPrefectureFromPattern(pattern) {
  for (const prefecture of ADDRESS_PREFECTURES_SORTED) {
    if (pattern.startsWith(prefecture)) {
      return prefecture;
    }
  }
  return null;
}
function indexAddressCityPatterns(patterns) {
  const map = /* @__PURE__ */ new Map();
  patterns.forEach((pattern) => {
    const prefecture = getPrefectureFromPattern(pattern);
    if (!prefecture) {
      return;
    }
    if (!map.has(prefecture)) {
      map.set(prefecture, []);
    }
    map.get(prefecture).push(pattern);
  });
  setAddressCityPatternsByPref(map);
}
function collectAddressCityPatterns(selection) {
  const patterns = [];
  selection.forEach((prefecture) => {
    const values = addressCityPatternsByPref.get(prefecture);
    if (values) {
      patterns.push(...values);
    }
  });
  return patterns;
}
function collectAddressTownPatterns(selection) {
  if (!addressTownPatternsByPref) {
    return [];
  }
  const patterns = [];
  selection.forEach((prefecture) => {
    const values = addressTownPatternsByPref[prefecture];
    if (values) {
      patterns.push(...values);
    }
  });
  return patterns;
}
function buildAddressPatternChunks(patterns) {
  if (!Array.isArray(patterns) || patterns.length === 0) {
    return [];
  }
  const escapedPatterns = patterns.map((addr) => escapeRegExp(addr));
  const chunks = [];
  for (let i = 0; i < escapedPatterns.length; i += ADDRESS_PATTERN_CHUNK_SIZE) {
    chunks.push(
      escapedPatterns.slice(i, i + ADDRESS_PATTERN_CHUNK_SIZE).join("|")
    );
  }
  return chunks;
}
function applyAddressPrefectureFilters(scheduleMask2) {
  var _a;
  const selection = addressSelectedPrefs ?? new Set(getPrefectureList());
  const cityPatterns = collectAddressCityPatterns(selection);
  const townPatterns = collectAddressTownPatterns(selection);
  setAddressPatterns([...cityPatterns, ...townPatterns]);
  setAddressPatternChunks(buildAddressPatternChunks(addressPatterns));
  renderAddressSearchResults();
  if (((_a = ui.useAddressDict) == null ? void 0 : _a.checked) && scheduleMask2) {
    scheduleMask2();
  }
}
async function loadAddressDict() {
  const custom = loadCustomAddressDict();
  if (custom) {
    setAddressCityPatterns(custom.patterns);
    indexAddressCityPatterns(addressCityPatterns);
    renderAddressDictStatus(custom);
    syncAddressPrefectureSelection(getPrefectureList());
    applyAddressPrefectureFilters();
    return;
  }
  if (ui.addressDictVersion) {
    ui.addressDictVersion.textContent = "読み込み中...";
  }
  try {
    if (!addressDictLoadPromise) {
      setAddressDictLoadPromise(
        fetch(ADDRESS_DICT_LOCAL_URL).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          return response.json();
        })
      );
    }
    const data = await addressDictLoadPromise;
    if (!data || !Array.isArray(data.patterns)) {
      throw new Error("invalid address dict");
    }
    setAddressCityPatterns(data.patterns);
    indexAddressCityPatterns(addressCityPatterns);
    renderAddressDictStatus({
      version: data.version || "unknown",
      updated: data.updated || "-",
      count: Number.isFinite(data.count) ? data.count : addressCityPatterns.length,
      source: "local"
    });
    syncAddressPrefectureSelection(getPrefectureList());
    applyAddressPrefectureFilters();
  } catch (err) {
    console.warn("Failed to load address dictionary from JSON:", err);
    setAddressDictLoadPromise(null);
    try {
      const fallback = await loadLocalAddressDictFromScript();
      setAddressCityPatterns(fallback.patterns);
      indexAddressCityPatterns(addressCityPatterns);
      renderAddressDictStatus({
        version: fallback.version || "unknown",
        updated: fallback.updated || "-",
        count: Number.isFinite(fallback.count) ? fallback.count : addressCityPatterns.length,
        source: "local"
      });
      syncAddressPrefectureSelection(getPrefectureList());
      applyAddressPrefectureFilters();
    } catch (fallbackErr) {
      console.error("Failed to load address dictionary (all methods):", fallbackErr);
      ui.addressDictVersion.textContent = "エラー";
      ui.addressDictSource.textContent = "データが見つかりません";
      setAddressCityPatterns([]);
      setAddressCityPatternsByPref(/* @__PURE__ */ new Map());
      applyAddressPrefectureFilters();
    }
  }
}
async function loadTownAddressDict() {
  if (!ui.addressTownDictStatus) {
    return;
  }
  ui.addressTownDictStatus.textContent = "読み込み中...";
  try {
    if (!addressTownDictLoadPromise) {
      setAddressTownDictLoadPromise(
        fetch(ADDRESS_TOWN_DICT_URL).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          return response.json();
        })
      );
    }
    const data = await addressTownDictLoadPromise;
    if (!data || typeof data !== "object") {
      throw new Error("invalid town dict");
    }
    setAddressTownPatternsByPref(data.patternsByPrefecture || {});
    setAddressTownPrefectures(
      Array.isArray(data.prefectures) ? data.prefectures : null
    );
    const totalCount = Number.isFinite(data.totalCount) ? data.totalCount : Object.values(addressTownPatternsByPref).reduce(
      (sum, list) => sum + (Array.isArray(list) ? list.length : 0),
      0
    );
    ui.addressTownDictStatus.textContent = `読み込み済み (${totalCount.toLocaleString()}件)`;
    syncAddressPrefectureSelection(getPrefectureList());
    applyAddressPrefectureFilters();
  } catch (err) {
    console.warn("Failed to load town address dictionary:", err);
    setAddressTownDictLoadPromise(null);
    ui.addressTownDictStatus.textContent = "読み込み失敗";
  }
}
function loadLocalAddressDictFromScript() {
  if (typeof ADDRESS_PATTERNS !== "undefined" && Array.isArray(ADDRESS_PATTERNS)) {
    return Promise.resolve({
      version: ADDRESS_DICT_VERSION,
      updated: ADDRESS_DICT_UPDATED,
      count: ADDRESS_DICT_COUNT,
      patterns: ADDRESS_PATTERNS
    });
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "data/address-dict.js";
    script.onload = () => {
      if (typeof ADDRESS_PATTERNS !== "undefined" && Array.isArray(ADDRESS_PATTERNS)) {
        resolve({
          version: ADDRESS_DICT_VERSION,
          updated: ADDRESS_DICT_UPDATED,
          count: ADDRESS_DICT_COUNT,
          patterns: ADDRESS_PATTERNS
        });
      } else {
        reject(new Error("address dict missing"));
      }
    };
    script.onerror = () => reject(new Error("address dict load failed"));
    document.head.appendChild(script);
  });
}
function loadCustomAddressDict() {
  try {
    const raw = localStorage.getItem(ADDRESS_DICT_CUSTOM_KEY);
    if (!raw) {
      return null;
    }
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.patterns)) {
      return null;
    }
    return {
      version: data.version || "unknown",
      updated: data.updated || "-",
      count: data.patterns.length,
      source: "custom",
      patterns: data.patterns
    };
  } catch (err) {
    return null;
  }
}
function renderAddressDictStatus(info) {
  if (!info) return;
  ui.addressDictVersion.textContent = formatAddressDictVersion(info.version);
  ui.addressDictCount.textContent = info.count.toLocaleString();
  ui.addressDictUpdated.textContent = info.updated;
  if (info.source === "custom") {
    ui.addressDictSource.textContent = "オンライン更新";
  } else {
    ui.addressDictSource.textContent = "ローカル同梱";
  }
  renderAddressSearchResults();
}
function formatAddressDictVersion(version) {
  if (!version || version === "unknown") return "-";
  const match = version.match(/^(\d{4})-(\d{2})$/);
  if (match) {
    return `${match[1]}年${parseInt(match[2], 10)}月版`;
  }
  return version;
}
function renderAddressSearchResults(query) {
  var _a;
  if (!ui.addressSearchResults) {
    return;
  }
  const patterns = addressPatterns;
  if (!patterns) {
    ui.addressSearchResults.textContent = "辞書を読み込み中...";
    return;
  }
  const raw = ((_a = ui.addressSearchInput) == null ? void 0 : _a.value) ?? "";
  const trimmed = raw.trim();
  if (!trimmed) {
    ui.addressSearchResults.textContent = "検索結果はここに表示されます。";
    return;
  }
  const results = patterns.filter((pattern) => pattern.includes(trimmed));
  const limited = results.slice(0, ADDRESS_SEARCH_LIMIT);
  if (limited.length === 0) {
    ui.addressSearchResults.textContent = "一致する住所がありません。";
    return;
  }
  const suffix = results.length > ADDRESS_SEARCH_LIMIT ? "\n..." : "";
  ui.addressSearchResults.textContent = limited.join("\n") + suffix;
}
async function updateAddressDict() {
  ui.updateAddressDict.disabled = true;
  ui.updateAddressDict.textContent = "更新中...";
  try {
    const data = await fetchJsonWithIdleTimeout(
      GEOLONIA_API_URL,
      DEFAULT_FETCH_IDLE_TIMEOUT_MS
    );
    const patterns = buildAddressPatternsFromGeolonia(data);
    const now = /* @__PURE__ */ new Date();
    const version = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    const updated = now.toISOString().split("T")[0];
    const payload = {
      version,
      updated,
      patterns,
      source: "geolonia"
    };
    localStorage.setItem(ADDRESS_DICT_CUSTOM_KEY, JSON.stringify(payload));
    setAddressCityPatterns(patterns);
    indexAddressCityPatterns(addressCityPatterns);
    renderAddressDictStatus({
      version,
      updated,
      count: patterns.length,
      source: "custom"
    });
    syncAddressPrefectureSelection(getPrefectureList());
    applyAddressPrefectureFilters();
    updateStatusDisplay("住所辞書を更新しました。");
  } catch (err) {
    updateStatusDisplay("住所辞書の更新に失敗しました。", true);
    console.error("Address dict update failed:", err);
  } finally {
    ui.updateAddressDict.disabled = false;
    ui.updateAddressDict.textContent = "更新";
  }
}
function buildAddressPatternsFromGeolonia(data) {
  const patterns = [];
  for (const [prefecture, cities] of Object.entries(data)) {
    cities.forEach((city) => {
      patterns.push(`${prefecture}${city}`);
    });
  }
  return patterns;
}
function resetAddressDict(scheduleMask2) {
  const ok = window.confirm(
    "住所辞書をローカル同梱版に戻しますか？\nオンラインで更新した辞書データは削除されます。"
  );
  if (!ok) {
    return;
  }
  try {
    localStorage.removeItem(ADDRESS_DICT_CUSTOM_KEY);
    loadAddressDict();
    updateStatusDisplay("住所辞書を初期版に戻しました。");
    if (scheduleMask2) scheduleMask2();
  } catch (err) {
    updateStatusDisplay("住所辞書のリセットに失敗しました。", true);
  }
}
function buildAddressRules() {
  if (!ui.useAddressDict.checked) {
    return [];
  }
  const rules = [];
  if (addressPatternChunks.length) {
    addressPatternChunks.forEach((prefectureCity) => {
      rules.push({
        name: "address_prefecture_city",
        label: "住所・地域",
        pattern: prefectureCity,
        mode: "pseudonymize",
        prefix: "ADDRESS"
      });
    });
  }
  return rules;
}
function loadPresets() {
  try {
    const raw = localStorage.getItem(PRESET_KEY);
    if (!raw) {
      return [];
    }
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn("Failed to load presets from localStorage:", err);
    return [];
  }
}
function savePresets(list) {
  try {
    localStorage.setItem(PRESET_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn("Failed to save presets to localStorage:", err);
  }
}
function renderPresetOptions() {
  const presets = loadPresets();
  ui.presetSelect.innerHTML = "";
  const empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "保存した設定を選択";
  ui.presetSelect.appendChild(empty);
  presets.forEach((preset) => {
    const option = document.createElement("option");
    option.value = preset.name;
    option.textContent = preset.name;
    ui.presetSelect.appendChild(option);
  });
}
function savePreset(readDictRows2) {
  const name = ui.presetName.value.trim();
  if (!name) {
    updatePresetStatusDisplay("設定名を入力してください。", true);
    return;
  }
  const presets = loadPresets();
  const existing = presets.find((preset) => preset.name === name);
  if (existing) {
    const ok = window.confirm("同名の設定を上書きしますか？");
    if (!ok) {
      return;
    }
    existing.payload = buildPresetPayload(readDictRows2);
    existing.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  } else {
    presets.push({
      name,
      payload: buildPresetPayload(readDictRows2),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  savePresets(presets);
  renderPresetOptions();
  ui.presetSelect.value = name;
  updatePresetStatusDisplay("");
}
function savePresetWithPayload(name, payload) {
  const presets = loadPresets();
  presets.push({
    name,
    payload,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  savePresets(presets);
  renderPresetOptions();
}
function loadPreset(baseRules2, renderRules2, renderDictRows2, readDictRows2, scheduleMask2) {
  const name = ui.presetSelect.value;
  if (!name) {
    updatePresetStatusDisplay("保存した設定を選択してください。", true);
    return;
  }
  const presets = loadPresets();
  const target = presets.find((preset) => preset.name === name);
  if (!target) {
    return;
  }
  const result = applyStatePayload(target.payload, baseRules2);
  if (result.dictRowsData && renderDictRows2) {
    renderDictRows2(result.dictRowsData, scheduleMask2);
  }
  if (result.needsRulesRender && renderRules2) {
    renderRules2(readDictRows2, scheduleMask2);
  }
  persistState(readDictRows2);
  updatePresetStatusDisplay("");
}
function deletePreset() {
  const name = ui.presetSelect.value;
  if (!name) {
    updatePresetStatusDisplay("削除する設定を選択してください。", true);
    return;
  }
  const ok = window.confirm(`設定「${name}」を削除しますか？`);
  if (!ok) {
    return;
  }
  const presets = loadPresets().filter((preset) => preset.name !== name);
  savePresets(presets);
  renderPresetOptions();
  updatePresetStatusDisplay("");
}
function resolveExportName() {
  const name = ui.presetName.value.trim() || ui.presetSelect.value.trim();
  if (!name) {
    return null;
  }
  return name;
}
const ADDRESS_BLOCK_PATTERN = "(?:[0-9０-９一二三四五六七八九十百千〇零]{1,3}丁目s*[0-9０-９一二三四五六七八九十百千〇零]{1,3}番s*[0-9０-９一二三四五六七八九十百千〇零]{1,3}号?|[0-9０-９一二三四五六七八九十百千〇零]{1,3}丁目s*[0-9０-９一二三四五六七八九十百千〇零]{1,3}(?:番|号)|[0-9０-９一二三四五六七八九十百千〇零]{1,3}丁目|[東西南北]?[0-9０-９一二三四五六七八九十百千〇零]{1,3}条[東西南北]?[0-9０-９一二三四五六七八九十百千〇零]{1,3}丁目?|[0-9０-９一二三四五六七八九十百千〇零]{1,3}(?:[-‐ー－]|の)[0-9０-９一二三四五六七八九十百千〇零]{1,3}(?:(?:[-‐ー－]|の)[0-9０-９一二三四五六七八九十百千〇零]{1,3})?)(?![0-9０-９])";
const DEFAULT_NUMBER_WIDTH = 3;
function collectActivePrefixes(dictRules, addressRules, textDictRules) {
  const prefixes = /* @__PURE__ */ new Set();
  const add = (value) => {
    if (!value) {
      return;
    }
    prefixes.add(String(value).toUpperCase());
  };
  state.rules.forEach((rule) => {
    if (rule.enabled) {
      add(rule.prefix);
    }
  });
  dictRules.forEach((rule) => add(rule.prefix));
  addressRules.forEach((rule) => add(rule.prefix));
  textDictRules.forEach((rule) => add(rule.prefix));
  if (addressRules.length) {
    add("ADDRESS_BLOCK");
    add("ADDRESS_MID");
  }
  return prefixes;
}
function isActivePlaceholderAt(text, index, activePrefixes, sessionId) {
  if (!activePrefixes || activePrefixes.size === 0 || !sessionId) {
    return false;
  }
  const lastOpen = text.lastIndexOf("{{", index);
  if (lastOpen === -1) {
    return false;
  }
  const lastClose = text.lastIndexOf("}}", index);
  if (lastClose > lastOpen) {
    return false;
  }
  const nextClose = text.indexOf("}}", index);
  if (nextClose === -1) {
    return false;
  }
  const content = text.slice(lastOpen + 2, nextClose);
  const match = content.match(/^([a-z0-9]+):([A-Z0-9_]+):\d+$/i);
  if (!match) {
    return false;
  }
  const placeholderSession = match[1];
  if (placeholderSession !== sessionId) {
    return false;
  }
  const label = match[2].toUpperCase();
  return activePrefixes.has(label);
}
function mergeRulesWithPriority(baseRules2, textDictRules) {
  if (!textDictRules || textDictRules.length === 0) {
    return baseRules2;
  }
  const result = [];
  const baseRulesCount = baseRules2.length;
  const priority1 = [];
  const priority2 = [];
  const priority3 = [];
  const priority4 = [];
  const priority5 = [];
  textDictRules.forEach((rule) => {
    if (rule.priority === 1) priority1.push(rule);
    else if (rule.priority === 2) priority2.push(rule);
    else if (rule.priority === 3) priority3.push(rule);
    else if (rule.priority === 4) priority4.push(rule);
    else if (rule.priority === 5) priority5.push(rule);
  });
  const sortByOrder = (a, b) => a.orderInPriority - b.orderInPriority;
  priority1.sort(sortByOrder);
  priority2.sort(sortByOrder);
  priority3.sort(sortByOrder);
  priority4.sort(sortByOrder);
  priority5.sort(sortByOrder);
  result.push(...priority1);
  const pos75 = Math.floor(baseRulesCount * 0.75);
  const pos50 = Math.floor(baseRulesCount * 0.5);
  const pos25 = Math.floor(baseRulesCount * 0.25);
  for (let i = 0; i < baseRulesCount; i++) {
    if (i === pos75 && priority2.length > 0) {
      result.push(...priority2);
    }
    if (i === pos50 && priority3.length > 0) {
      result.push(...priority3);
    }
    if (i === pos25 && priority4.length > 0) {
      result.push(...priority4);
    }
    result.push(baseRules2[i]);
  }
  result.push(...priority5);
  return result;
}
function applyRule(text, rule, placeholders, counts, activePrefixes = null, sessionId = null) {
  if (!rule.pattern) {
    return text;
  }
  const numberWidth = DEFAULT_NUMBER_WIDTH;
  const regex = rule._compiledRegex || (rule._compiledRegex = buildRuleRegex(rule));
  let hits = 0;
  const placeholderKey = rule.isTextDictionary && rule.groupKey ? rule.groupKey : rule.name;
  const replaced = text.replace(regex, (match, offset, source) => {
    if (isActivePlaceholderAt(source, offset, activePrefixes, sessionId)) {
      return match;
    }
    hits += 1;
    return placeholders.get(placeholderKey, match, rule.prefix, numberWidth);
  });
  if (hits) {
    if (rule.isTextDictionary) {
      const label = rule.customLabel || `Custom_${rule.label}`;
      counts[`text_dict_label:${label}`] = (counts[`text_dict_label:${label}`] || 0) + hits;
    } else {
      counts[rule.name] = (counts[rule.name] || 0) + hits;
    }
  }
  return replaced;
}
function applyAddressBlockRules(text, placeholders, counts) {
  if (!addressPatternChunks.length) {
    return text;
  }
  const numberWidth = DEFAULT_NUMBER_WIDTH;
  const blockRegex = new RegExp(ADDRESS_BLOCK_PATTERN, "g");
  const chunkRegexes = addressPatternChunks.map((chunk) => new RegExp(chunk));
  const addressPlaceholderRegex = /\{\{[^}]*:ADDRESS:\d+\}\}/;
  const lines = text.split(/\r?\n/);
  let changed = false;
  const updated = lines.map((line) => {
    if (!line.includes("所在地") && !line.includes("所在地：") && !line.includes("所在地:")) {
      return line;
    }
    const hasRegion = addressPlaceholderRegex.test(line) || chunkRegexes.some((regex) => regex.test(line));
    if (!hasRegion) {
      return line;
    }
    let hits = 0;
    const replaced = line.replace(blockRegex, (match) => {
      hits += 1;
      return placeholders.get(
        "address_block",
        match,
        "ADDRESS_BLOCK",
        numberWidth
      );
    });
    const normalized = replaced.replace(/(\{\{[^}]*:ZIP:\d+\}\})\s+(?=\{\{[^}]*:ADDRESS:\d+\}\})/g, "$1").replace(
      /(\{\{[^}]*:ADDRESS:\d+\}\})([^\s\{]{1,30})(\{\{[^}]*:ADDRESS_BLOCK:\d+\}\})/g,
      (match, head, middle, tail) => {
        const masked = placeholders.get(
          "address_mid",
          middle,
          "ADDRESS_MID",
          numberWidth
        );
        counts.address_mid = (counts.address_mid || 0) + 1;
        return `${head}${masked}${tail}`;
      }
    );
    if (hits) {
      counts.address_block = (counts.address_block || 0) + hits;
      changed = true;
    }
    return normalized;
  });
  return changed ? updated.join("\n") : text;
}
function renderStats(counts) {
  const allEntries = [];
  state.rules.filter((rule) => counts[rule.name]).forEach((rule) => {
    allEntries.push(`${rule.label}: ${counts[rule.name]}`);
  });
  for (const [key, count] of Object.entries(counts)) {
    const isBaseRule = state.rules.some((rule) => rule.name === key);
    if (!isBaseRule) {
      if (key.startsWith("text_dict_")) {
        continue;
      }
      let label = key;
      if (key.startsWith("dictionary_")) {
        label = "辞書";
      } else if (key.startsWith("address_")) {
        label = "住所";
      } else if (key.startsWith("text_dict_label:")) {
        label = key.replace("text_dict_label:", "");
      }
      allEntries.push(`${label}: ${count}`);
    }
  }
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const breakdown = allEntries.length ? allEntries.join(" / ") : "なし";
  updateStatusDisplay(`総マスク数: ${total} （内訳: ${breakdown}）`);
}
async function attachDictionarySignature(dict) {
  if (!computeDictionarySignature || !dict) {
    return;
  }
  const signature = await computeDictionarySignature(dict);
  if (!signature) {
    return;
  }
  dict.signature = signature;
  setCurrentMaskDictionary(dict);
  setCurrentUnmaskDictionary(dict);
  if (typeof window.updateUnmaskDictStatus === "function") {
    window.updateUnmaskDictStatus(dict);
  }
}
function maskTextSync(source, buildDictionaryRules2, buildAddressRules2, buildTextDictionaryRules2) {
  var _a;
  if (!currentSessionId) {
    setCurrentSessionId(generateSessionId());
  }
  const includeSessionId = ((_a = ui.useRandomSessionId) == null ? void 0 : _a.checked) ?? true;
  const placeholders = new PlaceholderMap(currentSessionId, includeSessionId);
  const counts = {};
  let result = source;
  try {
    const dictRules = buildDictionaryRules2();
    if (dictRules === null) {
      return false;
    }
    const textDictRules = buildTextDictionaryRules2 ? buildTextDictionaryRules2() : [];
    const addressRules = buildAddressRules2();
    const activePrefixes = collectActivePrefixes(dictRules, addressRules, textDictRules);
    dictRules.forEach((dictRule) => {
      result = applyRule(result, dictRule, placeholders, counts, activePrefixes, currentSessionId);
    });
    addressRules.forEach((addressRule) => {
      result = applyRule(result, addressRule, placeholders, counts, activePrefixes, currentSessionId);
    });
    result = applyAddressBlockRules(result, placeholders, counts);
    const mergedRules = mergeRulesWithPriority(state.rules, textDictRules);
    mergedRules.forEach((rule) => {
      if (!rule.enabled) {
        return;
      }
      result = applyRule(result, rule, placeholders, counts, activePrefixes, currentSessionId);
    });
    ui.outputText.value = result;
    renderStats(counts);
    const dict = placeholders.getDictionary();
    setCurrentMaskDictionary(dict);
    setCurrentUnmaskDictionary(dict);
    if (typeof window.updateUnmaskDictStatus === "function") {
      window.updateUnmaskDictStatus(dict);
    }
    attachDictionarySignature(dict);
    return true;
  } catch (err) {
    updateStatusDisplay("正規表現の形式が不正です。", true);
    return false;
  }
}
async function maskTextAsync(source, runId, buildDictionaryRules2, buildAddressRules2, buildTextDictionaryRules2) {
  var _a;
  const shouldYield = source.length > ASYNC_MASK_THRESHOLD;
  const yieldToBrowser = () => new Promise((resolve) => setTimeout(resolve, 0));
  const isLatest = () => runId === maskRunId;
  if (!currentSessionId) {
    setCurrentSessionId(generateSessionId());
  }
  const includeSessionId = ((_a = ui.useRandomSessionId) == null ? void 0 : _a.checked) ?? true;
  const placeholders = new PlaceholderMap(currentSessionId, includeSessionId);
  const counts = {};
  let result = source;
  try {
    const dictRules = buildDictionaryRules2();
    if (dictRules === null) {
      return;
    }
    const textDictRules = buildTextDictionaryRules2 ? buildTextDictionaryRules2() : [];
    const addressRules = buildAddressRules2();
    const activePrefixes = collectActivePrefixes(dictRules, addressRules, textDictRules);
    for (const dictRule of dictRules) {
      result = applyRule(result, dictRule, placeholders, counts, activePrefixes, currentSessionId);
      if (shouldYield) {
        await yieldToBrowser();
        if (!isLatest()) return;
      }
    }
    for (const addressRule of addressRules) {
      result = applyRule(result, addressRule, placeholders, counts, activePrefixes, currentSessionId);
      if (shouldYield) {
        await yieldToBrowser();
        if (!isLatest()) return;
      }
    }
    result = applyAddressBlockRules(result, placeholders, counts);
    const mergedRules = mergeRulesWithPriority(state.rules, textDictRules);
    for (const rule of mergedRules) {
      if (!rule.enabled) {
        continue;
      }
      result = applyRule(result, rule, placeholders, counts, activePrefixes, currentSessionId);
      if (shouldYield) {
        await yieldToBrowser();
        if (!isLatest()) return;
      }
    }
    if (!isLatest()) return;
    ui.outputText.value = result;
    renderStats(counts);
    const dict = placeholders.getDictionary();
    setCurrentMaskDictionary(dict);
    setCurrentUnmaskDictionary(dict);
    if (typeof window.updateUnmaskDictStatus === "function") {
      window.updateUnmaskDictStatus(dict);
    }
    attachDictionarySignature(dict);
  } catch (err) {
    updateStatusDisplay("正規表現の形式が不正です。", true);
  }
}
function maskText(buildDictionaryRules2, buildAddressRules2, buildTextDictionaryRules2) {
  const source = ui.inputText.value || "";
  const runId = incrementMaskRunId();
  if (!source.trim()) {
    ui.outputText.value = "";
    updateStatusDisplay("入力テキストが空です。");
    setCurrentMaskDictionary(null);
    setCurrentUnmaskDictionary(null);
    if (typeof window.updateUnmaskDictStatus === "function") {
      window.updateUnmaskDictStatus(null);
    }
    return;
  }
  if (source.length > ASYNC_MASK_THRESHOLD) {
    updateStatusDisplay("マスク処理中...");
    maskTextAsync(source, runId, buildDictionaryRules2, buildAddressRules2, buildTextDictionaryRules2);
    return;
  }
  maskTextSync(source, buildDictionaryRules2, buildAddressRules2, buildTextDictionaryRules2);
}
function scheduleMask() {
  return;
}
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
function parseTXT(text) {
  if (!text || typeof text !== "string") {
    return [];
  }
  return text.split("\n").map((line) => line.trim()).filter((line) => line.length > 0);
}
function parseCSV(text) {
  if (!text || typeof text !== "string") {
    return { valid: false, errors: ["空のデータです"] };
  }
  const lines = text.split("\n").filter((line) => line.trim());
  const labelMap = /* @__PURE__ */ new Map();
  const errors = [];
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    if (!trimmed.includes(",")) {
      errors.push(`${index + 1}行目: カンマが含まれていません`);
      return;
    }
    const firstCommaIndex = trimmed.indexOf(",");
    const value = trimmed.substring(0, firstCommaIndex).trim();
    const label = trimmed.substring(firstCommaIndex + 1).trim();
    if (!value || !label) {
      errors.push(`${index + 1}行目: 値またはラベルが空です`);
      return;
    }
    if (!labelMap.has(label)) {
      labelMap.set(label, []);
    }
    labelMap.get(label).push(value);
  });
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  if (labelMap.size > TEXT_DICT_MAX_LABELS) {
    return {
      valid: false,
      errors: [`ラベル数が上限（${TEXT_DICT_MAX_LABELS}種類）を超えています: ${labelMap.size}種類`]
    };
  }
  for (const [label, entries] of labelMap.entries()) {
    if (entries.length > TEXT_DICT_MAX_ROWS_PER_LABEL) {
      errors.push(`ラベル「${label}」の行数が上限（${TEXT_DICT_MAX_ROWS_PER_LABEL.toLocaleString()}行）を超えています: ${entries.length.toLocaleString()}行`);
    }
  }
  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true, data: labelMap };
}
function loadTextDictionaries() {
  try {
    const raw = localStorage.getItem(TEXT_DICT_KEY);
    if (!raw) {
      return [];
    }
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.textDictionaries)) {
      return [];
    }
    return data.textDictionaries;
  } catch (err) {
    console.warn("Failed to load text dictionaries from localStorage:", err);
    return [];
  }
}
function saveTextDictionaries(dictionaries) {
  try {
    const data = {
      textDictionaries: dictionaries
    };
    localStorage.setItem(TEXT_DICT_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save text dictionaries to localStorage:", err);
    throw new Error("テキスト辞書の保存に失敗しました");
  }
}
function createTextDictionary(label, entries, priority = 3) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const existingDicts = textDictionaries.filter((d) => d.priority === priority);
  const maxOrder = existingDicts.length > 0 ? Math.max(...existingDicts.map((d) => d.orderInPriority)) : -1;
  return {
    id: generateUUID(),
    label: label.trim(),
    entries: entries.map((e) => e.trim()).filter((e) => e.length > 0),
    enabled: true,
    priority,
    orderInPriority: maxOrder + 1,
    createdAt: now,
    updatedAt: now
  };
}
function updateTextDictionary(id, updates) {
  const index = textDictionaries.findIndex((d) => d.id === id);
  if (index === -1) {
    return false;
  }
  const dict = textDictionaries[index];
  const updated = {
    ...dict,
    ...updates,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (updates.priority !== void 0 && updates.priority !== dict.priority) {
    const existingDicts = textDictionaries.filter(
      (d) => d.priority === updates.priority && d.id !== id
    );
    const maxOrder = existingDicts.length > 0 ? Math.max(...existingDicts.map((d) => d.orderInPriority)) : -1;
    updated.orderInPriority = maxOrder + 1;
  }
  textDictionaries[index] = updated;
  saveTextDictionaries(textDictionaries);
  return true;
}
function deleteTextDictionary(id) {
  const index = textDictionaries.findIndex((d) => d.id === id);
  if (index === -1) {
    return false;
  }
  textDictionaries.splice(index, 1);
  saveTextDictionaries(textDictionaries);
  return true;
}
function exportTextDictionary(id, appName = "TexMask") {
  const dict = textDictionaries.find((d) => d.id === id);
  if (!dict) {
    return null;
  }
  const now = /* @__PURE__ */ new Date();
  const dateStr = now.toISOString().split("T")[0].replace(/-/g, "");
  const filename = `${appName}_CustomDIC-${dict.label}-${dateStr}.txt`;
  const content = dict.entries.join("\n");
  return { filename, content };
}
function findDictionaryByLabel(label) {
  return textDictionaries.find((d) => d.label === label) || null;
}
function mergeEntries(existing, newEntries) {
  const existingSet = new Set(existing);
  const uniqueNew = newEntries.filter((entry) => !existingSet.has(entry));
  return [...existing, ...uniqueNew];
}
function buildTextDictionaryRules() {
  const rules = [];
  const enabledDicts = textDictionaries.filter((d) => d.enabled);
  enabledDicts.forEach((dict, index) => {
    const normalizedLabel = dict.label.trim().replace(/\s+/g, "_").toUpperCase();
    const prefix = normalizedLabel.startsWith("CUSTOM_") ? normalizedLabel : `CUSTOM_${normalizedLabel}`;
    const customLabel = `Custom_${normalizedLabel}`;
    const groupKey = `text_dict_label:${customLabel}`;
    dict.entries.forEach((entry, entryIndex) => {
      const pattern = escapeRegExp(entry);
      rules.push({
        name: `text_dict_${dict.id}_${entryIndex}`,
        label: dict.label,
        pattern,
        enabled: dict.enabled,
        isTextDictionary: true,
        textDictId: dict.id,
        priority: dict.priority,
        orderInPriority: dict.orderInPriority,
        prefix,
        customLabel,
        groupKey
      });
    });
  });
  return rules;
}
function initTextDictionaries() {
  const loaded = loadTextDictionaries();
  setTextDictionaries(loaded);
}
let currentEditingId = null;
function initTextDictionaryUI() {
  initTextDictionaries();
  setupEventListeners();
  renderTextDictionaryList();
}
function setupEventListeners() {
  var _a, _b, _c;
  (_a = ui.textDictAddBtn) == null ? void 0 : _a.addEventListener("click", () => {
    showForm("add");
  });
  (_b = ui.textDictCancelBtn) == null ? void 0 : _b.addEventListener("click", () => {
    hideForm();
  });
  (_c = ui.textDictSubmitBtn) == null ? void 0 : _c.addEventListener("click", () => {
    if (currentEditingId) {
      handleUpdate();
    } else {
      handleSubmit();
    }
  });
  Array.from(ui.textDictInputModeRadios || []).forEach((radio) => {
    radio.addEventListener("change", () => {
      updateFormVisibility();
    });
  });
  Array.from(ui.textDictFileFormatRadios || []).forEach((radio) => {
    radio.addEventListener("change", () => {
      updateFormVisibility();
    });
  });
}
function updateFormVisibility() {
  const inputMode = getSelectedInputMode();
  const fileFormat = getSelectedFileFormat();
  if (inputMode === "textarea") {
    ui.textDictFileFormatRow.hidden = true;
    ui.textDictFileRow.hidden = true;
    ui.textDictTextareaRow.hidden = false;
    ui.textDictLabel.disabled = false;
  } else {
    ui.textDictFileFormatRow.hidden = false;
    ui.textDictFileRow.hidden = false;
    ui.textDictTextareaRow.hidden = true;
    if (fileFormat === "csv") {
      ui.textDictLabel.disabled = true;
    } else {
      ui.textDictLabel.disabled = false;
    }
  }
}
function getSelectedInputMode() {
  const checked = Array.from(ui.textDictInputModeRadios || []).find((r) => r.checked);
  return checked ? checked.value : "textarea";
}
function getSelectedFileFormat() {
  const checked = Array.from(ui.textDictFileFormatRadios || []).find((r) => r.checked);
  return checked ? checked.value : "txt";
}
function showForm(mode, dict = null) {
  currentEditingId = dict ? dict.id : null;
  if (mode === "edit" && dict) {
    ui.textDictFormTitle.textContent = "辞書の編集";
    ui.textDictSubmitBtn.textContent = "更新";
    ui.textDictLabel.value = dict.label;
    ui.textDictPriority.value = String(dict.priority);
    ui.textDictContent.value = dict.entries.join("\n");
    const textareaRadio = Array.from(ui.textDictInputModeRadios).find((r) => r.value === "textarea");
    if (textareaRadio) textareaRadio.checked = true;
  } else {
    ui.textDictFormTitle.textContent = "辞書の追加";
    ui.textDictSubmitBtn.textContent = "登録";
    ui.textDictLabel.value = "";
    ui.textDictPriority.value = "3";
    ui.textDictContent.value = "";
    ui.textDictFileInput.value = "";
    const textareaRadio = Array.from(ui.textDictInputModeRadios).find((r) => r.value === "textarea");
    if (textareaRadio) textareaRadio.checked = true;
  }
  updateFormVisibility();
  ui.textDictForm.hidden = false;
}
function hideForm() {
  ui.textDictForm.hidden = true;
  currentEditingId = null;
}
async function handleSubmit() {
  try {
    const inputMode = getSelectedInputMode();
    const fileFormat = getSelectedFileFormat();
    const label = ui.textDictLabel.value.trim();
    const priority = Number.parseInt(ui.textDictPriority.value, 10);
    let entries = [];
    if (inputMode === "textarea") {
      if (!label) {
        updateStatusDisplay("ラベル名を入力してください", true);
        return;
      }
      const content = ui.textDictContent.value;
      if (!content.trim()) {
        updateStatusDisplay("内容を入力してください", true);
        return;
      }
      entries = parseTXT(content);
    } else {
      const file = ui.textDictFileInput.files[0];
      if (!file) {
        updateStatusDisplay("ファイルを選択してください", true);
        return;
      }
      const content = await readFileAsText(file);
      if (fileFormat === "txt") {
        if (!label) {
          updateStatusDisplay("ラベル名を入力してください", true);
          return;
        }
        entries = parseTXT(content);
      } else {
        const result = parseCSV(content);
        if (!result.valid) {
          updateStatusDisplay(`CSVエラー:
${result.errors.join("\n")}`, true);
          return;
        }
        for (const [csvLabel, csvEntries] of result.data.entries()) {
          await handleSingleLabelSubmit(csvLabel, csvEntries, priority);
        }
        hideForm();
        renderTextDictionaryList();
        updateStatusDisplay(`${result.data.size}個の辞書を登録しました`);
        return;
      }
    }
    await handleSingleLabelSubmit(label, entries, priority);
    hideForm();
    renderTextDictionaryList();
    updateStatusDisplay(`辞書「${label}」を登録しました`);
  } catch (err) {
    console.error("Registration error:", err);
    updateStatusDisplay(`登録エラー: ${err.message}`, true);
  }
}
async function handleSingleLabelSubmit(label, entries, priority) {
  if (entries.length > TEXT_DICT_MAX_ROWS_PER_LABEL) {
    throw new Error(`ラベル「${label}」の行数が上限（${TEXT_DICT_MAX_ROWS_PER_LABEL.toLocaleString()}行）を超えています: ${entries.length.toLocaleString()}行`);
  }
  const existing = findDictionaryByLabel(label);
  if (existing) {
    const action = await askUserAction(label);
    if (action === "skip") {
      return;
    } else if (action === "overwrite") {
      deleteTextDictionary(existing.id);
      const newDict = createTextDictionary(label, entries, priority);
      textDictionaries.push(newDict);
      saveTextDictionaries(textDictionaries);
    } else if (action === "merge") {
      const merged = mergeEntries(existing.entries, entries);
      updateTextDictionary(existing.id, { entries: merged });
    }
  } else {
    const newDict = createTextDictionary(label, entries, priority);
    textDictionaries.push(newDict);
    saveTextDictionaries(textDictionaries);
  }
}
function askUserAction(label) {
  return new Promise((resolve) => {
    const message = `ラベル「${label}」は既に存在します。

上書き: 既存を削除して新規作成
スキップ: インポート中止
結合: 既存に追加（重複排除）`;
    const result = window.prompt(message + "\n\n「overwrite」「skip」「merge」のいずれかを入力してください:", "skip");
    if (result === "overwrite" || result === "merge" || result === "skip") {
      resolve(result);
    } else {
      resolve("skip");
    }
  });
}
function handleUpdate() {
  try {
    const label = ui.textDictLabel.value.trim();
    const priority = Number.parseInt(ui.textDictPriority.value, 10);
    const content = ui.textDictContent.value;
    if (!label) {
      updateStatusDisplay("ラベル名を入力してください", true);
      return;
    }
    if (!content.trim()) {
      updateStatusDisplay("内容を入力してください", true);
      return;
    }
    const entries = parseTXT(content);
    if (entries.length > TEXT_DICT_MAX_ROWS_PER_LABEL) {
      updateStatusDisplay(`行数が上限（${TEXT_DICT_MAX_ROWS_PER_LABEL.toLocaleString()}行）を超えています: ${entries.length.toLocaleString()}行`, true);
      return;
    }
    const success = updateTextDictionary(currentEditingId, { label, priority, entries });
    if (success) {
      hideForm();
      renderTextDictionaryList();
      updateStatusDisplay(`辞書「${label}」を更新しました`);
    } else {
      updateStatusDisplay("更新に失敗しました", true);
    }
  } catch (err) {
    console.error("Update error:", err);
    updateStatusDisplay(`更新エラー: ${err.message}`, true);
  }
}
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error("ファイル読み込みエラー"));
    reader.readAsText(file, "UTF-8");
  });
}
function renderTextDictionaryList() {
  if (!ui.textDictList) return;
  ui.textDictList.innerHTML = "";
  if (textDictionaries.length === 0) {
    ui.textDictListEmpty.hidden = false;
    return;
  }
  ui.textDictListEmpty.hidden = true;
  const groups = /* @__PURE__ */ new Map();
  for (let priority = 1; priority <= 5; priority++) {
    groups.set(priority, []);
  }
  textDictionaries.forEach((dict) => {
    groups.get(dict.priority).push(dict);
  });
  for (const [priority, dicts] of groups.entries()) {
    if (dicts.length === 0) continue;
    const priorityLabel = getPriorityLabel(priority);
    const groupHeader = document.createElement("div");
    groupHeader.className = "text-dict-group-header";
    groupHeader.textContent = `優先度${priority}${priorityLabel}グループ`;
    ui.textDictList.appendChild(groupHeader);
    dicts.sort((a, b) => a.orderInPriority - b.orderInPriority);
    dicts.forEach((dict) => {
      const item = createDictItem(dict);
      ui.textDictList.appendChild(item);
    });
  }
}
function getPriorityLabel(priority) {
  if (priority === 1) return "(High)";
  if (priority === 3) return "(Mid)";
  if (priority === 5) return "(Low)";
  return "";
}
function createDictItem(dict) {
  const item = document.createElement("div");
  item.className = "text-dict-item";
  item.dataset.id = dict.id;
  const handle = document.createElement("span");
  handle.className = "text-dict-handle";
  handle.textContent = "⋮⋮";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = dict.enabled;
  checkbox.addEventListener("change", () => {
    updateTextDictionary(dict.id, { enabled: checkbox.checked });
    updateStatusDisplay(`辞書「${dict.label}」を${checkbox.checked ? "有効" : "無効"}にしました`);
  });
  const label = document.createElement("strong");
  label.textContent = `${dict.label} (${dict.entries.length.toLocaleString()}件)`;
  const actions = document.createElement("div");
  actions.className = "text-dict-actions";
  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "ghost small";
  editBtn.textContent = "編集";
  editBtn.addEventListener("click", () => {
    showForm("edit", dict);
  });
  const exportBtn = document.createElement("button");
  exportBtn.type = "button";
  exportBtn.className = "ghost small";
  exportBtn.textContent = "エクスポート";
  exportBtn.addEventListener("click", () => {
    handleExport(dict.id);
  });
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "ghost small";
  deleteBtn.textContent = "削除";
  deleteBtn.addEventListener("click", () => {
    handleDelete(dict.id, dict.label);
  });
  actions.appendChild(editBtn);
  actions.appendChild(exportBtn);
  actions.appendChild(deleteBtn);
  item.appendChild(handle);
  item.appendChild(checkbox);
  item.appendChild(label);
  item.appendChild(actions);
  return item;
}
function handleExport(id) {
  const result = exportTextDictionary(id);
  if (!result) {
    updateStatusDisplay("エクスポートに失敗しました", true);
    return;
  }
  const blob = new Blob([result.content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = result.filename;
  a.click();
  URL.revokeObjectURL(url);
  updateStatusDisplay(`${result.filename} をダウンロードしました`);
}
function handleDelete(id, label) {
  if (!window.confirm(`辞書「${label}」を削除しますか？`)) {
    return;
  }
  const success = deleteTextDictionary(id);
  if (success) {
    renderTextDictionaryList();
    updateStatusDisplay(`辞書「${label}」を削除しました`);
  } else {
    updateStatusDisplay("削除に失敗しました", true);
  }
}
function clearInput() {
  ui.inputText.value = "";
  ui.outputText.value = "";
  if (ui.sampleSelect) {
    ui.sampleSelect.value = "";
  }
  updateStatusDisplay("");
  persistState(readDictRows);
  setCurrentMaskDictionary(null);
  setCurrentUnmaskDictionary(null);
  updateUnmaskDictStatus(null);
}
function initTextareaSync() {
  if (!ui.inputText || !ui.outputText) {
    return;
  }
  let syncing = false;
  const applyHeight = (source, target) => {
    if (syncing) {
      return;
    }
    syncing = true;
    target.style.height = `${source.offsetHeight}px`;
    syncing = false;
  };
  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === ui.inputText) {
          applyHeight(ui.inputText, ui.outputText);
        } else if (entry.target === ui.outputText) {
          applyHeight(ui.outputText, ui.inputText);
        }
      });
    });
    observer.observe(ui.inputText);
    observer.observe(ui.outputText);
  } else {
    ui.inputText.addEventListener(
      "mouseup",
      () => applyHeight(ui.inputText, ui.outputText)
    );
    ui.outputText.addEventListener(
      "mouseup",
      () => applyHeight(ui.outputText, ui.inputText)
    );
    ui.inputText.addEventListener(
      "touchend",
      () => applyHeight(ui.inputText, ui.outputText)
    );
    ui.outputText.addEventListener(
      "touchend",
      () => applyHeight(ui.outputText, ui.inputText)
    );
  }
}
function initScrollSync() {
  if (!ui.inputText || !ui.outputText) {
    return;
  }
  let syncing = false;
  const syncScroll = (source, target) => {
    if (syncing) {
      return;
    }
    syncing = true;
    target.scrollTop = source.scrollTop;
    target.scrollLeft = source.scrollLeft;
    syncing = false;
  };
  ui.inputText.addEventListener(
    "scroll",
    () => syncScroll(ui.inputText, ui.outputText)
  );
  ui.outputText.addEventListener(
    "scroll",
    () => syncScroll(ui.outputText, ui.inputText)
  );
}
function initTabs() {
  ui.tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;
      ui.tabs.forEach((btn) => {
        btn.classList.toggle("is-active", btn === tab);
        btn.setAttribute("aria-selected", btn === tab ? "true" : "false");
      });
      ui.tabPanels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.tabPanel === target);
      });
      if (ui.appStats) {
        ui.appStats.classList.toggle("is-hidden", target !== "work");
      }
      if (target !== "work") {
        updateStatusDisplay("");
      }
    });
  });
}
function setPresetPanelOpen(isOpen) {
  if (!ui.presetDock || !ui.presetToggle || !ui.presetPanel) {
    return;
  }
  ui.presetDock.classList.toggle("is-open", Boolean(isOpen));
  ui.presetToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  ui.presetPanel.setAttribute("aria-hidden", isOpen ? "false" : "true");
}
function init() {
  applyBrandConfig();
  state.rules = baseRules.map((rule) => ({ ...rule, enabled: true }));
  const { dictRowsData, needsRulesRender } = restoreState(baseRules);
  if (ui.dictRows && ui.dictRows.children.length === 0) {
    renderDictRows(dictRowsData || [], scheduleMask);
  }
  renderRules(readDictRows, scheduleMask);
  renderPresetOptions();
  renderAddressPrefectureFilters();
  loadAddressDict();
  loadTownAddressDict();
  initTextDictionaryUI();
  if (ui.maskForwardBtn) {
    ui.maskForwardBtn.addEventListener("click", () => maskText(buildDictionaryRules, buildAddressRules, buildTextDictionaryRules));
  }
  if (ui.unmaskBackwardBtn) {
    ui.unmaskBackwardBtn.addEventListener("click", () => {
      unmaskText(currentUnmaskDictionary);
    });
  }
  if (ui.copyBtn) {
    ui.copyBtn.addEventListener("click", copyOutput);
  }
  if (ui.clearBtn) {
    ui.clearBtn.addEventListener("click", clearInput);
  }
  initTextareaSync();
  initScrollSync();
  if (ui.sampleSelect) {
    ui.sampleSelect.addEventListener("change", () => {
      const key = ui.sampleSelect.value;
      if (key && SAMPLE_DATA[key]) {
        ui.inputText.value = SAMPLE_DATA[key];
        persistState(readDictRows);
      }
    });
  }
  ui.presetSave.addEventListener(
    "click",
    () => savePreset(readDictRows)
  );
  ui.presetLoad.addEventListener(
    "click",
    () => loadPreset(
      baseRules,
      renderRules,
      renderDictRows,
      readDictRows,
      scheduleMask
    )
  );
  ui.presetDelete.addEventListener("click", deletePreset);
  ui.presetExport.addEventListener(
    "click",
    () => exportPresetToFile(resolveExportName, readDictRows)
  );
  ui.presetImport.addEventListener("click", () => ui.presetImportFile.click());
  ui.presetImportFile.addEventListener("change", () => {
    var _a;
    importPresetFromFile(
      (_a = ui.presetImportFile.files) == null ? void 0 : _a[0],
      baseRules,
      renderRules,
      renderDictRows,
      readDictRows,
      scheduleMask
    );
  });
  ui.presetSelect.addEventListener("change", () => {
    ui.presetName.value = ui.presetSelect.value;
  });
  ui.inputText.addEventListener("input", () => {
    persistState(readDictRows);
  });
  if (ui.useRandomSessionId) {
    ui.useRandomSessionId.addEventListener("change", () => {
      updateSessionIdControls();
      persistState(readDictRows);
    });
  }
  if (ui.regenSessionId) {
    ui.regenSessionId.addEventListener(
      "click",
      () => regenerateSessionId(maskText)
    );
  }
  if (ui.saveMaskedTextBtn) {
    ui.saveMaskedTextBtn.addEventListener("click", saveMaskedOutput);
  }
  if (ui.savePlainTextBtn) {
    ui.savePlainTextBtn.addEventListener("click", savePlainOutput);
  }
  if (ui.plainTextUploadBtn && ui.plainTextFile) {
    ui.plainTextUploadBtn.addEventListener("click", () => {
      ui.plainTextFile.click();
    });
    ui.plainTextFile.addEventListener("change", () => {
      var _a;
      loadPlainTextFile((_a = ui.plainTextFile.files) == null ? void 0 : _a[0], readDictRows);
      ui.plainTextFile.value = "";
    });
  }
  if (ui.dictAddRow) {
    ui.dictAddRow.addEventListener("click", () => {
      addDictRow(
        { enabled: true, prefix: "", pattern: "", regex: false },
        scheduleMask
      );
    });
  }
  if (ui.dictImportBasic) {
    ui.dictImportBasic.addEventListener(
      "click",
      () => importBasicRulesToDict(
        renderRules,
        scheduleMask,
        savePresetWithPayload,
        buildStatePayload
      )
    );
  }
  ui.dictDefaultPrefix.addEventListener("input", () => {
    persistState(readDictRows);
  });
  ui.toggleAllBtn.addEventListener(
    "click",
    () => toggleAllRules(readDictRows, scheduleMask)
  );
  ui.resetOrderBtn.addEventListener(
    "click",
    () => resetRuleOrder(readDictRows, scheduleMask)
  );
  if (ui.useAddressDict) {
    ui.useAddressDict.addEventListener("change", scheduleMask);
  }
  if (ui.updateAddressDict) {
    ui.updateAddressDict.addEventListener(
      "click",
      () => updateAddressDict()
    );
  }
  if (ui.resetAddressDict) {
    ui.resetAddressDict.addEventListener(
      "click",
      () => resetAddressDict(scheduleMask)
    );
  }
  if (ui.addressSearchInput) {
    ui.addressSearchInput.addEventListener("input", () => {
      renderAddressSearchResults();
    });
  }
  if (ui.addressPrefectureList) {
    ui.addressPrefectureList.addEventListener("change", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement && target.dataset.prefecture) {
        handlePrefectureSelectionChange(
          target.dataset.prefecture,
          target.checked,
          scheduleMask
        );
      }
    });
  }
  if (ui.addressPrefAll) {
    ui.addressPrefAll.addEventListener("click", () => {
      setAllPrefecturesSelection(true, scheduleMask);
    });
  }
  if (ui.addressPrefNone) {
    ui.addressPrefNone.addEventListener("click", () => {
      setAllPrefecturesSelection(false, scheduleMask);
    });
  }
  if (ui.presetToggle) {
    ui.presetToggle.addEventListener("click", () => {
      var _a;
      const isOpen = (_a = ui.presetDock) == null ? void 0 : _a.classList.contains("is-open");
      setPresetPanelOpen(!isOpen);
    });
  }
  if (ui.presetClose) {
    ui.presetClose.addEventListener("click", () => {
      setPresetPanelOpen(false);
    });
  }
  persistState(readDictRows);
  initTabs();
  updateSessionIdControls();
  initUnmaskFeatures();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
//# sourceMappingURL=index.js.map
