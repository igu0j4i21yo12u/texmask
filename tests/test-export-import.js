// Export/Import機能のテストスクリプト
// Usage: node test-export-import.js

const fs = require('fs');

// Codex君の実装から抽出したロジック
function sanitizeFileName(name) {
  return name.replace(/[\\/:*?"<>|]/g, "_").trim() || "config";
}

function parseImportedPayload(raw) {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  // 新形式（メタデータ付き）
  if (raw.payload && typeof raw.payload === "object") {
    return { name: raw.name || "", payload: raw.payload };
  }
  // 旧形式（ペイロードのみ）
  return { name: raw.name || "", payload: raw };
}

// テスト用のサンプル設定
const samplePayload = {
  rules: [
    { name: "ipv4", enabled: true, mode: "pseudonymize" },
    { name: "email", enabled: true, mode: "redact" }
  ],
  dictEntries: [
    { enabled: true, prefix: "NAME", mode: "pseudonymize", pattern: "佐藤", isRegex: false }
  ],
  maskMode: "pseudonymize",
  numberWidth: 3,
  useAddressDict: true
};

console.log("=== Export/Import 機能テスト ===\n");

// Test 1: ファイル名のサニタイズ
console.log("Test 1: ファイル名のサニタイズ");
const testNames = [
  "通常の設定",
  "config/with/slash",
  "name:with:colon",
  'name"with"quotes',
  "name<with>brackets",
  "name|with|pipe",
  "name*with*asterisk",
  "name?with?question"
];

testNames.forEach(name => {
  const sanitized = sanitizeFileName(name);
  console.log(`  "${name}" → "${sanitized}"`);
});

// Test 2: エクスポート形式の確認
console.log("\nTest 2: エクスポート形式の確認");
const exportPayload = {
  name: "テスト設定",
  exportedAt: new Date().toISOString(),
  payload: samplePayload
};

const exportJson = JSON.stringify(exportPayload, null, 2);
console.log("  エクスポートされるJSON構造:");
console.log(exportJson.split('\n').slice(0, 10).join('\n') + "\n  ...");

// Test 3: インポート処理（新形式）
console.log("\nTest 3: インポート処理（新形式・メタデータ付き）");
const parsed1 = parseImportedPayload(exportPayload);
if (parsed1 && parsed1.payload) {
  console.log(`  ✓ 設定名: "${parsed1.name}"`);
  console.log(`  ✓ ルール数: ${parsed1.payload.rules?.length || 0}`);
  console.log(`  ✓ 辞書エントリ数: ${parsed1.payload.dictEntries?.length || 0}`);
} else {
  console.log("  ✗ パース失敗");
}

// Test 4: インポート処理（旧形式・ペイロードのみ）
console.log("\nTest 4: インポート処理（旧形式・ペイロードのみ）");
const parsed2 = parseImportedPayload(samplePayload);
if (parsed2 && parsed2.payload) {
  console.log(`  ✓ 設定名: "${parsed2.name}" (空欄)`);
  console.log(`  ✓ ルール数: ${parsed2.payload.rules?.length || 0}`);
  console.log(`  ✓ 辞書エントリ数: ${parsed2.payload.dictEntries?.length || 0}`);
} else {
  console.log("  ✗ パース失敗");
}

// Test 5: 不正なデータのハンドリング
console.log("\nTest 5: 不正なデータのハンドリング");
const invalidInputs = [
  null,
  undefined,
  "string",
  123,
  [],
  { invalid: "structure" }
];

invalidInputs.forEach(input => {
  const parsed = parseImportedPayload(input);
  const result = parsed && parsed.payload ? "許可" : "拒否";
  const inputStr = String(JSON.stringify(input) || input);
  console.log(`  ${inputStr.slice(0, 30).padEnd(30)} → ${result}`);
});

// Test 6: 実ファイル生成テスト
console.log("\nTest 6: 実ファイル生成テスト");
const testFileName = sanitizeFileName("テスト設定:2025/12/28") + ".json";
const testFilePath = `./${testFileName}`;
fs.writeFileSync(testFilePath, exportJson, "utf-8");
console.log(`  ✓ ファイル生成: ${testFileName}`);
console.log(`  ✓ ファイルサイズ: ${(fs.statSync(testFilePath).size / 1024).toFixed(2)} KB`);

// Test 7: ファイル読み込みテスト
console.log("\nTest 7: ファイル読み込みテスト");
const readData = JSON.parse(fs.readFileSync(testFilePath, "utf-8"));
const parsedRead = parseImportedPayload(readData);
if (parsedRead && parsedRead.payload) {
  console.log(`  ✓ ファイルから読み込み成功`);
  console.log(`  ✓ 設定名: "${parsedRead.name}"`);
  console.log(`  ✓ エクスポート日時: ${readData.exportedAt}`);
  console.log(`  ✓ maskMode: ${parsedRead.payload.maskMode}`);
  console.log(`  ✓ numberWidth: ${parsedRead.payload.numberWidth}`);
  console.log(`  ✓ useAddressDict: ${parsedRead.payload.useAddressDict}`);
} else {
  console.log("  ✗ ファイル読み込み失敗");
}

// クリーンアップ
fs.unlinkSync(testFilePath);
console.log(`\n  ✓ テストファイル削除: ${testFileName}`);

console.log("\n=== 全テスト完了 ===");