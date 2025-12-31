(() => {
  const config = window.BRAND_CONFIG;
  if (!config) {
    return;
  }

  const setText = (id, value) => {
    if (!value) {
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value;
    }
  };

  const setLink = (id, url, label) => {
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
  };

  document.title = config.pageTitle || config.productName || document.title;
  setText("brandTitle", config.logoText || config.productName);
  setText("brandEyebrow", config.eyebrow);

  const lede = document.getElementById("brandLede");
  if (lede && Array.isArray(config.ledeLines)) {
    lede.textContent = config.ledeLines.join("\n");
  }

  setLink("demoLink", config.demoUrl, config.demoLabel || "デモサイト");
  setLink("repoLink", config.repoUrl, config.repoLabel || "GitHub");

  setText("footerText", config.footerText);
  setLink("footerLink", config.footerLinkUrl, config.footerLinkLabel);
})();
