// Geolonia住所データから、マスキング用の住所パターンを生成するスクリプト
// Usage: node build-address-dict.js

const fs = require('fs');
const https = require('https');

const GEOLONIA_URL = 'https://geolonia.github.io/japanese-addresses/api/ja.json';
const OUTPUT_FILE = './address-dict.js';

async function fetchAddressData() {
  return new Promise((resolve, reject) => {
    https.get(GEOLONIA_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

function buildAddressPatterns(data) {
  const patterns = [];

  // 都道府県 + 市区町村のパターンを生成
  for (const [prefecture, cities] of Object.entries(data)) {
    cities.forEach(city => {
      // 「東京都千代田区」のような完全パターン
      patterns.push(`${prefecture}${city}`);
    });
  }

  return patterns;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function main() {
  console.log('Fetching Geolonia address data...');
  const data = await fetchAddressData();

  console.log('Building address patterns...');
  const patterns = buildAddressPatterns(data);

  console.log(`Total patterns: ${patterns.length}`);

  // JavaScriptファイルとして出力
  const now = new Date();
  const version = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const output = `// 住所辞書データ (Geolonia japanese-addresses)
// 生成日時: ${now.toISOString()}
// データバージョン: ${version}
// ライセンス: CC BY 4.0
// データソース: https://geolonia.github.io/japanese-addresses/

const ADDRESS_DICT_VERSION = "${version}";
const ADDRESS_DICT_UPDATED = "${now.toISOString().split('T')[0]}";
const ADDRESS_DICT_COUNT = ${patterns.length};

// 住所パターン（都道府県+市区町村）
const ADDRESS_PATTERNS = ${JSON.stringify(patterns, null, 2)};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ADDRESS_DICT_VERSION,
    ADDRESS_DICT_UPDATED,
    ADDRESS_DICT_COUNT,
    ADDRESS_PATTERNS,
  };
}
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`✓ Address dictionary saved to ${OUTPUT_FILE}`);
  console.log(`  Version: ${version}`);
  console.log(`  Patterns: ${patterns.length}`);
  console.log(`  File size: ${(fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1)} KB`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});