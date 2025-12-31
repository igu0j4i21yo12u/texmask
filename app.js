const baseRules = [
  {
    name: "ipv4_subnet_pair",
    label: "IPv4 + Subnet",
    pattern:
      "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\s+(?:255|254|252|248|240|224|192|128|0)\\.(?:255|254|252|248|240|224|192|128|0)\\.(?:255|254|252|248|240|224|192|128|0)\\.(?:255|254|252|248|240|224|192|128|0)\\b",
    mode: "pseudonymize",
    prefix: "SUBNET",
  },
  {
    name: "cidr_ipv4",
    label: "CIDR v4",
    pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}/\\d{1,2}\\b",
    mode: "pseudonymize",
    prefix: "CIDR",
  },
  {
    name: "cidr_ipv6",
    label: "CIDR v6",
    pattern:
      "(?i)(?<![A-F0-9:])(?:(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}|(?:[A-F0-9]{1,4}:){1,7}:|(?:[A-F0-9]{1,4}:){1,6}:[A-F0-9]{1,4}|(?:[A-F0-9]{1,4}:){1,5}(?::[A-F0-9]{1,4}){1,2}|(?:[A-F0-9]{1,4}:){1,4}(?::[A-F0-9]{1,4}){1,3}|(?:[A-F0-9]{1,4}:){1,3}(?::[A-F0-9]{1,4}){1,4}|(?:[A-F0-9]{1,4}:){1,2}(?::[A-F0-9]{1,4}){1,5}|[A-F0-9]{1,4}:(?:(?::[A-F0-9]{1,4}){1,6})|:(?:(?::[A-F0-9]{1,4}){1,7}|:))/\\d{1,3}(?![A-F0-9:])",
    mode: "pseudonymize",
    prefix: "CIDR6",
  },
  {
    name: "ipv6_address",
    label: "IPv6",
    pattern:
      "(?i)(?<![A-F0-9:])(?:(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}|(?:[A-F0-9]{1,4}:){1,7}:|(?:[A-F0-9]{1,4}:){1,6}:[A-F0-9]{1,4}|(?:[A-F0-9]{1,4}:){1,5}(?::[A-F0-9]{1,4}){1,2}|(?:[A-F0-9]{1,4}:){1,4}(?::[A-F0-9]{1,4}){1,3}|(?:[A-F0-9]{1,4}:){1,3}(?::[A-F0-9]{1,4}){1,4}|(?:[A-F0-9]{1,4}:){1,2}(?::[A-F0-9]{1,4}){1,5}|[A-F0-9]{1,4}:(?:(?::[A-F0-9]{1,4}){1,6})|:(?:(?::[A-F0-9]{1,4}){1,7}|:))(?![A-F0-9:])",
    mode: "pseudonymize",
    prefix: "IPV6",
  },
  {
    name: "ip_address",
    label: "IPv4",
    pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
    mode: "pseudonymize",
    prefix: "IPv4",
  },
  {
    name: "email",
    label: "Email",
    pattern: "(?i)[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}",
    mode: "pseudonymize",
    prefix: "EMAIL",
  },
  {
    name: "fqdn",
    label: "FQDN",
    pattern: "(?i)\\b(?:[A-Z0-9-]+\\.)+[A-Z]{2,}\\b",
    mode: "pseudonymize",
    prefix: "FQDN",
  },
  {
    name: "contract_number",
    label: "Contract No.",
    pattern: "\\b[A-Z]{2,4}-\\d{4,}\\b",
    mode: "pseudonymize",
    prefix: "CONTRACT",
  },
  {
    name: "phone_jp",
    label: "電話番号・日本",
    pattern:
      "(?<![\\d:])(?:\\(0\\d{1,4}\\)[\\s-]?\\d{2,4}[\\s-]?\\d{4}|0\\d{1,4}\\(\\d{2,4}\\)\\d{4}|0\\d{1,4}[\\s-]?\\d{2,4}[\\s-]?\\d{4}|(?:0120|0800|0570)[\\s-]?\\d{3}[\\s-]?\\d{3})(?![\\d:])",
    mode: "pseudonymize",
    prefix: "PHONEJP",
  },
  {
    name: "phone_intl",
    label: "電話番号・国番号形式",
    pattern: "(?<![\\d:])\\+\\d{1,3}(?:[\\s-]?\\(0\\))?(?:[\\s-]?\\d){9,14}(?![\\d:])",
    mode: "pseudonymize",
    prefix: "PHONEINTL",
  },
  {
    name: "azure_subscription_id",
    label: "Azure Subscription ID",
    pattern: "\\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\\b",
    mode: "pseudonymize",
    prefix: "AZURE",
  },
  {
    name: "jwt_token",
    label: "JWT",
    pattern: "eyJ[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+",
    mode: "pseudonymize",
    prefix: "JWT",
  },
  {
    name: "api_key",
    label: "API Key",
    pattern: "\\b[A-Za-z0-9_-]{32,}\\b",
    mode: "pseudonymize",
    prefix: "API",
  },
  {
    name: "gcp_project_id",
    label: "GCP Project ID",
    pattern: "\\b[a-z][a-z0-9-]{4,28}[a-z0-9]\\b",
    mode: "pseudonymize",
    prefix: "GCP",
  },
  {
    name: "postal_code_jp",
    label: "郵便番号",
    pattern: "\\b\\d{3}-?\\d{4}\\b",
    mode: "pseudonymize",
    prefix: "ZIP",
  },
  {
    name: "aws_account_id",
    label: "AWS Account ID",
    pattern: "\\b\\d{12}\\b",
    mode: "pseudonymize",
    prefix: "AWS",
  },
];

