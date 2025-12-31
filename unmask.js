// unmask.js - マスク解除機能

// HMAC-SHA256署名の生成
async function generateHMAC(data, key) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const dataBuffer = encoder.encode(data);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataBuffer);
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `sha256:${hashHex}`;
}

// HMAC鍵の取得または生成
function getOrCreateHMACKey() {
  let key = localStorage.getItem(HMAC_KEY_STORAGE);
  if (!key) {
    key = crypto.randomUUID();
    localStorage.setItem(HMAC_KEY_STORAGE, key);
  }
  return key;
}

// 辞書に署名を追加
async function signDictionary(dict) {
  const key = getOrCreateHMACKey();
  const payload = JSON.stringify(dict.mappings);
  const signature = await generateHMAC(payload, key);

  return {
    ...dict,
    protection_mode: 'auto',
    signature: signature
  };
}

// 辞書の署名を検証
async function verifyDictionarySignature(dict) {
  if (!dict.signature) {
    return { valid: false, error: '署名がありません' };
  }

  const key = getOrCreateHMACKey();
  const payload = JSON.stringify(dict.mappings);
  const expectedSignature = await generateHMAC(payload, key);

  if (dict.signature !== expectedSignature) {
    return { valid: false, error: '署名が一致しません' };
  }

  return { valid: true };
}

