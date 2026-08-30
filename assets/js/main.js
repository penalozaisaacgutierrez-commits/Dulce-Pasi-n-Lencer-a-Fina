/**
 * Dulce Pasión Lencería Fina — interacciones del sitio
 * Requiere config.js (y google-ads.js en páginas con visor).
 */
(function () {
  "use strict";

  var cfg = typeof DPLF_CONFIG !== "undefined" ? DPLF_CONFIG : {};
  var ads = typeof DPLF_GOOGLE_ADS !== "undefined" ? DPLF_GOOGLE_ADS : null;

  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function $$(sel, ctx) {
    return Array.from((ctx || document).querySelectorAll(sel));
  }
  function setText(sel, text) {
    $$(sel).forEach(function (el) {
      if (text != null) el.textContent = text;
    });
  }

  var FALLBACK =
    cfg.imagenFallback ||
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80";

  function imgUrl(url, width) {
    if (!url) return FALLBACK;
    var w = width || 1200;
    if (url.indexOf("unsplash.com") > -1) {
      if (/[?&]w=\d+/.test(url)) url = url.replace(/([?&])w=\d+/, "$1w=" + w);
      else url += (url.indexOf("?") > -1 ? "&" : "?") + "w=" + w;
    }
    return url;
  }

  function waUrl() {
    var num = String(cfg.whatsapp || "").replace(/\D/g, "");
    var text = encodeURIComponent(cfg.whatsappMensaje || "");
    if (!num || num === "NUMEROCONINDICATIVO") {
      return "https://wa.me/?text=" + text;
    }
    return "https://wa.me/" + num + "?text=" + text;
  }

  function injectConfig() {
    setText("[data-cfg='nombre']", cfg.nombre);
    setText("[data-cfg='nombreCorto']", cfg.nombreCorto);
    setText("[data-cfg='rubro']", cfg.rubro);
    setText("[data-cfg='slogan']", cfg.slogan);
    setText("[data-cfg='direccion']", cfg.direccion);
    setText("[data-cfg='heroUbicacion']", cfg.heroUbicacion);
    setText("[data-cfg='email']", cfg.email);
    setText("[data-cfg='telefono']", cfg.telefono);
    setText("[data-cfg='horario']", cfg.horario);
    setText("[data-cfg='idCampana']", cfg.idCampana);
    setText("[data-cfg='titularNombre']", cfg.titularNombre);
    setText("[data-cfg='titularCargo']", cfg.titularCargo);
    setText("[data-cfg='verificanteNombre']", cfg.verificanteNombre);
    setText("[data-cfg='verificanteCargo']", cfg.verificanteCargo);
    setText("[data-cfg='verificantePlataformas']", cfg.verificantePlataformas);
    setText("[data-cfg='responsablePago']", cfg.responsablePago);
    setText("[data-cfg='responsableSitio']", cfg.responsableSitio);
    setText("[data-cfg='sitioDominio']", cfg.sitioDominio);
    setText("[data-cfg='sitioUrl']", cfg.sitioUrl);
    setText("[data-cfg='mision']", cfg.mision);
    setText("[data-cfg='vision']", cfg.vision);
    if (cfg.quienesSomos) {
      setText("[data-cfg='quienesTitulo']", cfg.quienesSomos.titulo);
      setText("[data-cfg='quienesDescripcion']", cfg.quienesSomos.descripcion);
      setText("[data-cfg='quienesSomos']", cfg.quienesSomos.quienes);
      setText("[data-cfg='quienesDedicacion']", cfg.quienesSomos.dedicacion);
      setText("[data-cfg='quienesServicios']", cfg.quienesSomos.servicios);
      setText("[data-cfg='quienesClientes']", cfg.quienesSomos.clientes);
      setText("[data-cfg='quienesTrayectoria']", cfg.quienesSomos.trayectoria);
      setText("[data-cfg='quienesMisionBreve']", cfg.quienesSomos.misionBreve);
    }

    $$("[data-cfg-href='sitioUrl']").forEach(function (el) {
      if (cfg.sitioUrl) el.href = cfg.sitioUrl;
    });
    $$("[data-cfg-href='email']").forEach(function (el) {
      el.href = "mailto:" + cfg.email;
    });
    $$("[data-cfg-href='telefono']").forEach(function (el) {
      var tel = String(cfg.telefono || "").replace(/\s/g, "");
      el.href = tel.indexOf("NÚMERO") === 0 || tel.indexOf("NUMERO") === 0 ? "#" : "tel:" + tel;
    });
    $$("[data-cfg-href='whatsapp']").forEach(function (el) {
      el.href = waUrl();
    });
    $$("[data-cfg-src='logo']").forEach(function (el) {
      if (cfg.logo) {
        el.src = cfg.logo;
        el.alt = cfg.logoAlt || cfg.nombre;
      }
    });
    $$("[data-cfg-src='logoHorizontal']").forEach(function (el) {
      if (cfg.logoHorizontal) {
        el.src = cfg.logoHorizontal;
        el.alt = cfg.logoAlt || cfg.nombre;
      }
    });

    var hidden = $("#campana-id-hidden");
    if (hidden) hidden.value = cfg.idCampana || "";

    var year = $("#year-now");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function headerScroll() {
    var header = $(".site-header");
    if (!header) return;
    var onLegal = document.body.classList.contains("legal-header");
    function tick() {
      var scrolled = onLegal || window.scrollY > 40;
      header.classList.toggle("scrolled", scrolled);
      /* El logotipo PNG se mantiene; solo cambia el tamaño por CSS al hacer scroll. */
    }
    tick();
    window.addEventListener("scroll", tick, { passive: true });
  }

  function navToggle() {
    var btn = $(".nav-toggle");
    var nav = $("#nav-principal");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("#nav-principal a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  function heroCarousel() {
    var root = $("#hero-carousel");
    var dots = $("#hero-indicators");
    if (!root || !cfg.heroImagenes) return;
    cfg.heroImagenes.forEach(function (img, i) {
      var slide = document.createElement("div");
      slide.className = "hero-slide" + (i === 0 ? " is-active" : "");
      slide.style.backgroundImage = "url('" + imgUrl(img.url, 1920) + "')";
      slide.setAttribute("role", "img");
      slide.setAttribute("aria-label", img.alt || "");
      root.appendChild(slide);
      if (dots) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", "Fotografía " + (i + 1));
        if (i === 0) b.className = "is-active";
        b.addEventListener("click", function () {
          go(i);
        });
        dots.appendChild(b);
      }
    });
    var idx = 0;
    var slides = $$(".hero-slide", root);
    var buttons = dots ? $$("button", dots) : [];
    function go(n) {
      idx = n % slides.length;
      slides.forEach(function (s, i) {
        s.classList.toggle("is-active", i === idx);
      });
      buttons.forEach(function (b, i) {
        b.classList.toggle("is-active", i === idx);
      });
    }
    setInterval(function () {
      go(idx + 1);
    }, 6500);
  }

  function fillRepeating() {
    var hist = $("#historia-list");
    if (hist && cfg.historia) {
      hist.innerHTML = cfg.historia
        .map(function (h) {
          return (
            '<article class="tl-item reveal">' +
            '<div class="tl-year">' +
            h.anio +
            "</div><div class='tl-dot' aria-hidden='true'></div>" +
            '<div class="tl-card"><img src="' +
            imgUrl(h.imagen, 400) +
            '" alt="" loading="lazy">' +
            "<div><h3>" +
            h.titulo +
            "</h3><p>" +
            h.texto +
            "</p></div></div></article>"
          );
        })
        .join("");
    }

    var val = $("#valores-list");
    if (val && cfg.valores) {
      val.innerHTML = cfg.valores
        .map(function (v) {
          return (
            '<article class="value reveal"><span aria-hidden="true">' +
            v.icono +
            "</span><h3>" +
            v.titulo +
            "</h3><p>" +
            v.texto +
            "</p></article>"
          );
        })
        .join("");
    }

    var srv = $("#servicios-list");
    if (srv && cfg.servicios) {
      srv.innerHTML = cfg.servicios
        .map(function (s) {
          return (
            '<article class="card reveal"><img class="zoom-img" src="' +
            imgUrl(s.imagen, 800) +
            '" alt="" loading="lazy"><div class="card-body"><h3>' +
            s.titulo +
            "</h3><p>" +
            s.texto +
            "</p></div></article>"
          );
        })
        .join("");
    }

    var ofr = $("#ofrecemos-list");
    if (ofr && cfg.ofrecemos) {
      ofr.innerHTML = cfg.ofrecemos
        .map(function (o) {
          return "<article class='offer-item reveal'><h3>" + o.titulo + "</h3><p>" + o.texto + "</p></article>";
        })
        .join("");
    }

    var pr = $("#proceso-list");
    if (pr && cfg.proceso) {
      pr.innerHTML = cfg.proceso
        .map(function (p) {
          return (
            '<article class="step reveal"><div class="num">' +
            p.paso +
            "</div><h3>" +
            p.titulo +
            "</h3><p>" +
            p.texto +
            "</p></article>"
          );
        })
        .join("");
    }

    var st = $("#stats-list");
    if (st && cfg.estadisticas) {
      st.innerHTML = cfg.estadisticas
        .map(function (s) {
          return (
            '<div class="stat"><div class="stat-num" data-count="' +
            s.numero +
            '" data-suffix="' +
            (s.sufijo || "") +
            '">0' +
            (s.sufijo || "") +
            '</div><div class="stat-label">' +
            s.etiqueta +
            "</div></div>"
          );
        })
        .join("");
    }

    var gal = $("#galeria-list");
    if (gal && cfg.galeria) {
      gal.innerHTML = cfg.galeria
        .map(function (g, i) {
          return (
            '<button type="button" data-lb="' +
            i +
            '"><img src="' +
            imgUrl(g.url, 700) +
            '" alt="' +
            (g.alt || "") +
            '" loading="lazy"><figcaption>' +
            (g.caption || "") +
            "</figcaption></button>"
          );
        })
        .join("");
    }

    var eq = $("#equipo-list");
    if (eq && cfg.equipo) {
      eq.innerHTML = cfg.equipo
        .map(function (p) {
          return (
            '<article class="team-card reveal"><img src="' +
            imgUrl(p.imagen, 500) +
            '" alt="' +
            p.nombre +
            '" loading="lazy"><h3>' +
            p.nombre +
            "</h3><p>" +
            p.cargo +
            "</p></article>"
          );
        })
        .join("");
    }

    var tes = $("#testimonios-list");
    if (tes && cfg.testimonios) {
      tes.innerHTML = cfg.testimonios
        .map(function (t) {
          return (
            '<blockquote class="quote reveal"><p>“' +
            t.texto +
            '”</p><cite>' +
            t.autor +
            " · " +
            t.cargo +
            "</cite></blockquote>"
          );
        })
        .join("");
    }

    var faq = $("#faq-list");
    if (faq && cfg.faq) {
      faq.innerHTML = cfg.faq
        .map(function (f, i) {
          return (
            '<div class="faq-item"><button type="button" aria-expanded="false">' +
            f.pregunta +
            " <span>+</span></button><div class='faq-a'>" +
            f.respuesta +
            "</div></div>"
          );
        })
        .join("");
    }

    $$("img").forEach(function (img) {
      if (img.classList.contains("brand-logo-img") || img.hasAttribute("data-cfg-src")) return;
      img.addEventListener("error", function () {
        if (img.src !== FALLBACK) img.src = FALLBACK;
      });
    });
  }

  function counters() {
    var nodes = $$("[data-count]");
    if (!nodes.length) return;
    var done = false;
    function run() {
      if (done) return;
      var box = $("#cifras");
      if (!box) return;
      var r = box.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.85) return;
      done = true;
      nodes.forEach(function (el) {
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var suffix = el.getAttribute("data-suffix") || "";
        var start = performance.now();
        function step(now) {
          var t = Math.min(1, (now - start) / 1400);
          el.textContent = String(Math.round(target * t)) + suffix;
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }
    window.addEventListener("scroll", run, { passive: true });
    run();
  }

  function faq() {
    $$(".faq-item button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentElement;
        var open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.querySelector("span").textContent = open ? "–" : "+";
      });
    });
  }

  function lightbox() {
    var box = $("#lightbox");
    var img = $("#lightbox-img");
    if (!box || !img || !cfg.galeria) return;
    $$("#galeria-list button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = parseInt(btn.getAttribute("data-lb"), 10);
        var g = cfg.galeria[i];
        img.src = imgUrl(g.url, 1400);
        img.alt = g.alt || "";
        box.classList.add("is-open");
      });
    });
    $("#lightbox-close").addEventListener("click", function () {
      box.classList.remove("is-open");
    });
    box.addEventListener("click", function (e) {
      if (e.target === box) box.classList.remove("is-open");
    });
  }

  function form() {
    var form = $("#contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var terms = $("#form-terms");
      var err = $("#form-error");
      var ok = $("#form-success");
      if (!terms || !terms.checked) {
        if (err) {
          err.style.display = "block";
          err.textContent = "Debe aceptar los Términos y Condiciones para enviar el formulario.";
        }
        return;
      }
      if (err) err.style.display = "none";
      if (ok) ok.style.display = "block";
      if (window.DPLF_TRACK) window.DPLF_TRACK.lead();
      form.reset();
      var hidden = $("#campana-id-hidden");
      if (hidden) hidden.value = cfg.idCampana || "";
    });
  }

  function cookies() {
    var banner = $("#cookie-banner");
    var modal = $("#cookie-modal");
    if (!banner) return;
    var KEY = "dplf_cookie_consent";
    function read() {
      try {
        return JSON.parse(localStorage.getItem(KEY) || "null");
      } catch (e) {
        return null;
      }
    }
    function save(obj) {
      localStorage.setItem(KEY, JSON.stringify(obj));
      banner.classList.remove("is-visible");
      if (modal) modal.classList.remove("is-open");
      window.location.reload();
    }
    if (!read()) banner.classList.add("is-visible");

    var acc = $("#cookie-accept");
    var rej = $("#cookie-reject");
    var cfgBtn = $("#cookie-configure");
    var saveBtn = $("#cookie-save");
    var close = $("#cookie-modal-close");
    if (acc)
      acc.addEventListener("click", function () {
        save({ necessary: true, analytics: true, marketing: true, at: Date.now() });
      });
    if (rej)
      rej.addEventListener("click", function () {
        save({ necessary: true, analytics: false, marketing: false, at: Date.now() });
      });
    if (cfgBtn && modal)
      cfgBtn.addEventListener("click", function () {
        modal.classList.add("is-open");
      });
    if (close && modal)
      close.addEventListener("click", function () {
        modal.classList.remove("is-open");
      });
    if (saveBtn)
      saveBtn.addEventListener("click", function () {
        save({
          necessary: true,
          analytics: $("#cookie-analytics") ? $("#cookie-analytics").checked : false,
          marketing: $("#cookie-marketing") ? $("#cookie-marketing").checked : false,
          at: Date.now(),
        });
      });
  }

  var comboSeed = 2;
  function renderAdsWindow(seed) {
    if (!ads || !$("#gad-preview")) return;
    comboSeed = seed == null ? comboSeed : seed;
    var c = ads.combinacion(comboSeed);
    var title = [c.h1, c.h2, c.h3].join(" | ");
    $("#gad-title").textContent = title;
    $("#gad-desc").textContent = c.desc;
    $("#gad-url").textContent = ads.urlVisualizacion;
    $("#serp-query").textContent = c.keyword;
    var urlBar = $("#browser-query");
    if (urlBar) urlBar.textContent = "https://www.google.com/search?q=" + encodeURIComponent(c.keyword);
    var chips = $$(".kw-chip");
    var keys = ads.palabrasClaveCampana || [];
    chips.forEach(function (ch, i) {
      ch.classList.toggle("is-active", keys[i] && keys[i].texto === c.keyword);
    });
  }

  function badgeApta(n, max) {
    var ok = n <= max;
    return (
      '<span class="' +
      (ok ? "char-ok" : "char-bad") +
      '" aria-label="' +
      (ok ? "Apta" : "Supera el límite") +
      '">' +
      (ok ? "APTA · " : "REVISAR · ") +
      n +
      "/" +
      max +
      "</span>"
    );
  }

  function adsStudio() {
    var side = $("#ads-keywords");
    if (!ads || !side) return;
    var keys = ads.palabrasClaveCampana || [];
    side.innerHTML = keys
      .map(function (k, i) {
        var n = k.texto.length;
        return (
          '<button type="button" class="kw-chip' +
          (i === 2 ? " is-active" : "") +
          '" data-i="' +
          i +
          '"><small>Concordancia exacta</small>[' +
          k.texto +
          "]" +
          badgeApta(n, 30) +
          "</button>"
        );
      })
      .join("");
    $$(".kw-chip", side).forEach(function (btn) {
      btn.addEventListener("click", function () {
        renderAdsWindow(parseInt(btn.getAttribute("data-i"), 10));
      });
    });
    var next = $("#ads-next-combo");
    if (next)
      next.addEventListener("click", function () {
        renderAdsWindow(comboSeed + 1);
      });
    var sitelinks = $("#gad-sitelinks");
    if (sitelinks && ads.extensiones) {
      sitelinks.innerHTML = ads.extensiones.sitelinks
        .map(function (s) {
          return "<div><a href='" + s.url + "'>" + s.titulo + "</a><small>" + s.desc + "</small></div>";
        })
        .join("");
    }
    var heads = $("#ads-headlines");
    if (heads) {
      heads.innerHTML = ads.titulares
        .map(function (t, i) {
          return (
            "<li><strong>" +
            (i + 1) +
            ".</strong> " +
            t.texto +
            " " +
            badgeApta(t.texto.length, 30) +
            "</li>"
          );
        })
        .join("");
    }
    var kwBoard = $("#ads-keywords-board");
    if (kwBoard) {
      kwBoard.innerHTML = keys
        .map(function (k, i) {
          return (
            "<li><strong>" +
            (i + 1) +
            ".</strong> <code>[" +
            k.texto +
            "]</code> " +
            badgeApta(k.texto.length, 30) +
            "</li>"
          );
        })
        .join("");
    }
    var descBoard = $("#ads-descriptions");
    if (descBoard) {
      descBoard.innerHTML = ads.descripciones
        .map(function (d, i) {
          return (
            "<li><strong>D" +
            (i + 1) +
            ".</strong> " +
            d.texto +
            " " +
            badgeApta(d.texto.length, 90) +
            "</li>"
          );
        })
        .join("");
    }
    renderAdsWindow(2);
  }

  function waTrack() {
    $$("[data-cfg-href='whatsapp']").forEach(function (el) {
      el.addEventListener("click", function () {
        if (window.DPLF_TRACK) window.DPLF_TRACK.whatsapp();
      });
    });
  }

  injectConfig();
  headerScroll();
  navToggle();
  heroCarousel();
  fillRepeating();
  counters();
  faq();
  lightbox();
  form();
  cookies();
  adsStudio();
  waTrack();
})();