const ui = {
  inputText: document.getElementById("inputText"),
  outputText: document.getElementById("outputText"),
  maskBtn: document.getElementById("maskBtn"),
  copyBtn: document.getElementById("copyBtn"),
  clearBtn: document.getElementById("clearBtn"),
  sampleSelect: document.getElementById("sampleSelect"),
  autoMask: document.getElementById("autoMask"),
  numberWidthRow: document.getElementById("numberWidthRow"),
  numberWidth: document.getElementById("numberWidth"),
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
  addressSearchInput: document.getElementById("addressSearchInput"),
  addressSearchResults: document.getElementById("addressSearchResults"),
  updateAddressDict: document.getElementById("updateAddressDict"),
  resetAddressDict: document.getElementById("resetAddressDict"),
  downloadDictBtn: document.getElementById("downloadDictBtn"),
  unmaskInputText: document.getElementById("unmaskInputText"),
  unmaskOutputText: document.getElementById("unmaskOutputText"),
  unmaskClearBtn: document.getElementById("unmaskClearBtn"),
  unmaskCopyBtn: document.getElementById("unmaskCopyBtn"),
  unmaskTextFile: document.getElementById("unmaskTextFile"),
  unmaskTextDrop: document.getElementById("unmaskTextDrop"),
  unmaskDictFile: document.getElementById("unmaskDictFile"),
  unmaskDictDrop: document.getElementById("unmaskDictDrop"),
  unmaskStats: document.getElementById("unmaskStats"),
};

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
  postal_code_jp: "100-0001 / 123-4567",
};

const state = {
  rules: baseRules.map((rule) => ({ ...rule, enabled: true })),
};

