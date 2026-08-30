/**
 * Conexión de este sitio con tres propiedades de Google (códigos únicos DPLF):
 *   1. Google Ads          AW-2356976411
 *   2. Google Search Console  meta verification 8f2d7a1c9e4b6d0f3a5c7e1b9d2f4a6c
 *   3. Google AdSense      ca-pub-8235697411829046
 *
 * Las etiquetas de marketing / AdSense solo se inyectan si la visitante
 * aceptó cookies de marketing. Analytics respeta la opción de analítica.
 */
(function () {
  "use strict";

  var cfg = typeof DPLF_CONFIG !== "undefined" ? DPLF_CONFIG.google : null;
  if (!cfg) return;

  function consent() {
    try {
      var raw = localStorage.getItem("dplf_cookie_consent");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function injectMeta(name, content) {
    if (!content || document.querySelector('meta[name="' + name + '"]')) return;
    var m = document.createElement("meta");
    m.setAttribute("name", name);
    m.setAttribute("content", content);
    document.head.appendChild(m);
  }

  function injectScript(src, attrs) {
    if (document.querySelector('script[src="' + src + '"]')) return;
    var s = document.createElement("script");
    s.src = src;
    s.async = true;
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        s.setAttribute(k, attrs[k]);
      });
    }
    document.head.appendChild(s);
  }

  /* 1) Search Console — siempre visible para el robot de verificación */
  injectMeta("google-site-verification", cfg.gscVerification);

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  var c = consent();
  var allowAnalytics = c && c.analytics;
  var allowMarketing = c && c.marketing;

  if (allowAnalytics || allowMarketing) {
    injectScript("https://www.googletagmanager.com/gtag/js?id=" + cfg.adsAwId);
    window.gtag("js", new Date());
    window.gtag("config", cfg.adsAwId, { allow_enhanced_conversions: true });
    if (cfg.ga4 && allowAnalytics) {
      window.gtag("config", cfg.ga4);
    }
  }

  /* 3) AdSense — solo con consentimiento de marketing */
  if (allowMarketing && cfg.adsenseClient) {
    injectScript(
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + cfg.adsenseClient,
      { crossorigin: "anonymous" }
    );
    window.addEventListener("load", function () {
      document.querySelectorAll("ins.adsbygoogle").forEach(function (slot) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {}
      });
    });
  }

  window.DPLF_TRACK = {
    lead: function () {
      if (typeof window.gtag !== "function" || !allowMarketing) return;
      window.gtag("event", "conversion", { send_to: cfg.adsConversionSendTo });
      window.gtag("event", cfg.eventLead, { campaign_id: cfg.adsCustomerId });
    },
    whatsapp: function () {
      if (typeof window.gtag !== "function" || !allowMarketing) return;
      window.gtag("event", cfg.eventWhatsapp, { campaign_id: cfg.adsCustomerId });
    },
  };
})();