// 辞書をJSONファイルとしてダウンロード
async function downloadDictionary() {
  if (!currentMaskDictionary) {
    updateStatusDisplay('マスク実行後に辞書をダウンロードできます。', true);
    return;
  }

  try {
    // 署名を追加
    const signedDict = await signDictionary(currentMaskDictionary);

    const blob = new Blob([JSON.stringify(signedDict, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mask-dict-${formatTimestampForFilename(signedDict.created_at)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    updateStatusDisplay('辞書をダウンロードしました。');
  } catch (err) {
    updateStatusDisplay('辞書のダウンロードに失敗しました。', true);
    console.error('Dictionary download failed:', err);
  }
}

function formatTimestampForFilename(isoString) {
  const date = new Date(isoString);
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}`;
}

// 復号処理
function unmaskText(dictionary) {
  const input = ui.unmaskInputText.value || '';
  if (!input.trim()) {
    ui.unmaskOutputText.value = '';
    updateUnmaskStatusDisplay('入力テキストが空です。');
    return;
  }

  if (!dictionary || !dictionary.mappings) {
    ui.unmaskOutputText.value = '';
    updateUnmaskStatusDisplay('辞書が読み込まれていません。', true);
    return;
  }

  let output = input;
  const stats = [];

  // 復号実行（各マスクを元の値に置換）
  for (const [mask, original] of Object.entries(dictionary.mappings)) {
    const escapedMask = escapeRegExp(mask);
    const regex = new RegExp(escapedMask, 'g');
    const matches = output.match(regex);
    if (matches) {
      stats.push({ mask, original, count: matches.length });
      output = output.replace(regex, original);
    }
  }

  // 統計情報を計算
  const totalCount = stats.reduce((sum, s) => sum + s.count, 0);

  ui.unmaskOutputText.value = output;
  updateUnmaskStatusDisplay(`総マスク解除数: ${totalCount}`);
}

function updateUnmaskStatusDisplay(message, isError = false) {
  if (ui.unmaskStats) {
    ui.unmaskStats.textContent = message;
    ui.unmaskStats.classList.toggle('error', isError);
  }
}

function loadUnmaskTextFile(file) {
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const content = typeof reader.result === "string" ? reader.result : "";
    ui.unmaskInputText.value = content;
    if (currentUnmaskDictionary) {
      unmaskText(currentUnmaskDictionary);
    }
  };
  reader.onerror = () => {
    updateUnmaskStatusDisplay('テキストファイルの読み込みに失敗しました。', true);
  };
  reader.readAsText(file, 'utf-8');
}

// 辞書ファイルの読み込み
async function loadDictionaryFile(file) {
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const data = JSON.parse(reader.result);

      // 辞書の基本的な検証
      if (!data.mappings || typeof data.mappings !== 'object') {
        throw new Error('辞書フォーマットが不正です');
      }

      // 署名検証（署名がある場合のみ）
      if (data.signature) {
        const verification = await verifyDictionarySignature(data);
        if (!verification.valid) {
          const proceed = confirm(
            `⚠ 辞書の署名検証に失敗しました\n\n` +
            `理由: ${verification.error}\n\n` +
            `この辞書は改ざんされているか、別の環境で作成された可能性があります。\n` +
            `それでも使用しますか？`
          );
          if (!proceed) {
            updateUnmaskStatusDisplay('辞書の読み込みをキャンセルしました。', true);
            ui.unmaskDictFile.value = '';
            return;
          }
        }
      }

      // 辞書を保存して復号実行
      currentUnmaskDictionary = data;
      unmaskText(data);

      updateUnmaskStatusDisplay('辞書を読み込みました。');
    } catch (err) {
      updateUnmaskStatusDisplay('辞書の読み込みに失敗しました。', true);
      console.error('Dictionary load failed:', err);
      ui.unmaskDictFile.value = '';
    }
  };

  reader.onerror = () => {
    updateUnmaskStatusDisplay('辞書の読み込みに失敗しました。', true);
    ui.unmaskDictFile.value = '';
  };

  reader.readAsText(file, 'utf-8');
}

// 復号タブのクリアボタン
function clearUnmaskInput() {
  ui.unmaskInputText.value = '';
  ui.unmaskOutputText.value = '';
  updateUnmaskStatusDisplay('');
}

// 復号タブのコピーボタン
async function copyUnmaskOutput() {
  const value = ui.unmaskOutputText.value;
  if (!value) {
    return;
  }
  try {
    await navigator.clipboard.writeText(value);
    ui.unmaskCopyBtn.textContent = 'コピー済み';
    setTimeout(() => {
      ui.unmaskCopyBtn.textContent = 'コピー';
    }, COPY_FEEDBACK_DURATION_MS);
  } catch (err) {
    ui.unmaskCopyBtn.textContent = '失敗';
    setTimeout(() => {
      ui.unmaskCopyBtn.textContent = 'コピー';
    }, COPY_FEEDBACK_DURATION_MS);
  }
}

// イベントリスナーの初期化
function initUnmaskFeatures() {
  if (ui.downloadDictBtn) {
    ui.downloadDictBtn.addEventListener('click', downloadDictionary);
  }

  if (ui.unmaskTextFile) {
    ui.unmaskTextFile.addEventListener('change', () => {
      loadUnmaskTextFile(ui.unmaskTextFile.files?.[0]);
    });
  }

  if (ui.unmaskDictFile) {
    ui.unmaskDictFile.addEventListener('change', () => {
      loadDictionaryFile(ui.unmaskDictFile.files?.[0]);
    });
  }

  if (ui.unmaskInputText && currentUnmaskDictionary) {
    ui.unmaskInputText.addEventListener('input', () => {
      if (currentUnmaskDictionary) {
        unmaskText(currentUnmaskDictionary);
      }
    });
  }

  if (ui.unmaskClearBtn) {
    ui.unmaskClearBtn.addEventListener('click', clearUnmaskInput);
  }

  if (ui.unmaskCopyBtn) {
    ui.unmaskCopyBtn.addEventListener('click', copyUnmaskOutput);
  }

  const setupDropZone = (zone, input, handler) => {
    if (!zone || !input) {
      return;
    }
    const onDragOver = (event) => {
      event.preventDefault();
      zone.classList.add('is-dragover');
    };
    const onDragLeave = () => {
      zone.classList.remove('is-dragover');
    };
    const onDrop = (event) => {
      event.preventDefault();
      zone.classList.remove('is-dragover');
      const file = event.dataTransfer?.files?.[0];
      if (file) {
        handler(file);
      }
    };
    zone.addEventListener('dragover', onDragOver);
    zone.addEventListener('dragleave', onDragLeave);
    zone.addEventListener('drop', onDrop);
    zone.addEventListener('click', () => input.click());
    zone.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        input.click();
      }
    });
  };

  setupDropZone(ui.unmaskTextDrop, ui.unmaskTextFile, loadUnmaskTextFile);
  setupDropZone(ui.unmaskDictDrop, ui.unmaskDictFile, loadDictionaryFile);
}

// DOMContentLoadedまたはapp.js初期化後に自動実行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initUnmaskFeatures();
  });
} else {
  // DOMは既に読み込まれている
  initUnmaskFeatures();
}