const STORAGE_KEY = "masking-web-state-v1";
const PRESET_KEY = "masking-web-presets-v1";
const ADDRESS_DICT_CUSTOM_KEY = "masking-web-address-dict-custom-v1";
const HMAC_KEY_STORAGE = "masking-web-hmac-key-v1";
const MASK_DELAY_MS = 180;
const COPY_FEEDBACK_DURATION_MS = 1200;
const SESSION_ID_LENGTH = 4;
const ADDRESS_SEARCH_LIMIT = 50;
const DICT_IMPORT_BACKUP_PREFIX = "転記前バックアップ";
const GEOLONIA_API_URL = "https://geolonia.github.io/japanese-addresses/api/ja.json";
let maskTimer = null;
let addressPatterns = null; // 住所パターンのキャッシュ
let addressPatternRegex = null; // 住所パターン正規表現のキャッシュ
let currentSessionId = null; // 現在のセッションID
let currentMaskDictionary = null; // 現在のマスク辞書
let currentUnmaskDictionary = null; // 復号用辞書
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
    "サーバー: gateway-01.internal.example.com (10.10.10.10)",
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
    "ipv6_host=2001:db8:8::21",
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
    "発生時刻: 2024-06-18 16:00",
  ].join("\n"),
};


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

class PlaceholderMap {
  constructor(sessionId, includeSessionId) {
    this.dictionaryId = sessionId || generateSessionId();
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
      session_id: "",
      created_at: new Date().toISOString(),
      mappings: mappings
    };
  }
}

function formatCount(value, width) {
  const raw = String(value);
  if (!width || width <= raw.length) {
    return raw;
  }
  return raw.padStart(width, "0");
}

function generateSessionId() {
  // 短い4文字のランダムIDを生成
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < SESSION_ID_LENGTH; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getNumberWidth() {
  const parsed = Number.parseInt(ui.numberWidth.value, 10);
  return Number.isFinite(parsed) ? parsed : 3;
}

function getDictDefaultPrefix() {
  const raw = ui.dictDefaultPrefix?.value || "DICT";
  const trimmed = raw.trim();
  return trimmed ? trimmed.toUpperCase() : "DICT";
}

function readDictRows() {
  if (!ui.dictRows) {
    return [];
  }
  return Array.from(ui.dictRows.querySelectorAll(".dict-row")).map((row) => ({
    enabled: row.querySelector(".dict-enabled")?.checked ?? true,
    prefix: row.querySelector(".dict-prefix")?.value?.trim() || "",
    pattern: row.querySelector(".dict-pattern")?.value?.trim() || "",
    regex: row.querySelector(".dict-regex")?.checked ?? false,
  }));
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
      prefix: (entry.prefix || defaultPrefix).toUpperCase(),
    });
  });

  if (hasError) {
    return null;
  }
  return rules;
}

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

function validatePattern(pattern) {
  try {
    const normalized = normalizeRegexPattern(pattern);
    new RegExp(normalized.value, normalized.flags);
    return { valid: true };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

function createDictRow(entry = {}) {
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
    persistState();
    scheduleMask();
  });

  const attach = (node, eventName = "input") => {
    node.addEventListener(eventName, () => {
      persistState();
      scheduleMask();
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

function renderDictRows(entries = []) {
  if (!ui.dictRows) {
    return;
  }
  ui.dictRows.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const rows = entries.length
    ? entries
    : [{ enabled: true, prefix: "", pattern: "", regex: false }];
  rows.forEach((entry) => {
    fragment.appendChild(createDictRow(entry));
  });
  ui.dictRows.appendChild(fragment);
}

function addDictRow(entry = {}) {
  if (!ui.dictRows) {
    return;
  }
  ui.dictRows.appendChild(createDictRow(entry));
  persistState();
  scheduleMask();
}

function importBasicRulesToDict() {
  const ok = window.confirm(
    "・基本設定の各項目が、正規表現として任意辞書の末尾にコピーされます。\n・基本設定の各項目がオフになります。\n・転記前の設定が以下の名前でマイ設定に保存されます。\n　　転記前バックアップ_YYYYmmdd-HHMM\n・以上、よろしければ「OK」を押してください。"
  );
  if (!ok) {
    return;
  }
  saveImportBackupPreset();
  const entries = state.rules.map((rule) => ({
    enabled: rule.enabled,
    prefix: rule.prefix || "",
    pattern: rule.pattern || "",
    regex: true,
  }));
  const current = readDictRows();
  renderDictRows([...current, ...entries]);
  state.rules = state.rules.map((rule) => ({ ...rule, enabled: false }));
  renderRules();
  persistState();
  scheduleMask();
  updateStatusDisplay("基本設定を辞書へ転記しました。");
}

function saveImportBackupPreset() {
  const payload = buildStatePayload();
  const timestamp = formatBackupTimestamp(new Date());
  const name = `${DICT_IMPORT_BACKUP_PREFIX}_${timestamp}`;
  const presets = loadPresets();
  presets.push({
    name,
    payload,
    updatedAt: new Date().toISOString(),
  });
  savePresets(presets);
  renderPresetOptions();
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

function formatTimestampForFilename(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}`;
}

function applyRule(text, rule, placeholders, counts) {
  if (!rule.pattern) {
    return text;
  }
  const numberWidth = getNumberWidth();
  const regex = buildRuleRegex(rule);
  let hits = 0;
  const replaced = text.replace(regex, (match) => {
    hits += 1;
    return placeholders.get(rule.name, match, rule.prefix, numberWidth);
  });
  if (hits) {
    counts[rule.name] = (counts[rule.name] || 0) + hits;
  }
  return replaced;
}

function maskText() {
  const source = ui.inputText.value || "";
  if (!source.trim()) {
    ui.outputText.value = "";
    updateStatusDisplay("入力テキストが空です。");
    currentMaskDictionary = null;
    return;
  }

  // 新しいセッションIDを生成
  if (!currentSessionId) {
    currentSessionId = generateSessionId();
  }
  const includeSessionId = ui.useRandomSessionId?.checked ?? true;
  const placeholders = new PlaceholderMap(currentSessionId, includeSessionId);
  const counts = {};
  let result = source;
  try {
    // 任意辞書
    const dictRules = buildDictionaryRules();
    if (dictRules === null) {
      return;
    }
    dictRules.forEach((dictRule) => {
      result = applyRule(result, dictRule, placeholders, counts);
    });

    // 住所辞書（基本ルールより先に適用）
    const addressRules = buildAddressRules();
    addressRules.forEach((addressRule) => {
      result = applyRule(result, addressRule, placeholders, counts);
    });

    // 基本ルール
    state.rules.forEach((rule) => {
      if (!rule.enabled) {
        return;
      }
      result = applyRule(result, rule, placeholders, counts);
    });
    ui.outputText.value = result;
    renderStats(counts);

    // 辞書を保存
    currentMaskDictionary = placeholders.getDictionary();
  } catch (err) {
    updateStatusDisplay("正規表現の形式が不正です。", true);
  }
}

function renderStats(counts) {
  const allEntries = [];

  // 基本ルール
  state.rules
    .filter((rule) => counts[rule.name])
    .forEach((rule) => {
      allEntries.push(`${rule.label}: ${counts[rule.name]}`);
    });

  // その他のルール（辞書、住所など）
  for (const [key, count] of Object.entries(counts)) {
    // 基本ルールに含まれないものを追加
    const isBaseRule = state.rules.some(rule => rule.name === key);
    if (!isBaseRule) {
      // キー名から適切なラベルを生成
      let label = key;
      if (key.startsWith('dictionary_')) {
        label = '辞書';
      } else if (key.startsWith('address_')) {
        label = '住所';
      }
      allEntries.push(`${label}: ${count}`);
    }
  }

  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const breakdown = allEntries.length ? allEntries.join(" / ") : "なし";

  updateStatusDisplay(`総マスク数: ${total} （内訳: ${breakdown}）`);
}

function renderRules() {
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
      persistState();
      scheduleMask();
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

  initRuleDrag();
}

function initRuleDrag() {
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
      persistState();
      renderRules();
      scheduleMask();
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
    persistState();
    renderRules();
    scheduleMask();
  });
}

function toggleAllRules() {
  const shouldEnable = state.rules.some((rule) => !rule.enabled);
  state.rules = state.rules.map((rule) => ({ ...rule, enabled: shouldEnable }));
  renderRules();
  persistState();
  scheduleMask();
}

function resetRuleOrder() {
  state.rules = baseRules.map((rule) => {
    const existing = state.rules.find((item) => item.name === rule.name);
    return {
      ...rule,
      enabled: existing ? existing.enabled : true,
    };
  });
  persistState();
  renderRules();
  scheduleMask();
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
    ui.copyBtn.textContent = "失敗";
    setTimeout(() => {
      ui.copyBtn.textContent = "コピー";
    }, COPY_FEEDBACK_DURATION_MS);
  }
}

function clearInput() {
  ui.inputText.value = "";
  ui.outputText.value = "";
  updateStatusDisplay("");
  persistState();
}

function scheduleMask() {
  if (!ui.autoMask.checked) {
    return;
  }
  if (maskTimer) {
    clearTimeout(maskTimer);
  }
  maskTimer = setTimeout(() => {
    maskText();
  }, MASK_DELAY_MS);
}

function buildStatePayload() {
  return {
    inputText: ui.inputText.value,
    sampleSelect: ui.sampleSelect.value,
    autoMask: ui.autoMask.checked,
    useRandomSessionId: ui.useRandomSessionId?.checked ?? true,
    numberWidth: ui.numberWidth.value,
    dictDefaultPrefix: ui.dictDefaultPrefix.value,
    dictRows: readDictRows(),
    rules: state.rules.map((rule) => ({
      name: rule.name,
      enabled: rule.enabled,
    })),
    rulesOrder: state.rules.map((rule) => rule.name),
  };
}

function applyStatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return;
  }
  if (typeof payload.inputText === "string") {
    ui.inputText.value = payload.inputText;
  }
  if (typeof payload.sampleSelect === "string") {
    ui.sampleSelect.value = payload.sampleSelect;
  }
  if (typeof payload.autoMask === "boolean") {
    ui.autoMask.checked = payload.autoMask;
  }
  if (typeof payload.useRandomSessionId === "boolean" && ui.useRandomSessionId) {
    ui.useRandomSessionId.checked = payload.useRandomSessionId;
  }
  if (typeof payload.numberWidth === "string") {
    ui.numberWidth.value = payload.numberWidth;
  }
  if (typeof payload.dictDefaultPrefix === "string") {
    ui.dictDefaultPrefix.value = payload.dictDefaultPrefix;
  }
  if (Array.isArray(payload.dictRows)) {
    renderDictRows(payload.dictRows);
  }
  if (Array.isArray(payload.rules)) {
    const enabledMap = new Map(payload.rules.map((rule) => [rule.name, rule.enabled]));
    state.rules = baseRules.map((rule) => ({
      ...rule,
      enabled: enabledMap.has(rule.name) ? enabledMap.get(rule.name) : true,
    }));
  }
  if (Array.isArray(payload.rulesOrder)) {
    const orderMap = new Map(payload.rulesOrder.map((name, idx) => [name, idx]));
    state.rules.sort((a, b) => {
      const aPos = orderMap.has(a.name) ? orderMap.get(a.name) : Number.MAX_SAFE_INTEGER;
      const bPos = orderMap.has(b.name) ? orderMap.get(b.name) : Number.MAX_SAFE_INTEGER;
      return aPos - bPos;
    });
  }
}

function buildPresetPayload() {
  const payload = buildStatePayload();
  payload.inputText = "";
  payload.sampleSelect = "";
  return payload;
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
    return [];
  }
}

function savePresets(list) {
  try {
    localStorage.setItem(PRESET_KEY, JSON.stringify(list));
  } catch (err) {
    // Ignore storage failures.
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

function savePreset() {
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
    existing.payload = buildPresetPayload();
    existing.updatedAt = new Date().toISOString();
  } else {
    presets.push({
      name,
      payload: buildPresetPayload(),
      updatedAt: new Date().toISOString(),
    });
  }
  savePresets(presets);
  renderPresetOptions();
  ui.presetSelect.value = name;
  updatePresetStatusDisplay("");
}

function loadPreset() {
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
  applyStatePayload(target.payload);
  renderRules();
  persistState();
  scheduleMask();
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

function updateSessionIdControls() {
  if (!ui.regenSessionId || !ui.useRandomSessionId) {
    return;
  }
  ui.regenSessionId.disabled = !ui.useRandomSessionId.checked;
}

function regenerateSessionId() {
  currentSessionId = generateSessionId();
  maskText();
}

function saveMaskedOutput() {
  const value = ui.outputText.value;
  if (!value) {
    updateStatusDisplay("保存するテキストがありません。", true);
    return;
  }
  const timestamp = formatTimestampForFilename(new Date());
  const blob = new Blob([value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `masked-text-${timestamp}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  updateStatusDisplay("マスク後テキストを保存しました。");
}

function sanitizeFileName(name) {
  return name.replace(/[\\/:*?"<>|]/g, "_").trim() || "config";
}

function resolveExportName() {
  const name = ui.presetName.value.trim() || ui.presetSelect.value.trim();
  if (!name) {
    return null;
  }
  return name;
}

function exportPresetToFile() {
  const name = resolveExportName();
  if (!name) {
    updatePresetStatusDisplay("設定名を入力してください。", true);
    return;
  }

  const payload = buildPresetPayload();
  const exportPayload = {
    name,
    exportedAt: new Date().toISOString(),
    payload,
  };
  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${sanitizeFileName(name)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  updatePresetStatusDisplay(`設定「${name}」をJSONに保存しました。`);
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

function importPresetFromFile(file) {
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
      applyStatePayload(parsed.payload);
      renderRules();
      persistState();
      scheduleMask();
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

function persistState() {
  try {
    const payload = buildStatePayload();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    // Ignore storage failures (private mode, disabled storage).
  }
}

function restoreState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    const payload = JSON.parse(raw);
    applyStatePayload(payload);
  } catch (err) {
    // Ignore parse/storage failures.
  }
}

// 住所辞書管理関数
async function loadAddressDict() {
  // localStorageのカスタム辞書を優先
  const custom = loadCustomAddressDict();
  if (custom) {
    addressPatterns = custom.patterns;
    addressPatternRegex = buildAddressPatternRegex(addressPatterns);
    renderAddressDictStatus(custom);
    return;
  }

  // 同梱の address-dict.js を使用
  if (typeof ADDRESS_PATTERNS !== 'undefined' && Array.isArray(ADDRESS_PATTERNS)) {
    addressPatterns = ADDRESS_PATTERNS;
    addressPatternRegex = buildAddressPatternRegex(addressPatterns);
    renderAddressDictStatus({
      version: ADDRESS_DICT_VERSION || 'unknown',
      updated: ADDRESS_DICT_UPDATED || '-',
      count: ADDRESS_DICT_COUNT || ADDRESS_PATTERNS.length,
      source: 'local'
    });
  } else {
    ui.addressDictVersion.textContent = 'エラー';
    ui.addressDictSource.textContent = 'データが見つかりません';
  }
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
      version: data.version || 'unknown',
      updated: data.updated || '-',
      count: data.patterns.length,
      source: 'custom',
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

  if (info.source === 'custom') {
    ui.addressDictSource.textContent = 'オンライン更新';
  } else {
    ui.addressDictSource.textContent = 'ローカル同梱';
  }

  renderAddressSearchResults();
}

function buildAddressPatternRegex(patterns) {
  if (!Array.isArray(patterns) || patterns.length === 0) {
    return null;
  }
  const escapedPatterns = patterns.map((addr) => escapeRegExp(addr));
  return escapedPatterns.join('|');
}

function formatAddressDictVersion(version) {
  // "2025-12" -> "2025年12月版"
  if (!version || version === 'unknown') return '-';
  const match = version.match(/^(\d{4})-(\d{2})$/);
  if (match) {
    return `${match[1]}年${parseInt(match[2], 10)}月版`;
  }
  return version;
}

function renderAddressSearchResults(query) {
  if (!ui.addressSearchResults) {
    return;
  }
  const patterns = addressPatterns
    || (typeof ADDRESS_PATTERNS !== 'undefined' && Array.isArray(ADDRESS_PATTERNS)
      ? ADDRESS_PATTERNS
      : null);
  if (!patterns) {
    ui.addressSearchResults.textContent = "辞書を読み込み中...";
    return;
  }
  if (!addressPatterns) {
    addressPatterns = patterns;
  }
  const raw = query ?? ui.addressSearchInput?.value ?? "";
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
  ui.updateAddressDict.textContent = '更新中...';

  try {
    const response = await fetch(GEOLONIA_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const patterns = buildAddressPatternsFromGeolonia(data);

    const now = new Date();
    const version = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const updated = now.toISOString().split('T')[0];

    const payload = {
      version,
      updated,
      patterns,
      source: 'geolonia'
    };

    localStorage.setItem(ADDRESS_DICT_CUSTOM_KEY, JSON.stringify(payload));
    addressPatterns = patterns;
    addressPatternRegex = buildAddressPatternRegex(addressPatterns);

    renderAddressDictStatus({
      version,
      updated,
      count: patterns.length,
      source: 'custom'
    });

    updateStatusDisplay('住所辞書を最新版に更新しました。');
    scheduleMask();
  } catch (err) {
    updateStatusDisplay('住所辞書の更新に失敗しました。', true);
    console.error('Address dict update failed:', err);
  } finally {
    ui.updateAddressDict.disabled = false;
    ui.updateAddressDict.textContent = '最新版に更新';
  }
}

function buildAddressPatternsFromGeolonia(data) {
  const patterns = [];

  for (const [prefecture, cities] of Object.entries(data)) {
    cities.forEach(city => {
      patterns.push(`${prefecture}${city}`);
    });
  }

  return patterns;
}

function resetAddressDict() {
  const ok = window.confirm('住所辞書をローカル同梱版に戻しますか？\nオンラインで更新した辞書データは削除されます。');
  if (!ok) {
    return;
  }

  try {
    localStorage.removeItem(ADDRESS_DICT_CUSTOM_KEY);
    loadAddressDict();
    updateStatusDisplay('住所辞書を初期版に戻しました。');
    scheduleMask();
  } catch (err) {
    updateStatusDisplay('住所辞書のリセットに失敗しました。', true);
  }
}

function buildAddressRules() {
  if (!ui.useAddressDict.checked) {
    return [];
  }

  const rules = [];

  // 例: 東京都千代田区千代田1-1, 大阪府大阪市北区梅田1-1
  if (addressPatternRegex) {
    const prefectureCity = addressPatternRegex;

    // 住所全体（町名+番地まで）のパターン
    rules.push({
      name: 'address_full',
      label: '住所（完全）',
      pattern: `(?:${prefectureCity})[^\\n\\r]*?[0-9０-９一二三四五六七八九十百千万]+(?:丁目|番地?|号|[-−ー]|の|・)+[0-9０-９一二三四五六七八九十百千万]+(?:丁目|番地?|号)?(?:[-−ー][0-9０-９一二三四五六七八九十百千万]+){0,2}(?:丁目|番地?|号)?`,
      mode: 'pseudonymize',
      prefix: 'ADDRESS'
    });

    // 都道府県+市区町村のみ（フォールバック）
    rules.push({
      name: 'address_prefecture_city',
      label: '住所（都道府県・市区町村）',
      pattern: prefectureCity,
      mode: 'pseudonymize',
      prefix: 'ADDRESS'
    });
  }

  return rules;
}

function init() {
  restoreState();
  if (ui.dictRows && ui.dictRows.children.length === 0) {
    renderDictRows();
  }
  renderRules();
  renderPresetOptions();

  // 住所辞書の初期化
  loadAddressDict();

  ui.maskBtn.addEventListener("click", maskText);
  ui.copyBtn.addEventListener("click", copyOutput);
  ui.clearBtn.addEventListener("click", clearInput);
  initTextareaSync();
  initScrollSync();
  ui.sampleSelect.addEventListener("change", () => {
    const key = ui.sampleSelect.value;
    if (key && SAMPLE_DATA[key]) {
      ui.inputText.value = SAMPLE_DATA[key];
      persistState();
      scheduleMask();
    }
  });
  ui.presetSave.addEventListener("click", savePreset);
  ui.presetLoad.addEventListener("click", loadPreset);
  ui.presetDelete.addEventListener("click", deletePreset);
  ui.presetExport.addEventListener("click", exportPresetToFile);
  ui.presetImport.addEventListener("click", () => ui.presetImportFile.click());
  ui.presetImportFile.addEventListener("change", () => {
    importPresetFromFile(ui.presetImportFile.files?.[0]);
  });
  ui.presetSelect.addEventListener("change", () => {
    ui.presetName.value = ui.presetSelect.value;
  });
  ui.inputText.addEventListener("input", () => {
    persistState();
    scheduleMask();
  });
  ui.numberWidth.addEventListener("change", () => {
    persistState();
    scheduleMask();
  });
  if (ui.useRandomSessionId) {
    ui.useRandomSessionId.addEventListener("change", () => {
      updateSessionIdControls();
      persistState();
      scheduleMask();
    });
  }
  if (ui.regenSessionId) {
    ui.regenSessionId.addEventListener("click", regenerateSessionId);
  }
  if (ui.saveMaskedTextBtn) {
    ui.saveMaskedTextBtn.addEventListener("click", saveMaskedOutput);
  }
  if (ui.dictAddRow) {
    ui.dictAddRow.addEventListener("click", () => {
      addDictRow({ enabled: true, prefix: "", pattern: "", regex: false });
    });
  }
  if (ui.dictImportBasic) {
    ui.dictImportBasic.addEventListener("click", importBasicRulesToDict);
  }
  ui.dictDefaultPrefix.addEventListener("input", () => {
    persistState();
    scheduleMask();
  });
  ui.toggleAllBtn.addEventListener("click", toggleAllRules);
  ui.resetOrderBtn.addEventListener("click", resetRuleOrder);

  // 住所辞書のイベントリスナー
  if (ui.useAddressDict) {
    ui.useAddressDict.addEventListener("change", scheduleMask);
  }
  if (ui.updateAddressDict) {
    ui.updateAddressDict.addEventListener("click", updateAddressDict);
  }
  if (ui.resetAddressDict) {
    ui.resetAddressDict.addEventListener("click", resetAddressDict);
  }
  if (ui.addressSearchInput) {
    ui.addressSearchInput.addEventListener("input", () => {
      renderAddressSearchResults();
    });
  }

  if (ui.presetToggle) {
    ui.presetToggle.addEventListener("click", () => {
      const isOpen = ui.presetDock?.classList.contains("is-open");
      setPresetPanelOpen(!isOpen);
    });
  }
  if (ui.presetClose) {
    ui.presetClose.addEventListener("click", () => {
      setPresetPanelOpen(false);
    });
  }
  persistState();
  scheduleMask();
  initTabs();
  updateSessionIdControls();

  // マスク解除機能の初期化
  if (typeof initUnmaskFeatures === 'function') {
    initUnmaskFeatures();
  }
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
    ui.inputText.addEventListener("mouseup", () => applyHeight(ui.inputText, ui.outputText));
    ui.outputText.addEventListener("mouseup", () => applyHeight(ui.outputText, ui.inputText));
    ui.inputText.addEventListener("touchend", () => applyHeight(ui.inputText, ui.outputText));
    ui.outputText.addEventListener("touchend", () => applyHeight(ui.outputText, ui.inputText));
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

  ui.inputText.addEventListener("scroll", () => syncScroll(ui.inputText, ui.outputText));
  ui.outputText.addEventListener("scroll", () => syncScroll(ui.outputText, ui.inputText));
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

// DOMContentLoadedで初期化（unmask.jsの読み込み完了を保証）
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
