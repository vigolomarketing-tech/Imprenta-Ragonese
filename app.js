/* =============================================================
   IMPRENTA RAGONESE — app.js
   Arma toda la página a partir de CONFIG (data.js).
   No hace falta editar este archivo para cambiar contenidos.
   ============================================================= */
(() => {
  "use strict";

  const C = CONFIG;
  const N = C.negocio;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wa = (msg) => `https://wa.me/${N.whatsapp.numero}?text=${encodeURIComponent(msg)}`;
  const direccionCompleta = `${N.direccion.calle}, ${N.direccion.localidad}, ${N.direccion.provincia}`;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Íconos (trazo, 24x24) ---------- */
  const ICONS = {
    stickers: '<path d="M12 3a9 9 0 1 0 9 9"/><path d="M21 12a9 9 0 0 1-9-9v4.5a4.5 4.5 0 0 0 4.5 4.5z"/>',
    etiqueta: '<path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    volante: '<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h6"/>',
    tarjeta: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5 16c.6-1.5 1.7-2 3-2s2.4.5 3 2M14 10h5M14 14h4"/>',
    banner: '<path d="M5 3h14v14H5z"/><path d="M12 17v4M8 21h8M8 8h8M8 12h5"/>',
    cuaderno: '<path d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6z"/><path d="M10 3v18M4 7h4M4 12h4M4 17h4"/>',
    diploma: '<path d="M3 4h18v11H3z"/><path d="M7 8h10M7 11h5"/><circle cx="16" cy="16" r="3"/><path d="M14.5 18.5 14 23l2-1 2 1-.5-4.5"/>',
    regalo: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13"/><path d="M12 8S10.5 3 8 3.5 7 8 12 8zm0 0s1.5-5 4-4.5S17 8 12 8z"/>',
    talonario: '<path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
    libreta: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5M9 7h7M9 11h5"/>',
    calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
    diseno: '<path d="m12 19 7-7 3 3-7 7z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="m2 2 7.6 7.6"/><circle cx="11" cy="11" r="2"/>',
    local: '<path d="M3 9 4.5 4h15L21 9"/><path d="M3 9h18v1.5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M5 13v8h14v-8M10 21v-5h4v5"/>',
    persona: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    precio: '<circle cx="12" cy="12" r="9"/><path d="m9 15 6-6"/><circle cx="9.5" cy="9.5" r="1"/><circle cx="14.5" cy="14.5" r="1"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>',
    telefono: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    atras: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
    cerrar: '<path d="M6 6l12 12M18 6 6 18"/>',
    izq: '<path d="m15 18-6-6 6-6"/>',
    der: '<path d="m9 18 6-6-6-6"/>',
    navegar: '<path d="M3 11 22 2l-9 19-2-8z"/>',
    escuela: '<path d="M22 10 12 5 2 10l10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6"/>',
    chispa: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  };
  const WA_PATH = "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41Z";

  const icon = (name, cls = "") =>
    name === "whatsapp"
      ? `<svg class="icon icon--fill ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${WA_PATH}"/></svg>`
      : `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.chispa}</svg>`;

  /* ---------- Horarios: abierto / cerrado (hora Argentina) ---------- */
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const fmtMin = (m) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

  function nowAR() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: N.zonaHoraria, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    return { day, min: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
  }

  function openStatus() {
    const { day, min } = nowAR();
    const today = (C.horarios[day] || []).map(([a, b]) => [toMin(a), toMin(b)]);
    for (const [a, b] of today) {
      if (min >= a && min < b) {
        const soon = b - min <= 30;
        return { open: true, day, title: soon ? "Cierra pronto" : "Abierto ahora", detail: `Cierra a las ${fmtMin(b)}` };
      }
    }
    const later = today.find(([a]) => a > min);
    if (later) return { open: false, day, title: "Cerrado ahora", detail: `Abre hoy a las ${fmtMin(later[0])}` };
    for (let d = 1; d <= 7; d++) {
      const nd = (day + d) % 7;
      const f = C.horarios[nd] || [];
      if (f.length) {
        const cuando = d === 1 ? "mañana" : `el ${DIAS[nd]}`;
        return { open: false, day, title: "Cerrado ahora", detail: `Abre ${cuando} a las ${fmtMin(toMin(f[0][0]))}` };
      }
    }
    return { open: false, day, title: "Cerrado", detail: "" };
  }

  function updateStatus() {
    const s = openStatus();
    $$("[data-status]").forEach((el) => {
      el.className = `status ${s.open ? "is-open" : "is-closed"}`;
      el.innerHTML = `<i aria-hidden="true"></i><b>${s.title}</b><span>${s.detail}</span>`;
    });
    $$("[data-hours-row]").forEach((row) => {
      row.classList.toggle("is-today", row.dataset.hoursRow.split(",").map(Number).includes(s.day));
    });
  }

  /* ---------- Render: header, nav, botones de WhatsApp ---------- */
  function renderHeader() {
    $("[data-brand]").innerHTML = `<img src="${esc(N.logo)}" width="44" height="44" alt="">
      <span class="brand__txt"><strong>${esc(N.nombre)}</strong><small>${esc(N.rubro)}</small></span>`;
    $("[data-brand]").setAttribute("aria-label", `${N.nombre} — inicio`);
    $("[data-nav]").innerHTML = C.nav.map((l) => `<li><a href="${esc(l.href)}">${esc(l.texto)}</a></li>`).join("");
    $("[data-nav-extra]").innerHTML = `
      <span data-status class="status"></span>
      <a class="btn btn--wa btn--block" href="${wa(C.whatsapp.general)}" target="_blank" rel="noopener">${icon("whatsapp")}${esc(C.whatsapp.botonHeader)}</a>
      <a class="nav__ig" href="${esc(N.instagram.url)}" target="_blank" rel="noopener">${icon("instagram")}${esc(N.instagram.usuario)}</a>`;

    const cta = $(".header__cta");
    cta.href = wa(C.whatsapp.general);
    cta.innerHTML = `${icon("whatsapp")}<span>${esc(C.whatsapp.botonHeader)}</span>`;
    cta.setAttribute("aria-label", C.whatsapp.botonHeader);

    const fl = $("[data-wa-float]");
    fl.href = wa(C.whatsapp.general);
    fl.setAttribute("aria-label", C.whatsapp.botonFlotante);
    fl.innerHTML = `${icon("whatsapp")}<span class="wa-float__tip">${esc(C.whatsapp.botonFlotante)}</span>`;
  }

  /* ---------- Hero ---------- */
  function renderHero() {
    const H = C.hero;
    $("[data-hero-text]").innerHTML = `
      <span data-status class="status reveal"></span>
      <p class="eyebrow reveal">${esc(H.etiqueta)}</p>
      <h1 class="hero__title reveal">${esc(H.titulo)} <span class="hl">${esc(H.tituloDestacado)}</span> ${esc(H.tituloFinal)}</h1>
      <p class="hero__sub reveal">${esc(H.subtitulo)}</p>
      <div class="hero__ctas reveal">
        <a class="btn btn--primary btn--lg" href="${wa(C.whatsapp.presupuesto)}" target="_blank" rel="noopener">${icon("whatsapp")}${esc(H.ctaPrincipal)}</a>
        <a class="btn btn--ghost btn--lg" href="#productos">${esc(H.ctaSecundario)}${icon("flecha")}</a>
      </div>
      <ul class="hero__points reveal">${H.puntos.map((p) => `<li>${icon("check")}${esc(p)}</li>`).join("")}</ul>`;

    $("[data-hero-collage]").innerHTML = `
      <div class="collage__blob"></div>
      <div class="collage__dots"></div>
      <svg class="collage__reg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="11"/><path d="M20 2v36M2 20h36"/></svg>
      ${H.collage.map((c, i) => `<div class="collage__item ${esc(c.clase)}" style="--i:${i}"><img src="${esc(c.img)}" alt="${esc(c.alt)}" width="400" height="400" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></div>`).join("")}
      <div class="collage__badge"><b>2027</b><span>Calendarios<br>ya disponibles</span></div>
      <div class="collage__cmyk"><i></i><i></i><i></i><i></i></div>`;
  }

  function renderRibbon() {
    const items = C.cinta.map((t) => `<span>${esc(t)}</span><i>✦</i>`).join("");
    $("[data-ribbon]").innerHTML = items + items;
  }

  /* ---------- Calendarios 2027 ---------- */
  function calMsg(v, medida) {
    return `${C.whatsapp.saludo} Quiero pedir *Calendarios 2027*:\n\n📅 *Modelo:* ${v.nombre} (${v.detalle.toLowerCase()})\n📐 *Medida:* ${medida}\n🔢 *Cantidad:* \n\n¿Me pasan presupuesto? ¡Gracias!`;
  }

  function renderSeason() {
    const K = C.calendarios;
    $("[data-season]").innerHTML = `
      <div class="season__head">
        <div class="season__intro reveal">
          <span class="tag tag--live"><i></i>${esc(K.etiqueta)}</span>
          <h2 class="season__title">${esc(K.titulo).replace(/(\d{4})/, "<span>$1</span>")}</h2>
          <p class="season__sub">${esc(K.subtitulo)}</p>
          <ul class="chips">${K.usos.map((u) => `<li>${esc(u)}</li>`).join("")}</ul>
        </div>
        <div class="countdown reveal" data-countdown>
          <div class="countdown__boxes">
            ${["días", "horas", "min", "seg"].map((l, i) => `<div class="cd"><b data-cd="${i}">--</b><span>${l}</span></div>`).join("")}
          </div>
          <p class="countdown__label">${esc(K.textoCuenta)}</p>
        </div>
      </div>
      <div class="vcards">
        ${K.variantes.map((v, i) => `
          <article class="vcard reveal" style="--d:${i}">
            <div class="vcard__media">
              <img src="${esc(v.img)}" alt="${esc(v.nombre)} ${esc(v.detalle)}" width="800" height="600" loading="lazy">
              ${v.destacado ? `<span class="vcard__flag">${esc(v.destacado)}</span>` : ""}
            </div>
            <div class="vcard__body">
              <p class="vcard__kicker">${esc(v.detalle)}</p>
              <h3>${esc(v.nombre)}</h3>
              <p class="vcard__desc">${esc(v.descripcion)}</p>
              <fieldset class="sizes">
                <legend>Elegí la medida</legend>
                ${v.medidas.map((m, j) => `
                  <label class="size"><input type="radio" name="size-${esc(v.id)}" value="${esc(m)}" ${j === 0 ? "checked" : ""}><span>${esc(m)}</span></label>`).join("")}
              </fieldset>
              <a class="btn btn--red btn--block" data-cal="${i}" href="${wa(calMsg(v, v.medidas[0]))}" target="_blank" rel="noopener">${icon("whatsapp")}${esc(K.boton)}</a>
            </div>
          </article>`).join("")}
      </div>
      <div class="vcards__hint" aria-hidden="true"><span>Deslizá para ver los ${K.variantes.length} modelos</span><span class="vcards__dots">${K.variantes.map((_, i) => `<i class="${i ? "" : "is-on"}"></i>`).join("")}</span></div>`;

    const track = $(".vcards");
    track.addEventListener("scroll", () => {
      const cards = $$(".vcard", track);
      const w = cards[0].offsetWidth + 14;
      const idx = Math.min(cards.length - 1, Math.round(track.scrollLeft / w));
      $$(".vcards__dots i").forEach((d, i) => d.classList.toggle("is-on", i === idx));
    }, { passive: true });

    $$(".vcard").forEach((card, i) => {
      const v = K.variantes[i];
      card.addEventListener("change", (e) => {
        if (e.target.name === `size-${v.id}`) $("[data-cal]", card).href = wa(calMsg(v, e.target.value));
      });
    });

    const target = new Date(K.fechaObjetivo).getTime();
    const boxes = $$("[data-cd]");
    const tick = () => {
      const diff = target - Date.now();
      if (!(diff > 0)) { $("[data-countdown]").hidden = true; return false; }
      const vals = [Math.floor(diff / 864e5), Math.floor(diff / 36e5) % 24, Math.floor(diff / 6e4) % 60, Math.floor(diff / 1e3) % 60];
      boxes.forEach((b, i) => { b.textContent = String(vals[i]).padStart(2, "0"); });
      return true;
    };
    if (tick()) setInterval(tick, 1000);
  }

  /* ---------- Productos ---------- */
  const prodMsg = (p) => `${C.whatsapp.saludo} Quiero consultar por *${p.nombre}*. ¿Me pasan info y presupuesto?`;

  function renderProducts() {
    const P = C.productos;
    $("[data-products]").innerHTML = `
      <header class="section__head reveal">
        <p class="eyebrow">Productos</p>
        <h2>${esc(P.titulo)}</h2>
        <p>${esc(P.subtitulo)}</p>
      </header>
      <div class="products">
        ${P.lista.map((p, i) => `
          <article class="pcard reveal" style="--d:${i % 3}">
            <div class="pcard__media"><img src="${esc(p.img)}" alt="${esc(p.nombre)}" width="800" height="600" loading="lazy"></div>
            <div class="pcard__body">
              <span class="pcard__icon">${icon(p.icono)}</span>
              <h3>${esc(p.nombre)}</h3>
              <p>${esc(p.descripcion)}</p>
              <div class="pcard__actions">
                <a class="btn btn--primary btn--sm" href="${wa(prodMsg(p))}" target="_blank" rel="noopener">${icon("whatsapp")}${esc(P.boton)}</a>
                <button type="button" class="link" data-quote-product="${esc(p.id)}">Cotizar${icon("flecha")}</button>
              </div>
            </div>
          </article>`).join("")}
      </div>`;
  }

  /* ---------- Cotizador ---------- */
  function renderQuote() {
    const Q = C.cotizador;
    const K = C.calendarios;
    const productos = [
      {
        id: "calendarios",
        nombre: K.titulo,
        icono: "calendario",
        grupos: K.variantes.map((v) => ({ titulo: `${v.nombre} · ${v.detalle}`, opciones: v.medidas.map((m) => ({ label: m, valor: `${v.nombre} (${v.detalle.toLowerCase()}) — ${m}` })) })),
      },
      ...C.productos.lista.map((p) => ({ ...p, grupos: [{ titulo: "", opciones: p.variantes.map((v) => ({ label: v, valor: v })) }] })),
    ];
    const pasos = ["Producto", "Medida", "Cantidad", "Diseño", "Tus datos"];
    const st = { step: 1, product: null, variant: "", qty: "", design: "", name: "", note: "" };

    $("[data-quote]").innerHTML = `
      <div class="quote">
        <div class="quote__aside reveal">
          <p class="eyebrow">Cotizador</p>
          <h2>${esc(Q.titulo)}</h2>
          <p>${esc(Q.subtitulo)}</p>
          <div class="quote__summary">
            <p class="quote__summary-title">${icon("volante")}Tu pedido</p>
            <dl data-summary></dl>
          </div>
          <p class="quote__note">${icon("precio")}${esc(Q.aclaracion)}</p>
        </div>
        <div class="quote__card reveal" aria-live="polite">
          <div class="quote__progress">
            <div class="quote__bar"><span data-bar></span></div>
            <ol class="quote__steps">${pasos.map((p, i) => `<li><button type="button" data-goto="${i + 1}"><b>${i + 1}</b><span>${p}</span></button></li>`).join("")}</ol>
          </div>
          <div class="quote__panel" data-panel="1">
            <h3>¿Qué querés imprimir?</h3>
            <div class="opts opts--products">
              ${productos.map((p) => `<button type="button" class="opt opt--product" data-product="${esc(p.id)}">${icon(p.icono)}<span>${esc(p.nombre)}</span></button>`).join("")}
            </div>
          </div>
          <div class="quote__panel" data-panel="2" hidden><h3>Elegí medida o variante</h3><div data-variants></div></div>
          <div class="quote__panel" data-panel="3" hidden>
            <h3>¿Cuántas unidades?</h3>
            <div class="opts opts--qty" data-qtys></div>
            <label class="field field--other" data-other hidden>
              <span>Otra cantidad</span>
              <input type="number" inputmode="numeric" min="1" placeholder="Ej: 250" data-qty-input>
            </label>
          </div>
          <div class="quote__panel" data-panel="4" hidden>
            <h3>¿Tenés el diseño?</h3>
            <div class="opts opts--design">
              ${Q.opcionesDiseno.map((o, i) => `<button type="button" class="opt opt--design" data-design="${esc(o.valor)}">${icon(i ? "diseno" : "volante")}<span><b>${esc(o.valor)}</b><small>${esc(o.detalle)}</small></span></button>`).join("")}
            </div>
          </div>
          <div class="quote__panel" data-panel="5" hidden>
            <h3>¡Último paso!</h3>
            <label class="field"><span>Tu nombre *</span><input type="text" autocomplete="name" placeholder="¿Cómo te llamás?" data-name maxlength="60"></label>
            <p class="field__error" data-name-error hidden>Escribí tu nombre para enviar el pedido.</p>
            <label class="field"><span>Comentarios (opcional)</span><textarea rows="2" placeholder="Colores, fecha de entrega, detalles…" data-note maxlength="400"></textarea></label>
            <a class="btn btn--wa btn--lg btn--block" data-send href="#" target="_blank" rel="noopener">${icon("whatsapp")}${esc(Q.botonFinal)}</a>
            <p class="quote__hint">${esc(Q.aclaracion)}</p>
          </div>
          <div class="quote__nav">
            <button type="button" class="btn btn--ghost btn--sm" data-back>${icon("atras")}Atrás</button>
            <button type="button" class="btn btn--primary btn--sm" data-next>Siguiente${icon("flecha")}</button>
          </div>
        </div>
      </div>`;

    const root = $("#cotizador");
    const qtyInput = $("[data-qty-input]", root);
    const nameInput = $("[data-name]", root);
    const noteInput = $("[data-note]", root);

    const valid = (n) => ({ 1: !!st.product, 2: !!st.variant, 3: !!st.qty, 4: !!st.design, 5: st.name.trim().length > 1 }[n]);
    const maxReachable = () => { let n = 1; while (n < 5 && valid(n)) n++; return n; };
    const qtyText = () => (/^\d+$/.test(st.qty) ? `${Number(st.qty).toLocaleString("es-AR")} unidades` : st.qty);

    function message() {
      const l = [`${C.whatsapp.saludo} Quiero pedir un presupuesto:`, ""];
      l.push(`🖨️ *Producto:* ${st.product.nombre}`);
      l.push(`📐 *Medida / variante:* ${st.variant}`);
      l.push(`🔢 *Cantidad:* ${qtyText()}`);
      l.push(`🎨 *Diseño:* ${st.design}`);
      if (st.note.trim()) l.push(`📝 *Comentarios:* ${st.note.trim()}`);
      l.push(`👤 *Nombre:* ${st.name.trim()}`, "", "¡Muchas gracias!");
      return l.join("\n");
    }

    function renderSummary() {
      const rows = [["Producto", st.product?.nombre], ["Medida", st.variant], ["Cantidad", st.qty && qtyText()], ["Diseño", st.design], ["Nombre", st.name.trim()]];
      $("[data-summary]", root).innerHTML = rows.map(([k, v]) => `<div class="${v ? "is-set" : ""}"><dt>${k}</dt><dd>${v ? esc(v) : "—"}</dd></div>`).join("");
    }

    function renderVariants() {
      const p = st.product;
      $("[data-variants]", root).innerHTML = p.grupos.map((g) => `
        ${g.titulo ? `<p class="opts__group">${esc(g.titulo)}</p>` : ""}
        <div class="opts opts--chips">${g.opciones.map((o) => `<button type="button" class="opt opt--chip" data-variant="${esc(o.valor)}">${esc(o.label)}</button>`).join("")}</div>`).join("") +
        `<div class="opts opts--chips"><button type="button" class="opt opt--chip opt--soft" data-variant="A definir, quiero que me asesoren">No sé, asesórenme</button></div>`;
      const qs = p.cantidades || Q.cantidades;
      $("[data-qtys]", root).innerHTML = qs.map((q) => `<button type="button" class="opt opt--qty" data-qty="${q}"><b>${q.toLocaleString("es-AR")}</b><small>unidades</small></button>`).join("") +
        `<button type="button" class="opt opt--qty opt--soft" data-qty="otra"><b>Otra</b><small>cantidad</small></button>`;
      syncPressed();
    }

    function syncPressed() {
      $$("[data-product]", root).forEach((b) => b.setAttribute("aria-pressed", String(st.product?.id === b.dataset.product)));
      $$("[data-variant]", root).forEach((b) => b.setAttribute("aria-pressed", String(st.variant === b.dataset.variant)));
      const isCustom = st.qty && !$$("[data-qty]", root).some((b) => b.dataset.qty === st.qty);
      $$("[data-qty]", root).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.qty === "otra" ? (isCustom || !$("[data-other]", root).hidden) : st.qty === b.dataset.qty)));
      $$("[data-design]", root).forEach((b) => b.setAttribute("aria-pressed", String(st.design === b.dataset.design)));
    }

    function go(n, focus = true) {
      n = Math.max(1, Math.min(n, maxReachable()));
      st.step = n;
      $$("[data-panel]", root).forEach((p) => { p.hidden = Number(p.dataset.panel) !== n; });
      $("[data-bar]", root).style.width = `${((n - 1) / 4) * 100}%`;
      $$("[data-goto]", root).forEach((b) => {
        const k = Number(b.dataset.goto);
        b.parentElement.className = k < n ? "is-done" : k === n ? "is-current" : "";
        b.disabled = k > maxReachable();
        if (k === n) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
      });
      $("[data-back]", root).style.visibility = n === 1 ? "hidden" : "visible";
      $("[data-next]", root).hidden = n === 5;
      $("[data-next]", root).disabled = !valid(n);
      if (n === 5) updateSend();
      renderSummary();
      if (focus) {
        const h = $(`[data-panel="${n}"] h3`, root);
        h.setAttribute("tabindex", "-1");
        h.focus({ preventScroll: true });
        const card = $(".quote__card", root).getBoundingClientRect();
        if (card.top < 70 || card.top > window.innerHeight * 0.6) $(".quote__card", root).scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    }

    function updateSend() {
      const ok = valid(5);
      const btn = $("[data-send]", root);
      btn.href = ok ? wa(message()) : "#";
      btn.classList.toggle("is-disabled", !ok);
      btn.setAttribute("aria-disabled", String(!ok));
    }

    let advanceTimer;
    const advance = (from) => { clearTimeout(advanceTimer); advanceTimer = setTimeout(() => { if (st.step === from) go(from + 1); }, 260); };

    function selectProduct(id, jump) {
      const p = productos.find((x) => x.id === id);
      if (!p) return;
      if (st.product?.id !== id) { st.variant = ""; st.qty = ""; $("[data-other]", root).hidden = true; qtyInput.value = ""; }
      st.product = p;
      renderVariants();
      if (jump) go(2, false); else advance(1);
    }

    root.addEventListener("click", (e) => {
      const t = e.target.closest("button, a");
      if (!t || !root.contains(t)) return;
      if (t.dataset.product) selectProduct(t.dataset.product);
      else if (t.dataset.variant) { st.variant = t.dataset.variant; syncPressed(); advance(2); }
      else if (t.dataset.qty) {
        if (t.dataset.qty === "otra") {
          $("[data-other]", root).hidden = false;
          st.qty = qtyInput.value ? qtyInput.value : "";
          syncPressed(); qtyInput.focus();
        } else { $("[data-other]", root).hidden = true; st.qty = t.dataset.qty; syncPressed(); advance(3); }
      } else if (t.dataset.design) { st.design = t.dataset.design; syncPressed(); advance(4); }
      else if (t.dataset.goto) go(Number(t.dataset.goto));
      else if (t.hasAttribute("data-back")) go(st.step - 1);
      else if (t.hasAttribute("data-next")) go(st.step + 1);
      else if (t.hasAttribute("data-send") && !valid(5)) {
        e.preventDefault();
        $("[data-name-error]", root).hidden = false;
        nameInput.focus();
        return;
      }
      $("[data-next]", root).disabled = !valid(st.step);
      renderSummary();
    });

    qtyInput.addEventListener("input", () => {
      const v = qtyInput.value.replace(/\D/g, "");
      st.qty = v && Number(v) > 0 ? v : "";
      $("[data-next]", root).disabled = !valid(3);
      renderSummary();
    });
    qtyInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && valid(3)) go(4); });
    nameInput.addEventListener("input", () => { st.name = nameInput.value; if (valid(5)) $("[data-name-error]", root).hidden = true; updateSend(); renderSummary(); });
    noteInput.addEventListener("input", () => { st.note = noteInput.value; updateSend(); });

    // Botones "Cotizar" de las tarjetas de producto
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-quote-product]");
      if (!b) return;
      selectProduct(b.dataset.quoteProduct, true);
      $("#cotizador").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });

    go(1, false);
  }

  /* ---------- Para colegios ---------- */
  function renderSchools() {
    const S = C.colegios;
    $("[data-schools]").innerHTML = `
      <div class="schools__grid">
        <div class="schools__media reveal">
          <img src="${esc(S.img)}" alt="Cuaderno de comunicaciones personalizado para colegio" width="800" height="800" loading="lazy">
          <div class="schools__badge">${icon("escuela")}<span><b>Todo el ciclo lectivo</b><small>Pedidos por institución</small></span></div>
        </div>
        <div class="schools__text">
          <p class="eyebrow reveal">${esc(S.etiqueta)}</p>
          <h2 class="reveal">${esc(S.titulo)}</h2>
          <p class="schools__lead reveal">${esc(S.texto)}</p>
          <ul class="schools__list">
            ${S.items.map((it, i) => `<li class="reveal" style="--d:${i}"><span class="schools__icon">${icon(it.icono)}</span><div><strong>${esc(it.titulo)}</strong><p>${esc(it.texto)}</p></div></li>`).join("")}
          </ul>
          <a class="btn btn--primary btn--lg reveal" href="${wa(S.mensaje)}" target="_blank" rel="noopener">${icon("whatsapp")}${esc(S.cta)}</a>
        </div>
      </div>`;
  }

  /* ---------- Galería + lightbox ---------- */
  function renderGallery() {
    const G = C.galeria;
    $("[data-gallery]").innerHTML = `
      <header class="section__head reveal">
        <p class="eyebrow">Trabajos</p>
        <h2>${esc(G.titulo)}</h2>
        <p>${esc(G.subtitulo)}</p>
      </header>
      <div class="filters reveal" role="group" aria-label="Filtrar trabajos">
        ${["Todos", ...G.categorias].map((c, i) => `<button type="button" class="filter" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("")}
      </div>
      <div class="gallery">
        ${G.items.map((it, i) => `
          <button type="button" class="gitem reveal" data-cat="${esc(it.categoria)}" data-index="${i}" style="--d:${i % 3}" aria-label="Ver ${esc(it.titulo)}">
            <img src="${esc(it.img)}" alt="${esc(it.titulo)}" width="600" height="600" loading="lazy">
            <span class="gitem__cap"><small>${esc(it.categoria)}</small>${esc(it.titulo.split("·").pop().trim())}</span>
          </button>`).join("")}
      </div>
      <div class="gallery__cta reveal">
        <a class="btn btn--ghost" href="${esc(N.instagram.url)}" target="_blank" rel="noopener">${icon("instagram")}${esc(G.ctaInstagram)} ${esc(N.instagram.usuario)}</a>
      </div>`;

    const grid = $(".gallery");
    $(".filters").addEventListener("click", (e) => {
      const b = e.target.closest("[data-filter]");
      if (!b) return;
      $$(".filter").forEach((f) => f.setAttribute("aria-pressed", String(f === b)));
      const cat = b.dataset.filter;
      $$(".gitem", grid).forEach((g) => {
        const show = cat === "Todos" || g.dataset.cat === cat;
        g.classList.toggle("is-hidden", !show);
        if (show) { g.classList.add("is-in"); g.classList.remove("pop"); void g.offsetWidth; g.classList.add("pop"); }
      });
    });

    // Lightbox
    const lb = $("#lightbox");
    lb.innerHTML = `
      <div class="lb__backdrop" data-close></div>
      <figure class="lb__fig">
        <div class="lb__media"><img alt="" data-lb-img></div>
        <figcaption class="lb__cap">
          <span class="lb__cat" data-lb-cat></span>
          <p class="lb__title" data-lb-title></p>
          <a class="btn btn--wa btn--sm" data-lb-wa target="_blank" rel="noopener">${icon("whatsapp")}${esc(G.botonLightbox)}</a>
          <span class="lb__count" data-lb-count></span>
        </figcaption>
      </figure>
      <button type="button" class="lb__btn lb__close" data-close aria-label="Cerrar">${icon("cerrar")}</button>
      <button type="button" class="lb__btn lb__prev" data-prev aria-label="Anterior">${icon("izq")}</button>
      <button type="button" class="lb__btn lb__next" data-next-img aria-label="Siguiente">${icon("der")}</button>`;

    let list = [], pos = 0, lastFocus = null;
    const show = () => {
      const it = G.items[list[pos]];
      const img = $("[data-lb-img]", lb);
      img.classList.remove("is-loaded");
      img.onload = () => img.classList.add("is-loaded");
      img.src = it.img; img.alt = it.titulo;
      $("[data-lb-cat]", lb).textContent = it.categoria;
      $("[data-lb-title]", lb).textContent = it.titulo;
      $("[data-lb-count]", lb).textContent = `${pos + 1} / ${list.length}`;
      $("[data-lb-wa]", lb).href = wa(`${C.whatsapp.saludo} Vi este trabajo en la web: *${it.titulo}*. Quiero algo así para mi negocio, ¿me pasan presupuesto?`);
      if (img.complete) img.classList.add("is-loaded");
    };
    const open = (idx) => {
      list = $$(".gitem:not(.is-hidden)", grid).map((g) => Number(g.dataset.index));
      pos = Math.max(0, list.indexOf(idx));
      lastFocus = document.activeElement;
      lb.hidden = false;
      document.documentElement.classList.add("lb-open");
      requestAnimationFrame(() => lb.classList.add("is-open"));
      show();
      $(".lb__close", lb).focus();
    };
    const close = () => {
      lb.classList.remove("is-open");
      document.documentElement.classList.remove("lb-open");
      setTimeout(() => { lb.hidden = true; }, reduceMotion ? 0 : 220);
      lastFocus?.focus();
    };
    const step = (d) => { pos = (pos + d + list.length) % list.length; show(); };

    grid.addEventListener("click", (e) => { const g = e.target.closest(".gitem"); if (g) open(Number(g.dataset.index)); });
    lb.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]")) close();
      else if (e.target.closest("[data-prev]")) step(-1);
      else if (e.target.closest("[data-next-img]")) step(1);
    });
    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "Tab") {
        const f = $$("button, a[href]", lb).filter((x) => x.offsetParent !== null);
        const i = f.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    });
    let x0 = null, y0 = null;
    lb.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    lb.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
      x0 = null;
    }, { passive: true });
  }

  /* ---------- Cómo trabajamos ---------- */
  function renderSteps() {
    const S = C.pasos;
    $("[data-steps]").innerHTML = `
      <header class="section__head reveal">
        <p class="eyebrow">Paso a paso</p>
        <h2>${esc(S.titulo)}</h2>
        <p>${esc(S.subtitulo)}</p>
      </header>
      <ol class="steps">
        ${S.lista.map((s, i) => `
          <li class="step reveal" style="--d:${i}">
            <span class="step__num">${i + 1}</span>
            <span class="step__icon">${icon(s.icono)}</span>
            <h3>${esc(s.titulo)}</h3>
            <p>${esc(s.texto)}</p>
          </li>`).join("")}
      </ol>
      <ul class="badges">
        ${S.badges.map((b, i) => `<li class="badge reveal" style="--d:${i}">${icon(b.icono)}<span>${esc(b.texto)}</span></li>`).join("")}
      </ul>
      <div class="steps__cta reveal">
        <a class="btn btn--wa btn--lg" href="${wa(C.whatsapp.general)}" target="_blank" rel="noopener">${icon("whatsapp")}Escribinos ahora</a>
      </div>`;
  }

  /* ---------- Contacto ---------- */
  function renderContact() {
    const K = C.contacto;
    $("[data-contact]").innerHTML = `
      <header class="section__head reveal">
        <p class="eyebrow">Contacto</p>
        <h2>${esc(K.titulo)}</h2>
        <p>${esc(K.subtitulo)}</p>
      </header>
      <div class="contact">
        <div class="contact__card reveal">
          <span data-status class="status"></span>
          <h3>${icon("reloj")}Horarios</h3>
          <table class="hours">
            <tbody>${C.horariosTexto.map((h) => `<tr data-hours-row="${h.diasNum.join(",")}"><th scope="row">${esc(h.dias)}</th><td>${esc(h.horas)}</td></tr>`).join("")}</tbody>
          </table>
          <ul class="clist">
            <li>${icon("pin")}<div><strong>Dirección</strong><span>${esc(direccionCompleta)}</span></div></li>
            <li>${icon("whatsapp")}<div><strong>WhatsApp · pedidos</strong><a href="${wa(C.whatsapp.general)}" target="_blank" rel="noopener">${esc(N.whatsapp.visible)}</a></div></li>
            <li>${icon("telefono")}<div><strong>Teléfono fijo</strong><a href="tel:${esc(N.telefono.numero)}">${esc(N.telefono.visible)}</a></div></li>
            <li>${icon("mail")}<div><strong>Email</strong><a href="mailto:${esc(N.email)}">${esc(N.email)}</a></div></li>
            <li>${icon("instagram")}<div><strong>Instagram</strong><a href="${esc(N.instagram.url)}" target="_blank" rel="noopener">${esc(N.instagram.usuario)}</a></div></li>
          </ul>
          <div class="contact__btns">
            <a class="btn btn--wa" href="${wa(C.whatsapp.general)}" target="_blank" rel="noopener">${icon("whatsapp")}${esc(K.botonWhatsapp)}</a>
            <a class="btn btn--ghost" href="${esc(N.mapa.comoLlegar)}" target="_blank" rel="noopener">${icon("navegar")}${esc(K.botonComoLlegar)}</a>
          </div>
          <p class="contact__note">${esc(K.notaPedidos)}</p>
        </div>
        <div class="contact__map reveal">
          <iframe src="${esc(N.mapa.embed)}" title="Mapa: ${esc(N.nombre)}, ${esc(direccionCompleta)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
          <a class="contact__map-pin" href="${esc(N.mapa.comoLlegar)}" target="_blank" rel="noopener">${icon("pin")}${esc(N.direccion.calle)}, ${esc(N.direccion.localidad)}</a>
        </div>
      </div>`;
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    const F = C.footer;
    const extra = [{ texto: "Armá tu pedido", href: "#cotizador" }, { texto: "Para colegios", href: "#colegios" }];
    $("[data-footer]").innerHTML = `
      <div class="container footer__grid">
        <div class="footer__brand">
          <a class="brand brand--light" href="#inicio"><img src="${esc(N.logo)}" width="48" height="48" alt=""><span class="brand__txt"><strong>${esc(N.nombre)}</strong><small>${esc(N.rubro)}</small></span></a>
          <p>${esc(F.frase)}</p>
          <div class="footer__social">
            <a href="${esc(N.instagram.url)}" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
            <a href="${wa(C.whatsapp.general)}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("whatsapp")}</a>
            <a href="mailto:${esc(N.email)}" aria-label="Email">${icon("mail")}</a>
          </div>
        </div>
        <div><h4>Secciones</h4><ul>${[...C.nav, ...extra].map((l) => `<li><a href="${esc(l.href)}">${esc(l.texto)}</a></li>`).join("")}</ul></div>
        <div class="footer__contact"><h4>Contacto</h4><ul>
          <li>${esc(direccionCompleta)}</li>
          <li><a href="${wa(C.whatsapp.general)}" target="_blank" rel="noopener">WhatsApp ${esc(N.whatsapp.visible)}</a></li>
          <li><a href="tel:${esc(N.telefono.numero)}">Tel. ${esc(N.telefono.visible)}</a></li>
          <li><a href="mailto:${esc(N.email)}">${esc(N.email)}</a></li>
          <li><a href="${esc(N.instagram.url)}" target="_blank" rel="noopener">${esc(N.instagram.usuario)}</a></li>
        </ul></div>
        <div><h4>Horarios</h4><ul>${C.horariosTexto.map((h) => `<li><b>${esc(h.dias)}</b><br>${esc(h.horas)}</li>`).join("")}</ul></div>
      </div>
      <div class="container footer__bottom">
        <span>© ${new Date().getFullYear()} ${esc(N.nombre)} · ${esc(N.direccion.localidad)}, ${esc(N.direccion.provincia)}</span>
        <span class="footer__credit">${F.creditoUrl ? `<a href="${esc(F.creditoUrl)}" target="_blank" rel="noopener">${esc(F.credito)}</a>` : esc(F.credito)}</span>
      </div>`;
  }

  /* ---------- SEO: schema.org LocalBusiness ---------- */
  function injectSchema() {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const groups = {};
    Object.entries(C.horarios).forEach(([d, franjas]) => franjas.forEach(([a, b]) => { (groups[`${a}-${b}`] ||= { opens: a, closes: b, days: [] }).days.push(dayNames[d]); }));
    const base = N.sitioUrl || location.href.split("#")[0];
    const abs = (p) => new URL(p, base).href;
    const data = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: N.nombre,
      description: `${N.rubro} en ${N.direccion.localidad}. ${C.hero.subtitulo}`,
      url: base,
      logo: abs(N.logo),
      image: abs("img/og-image.jpg"),
      telephone: `+${N.whatsapp.numero}`,
      email: N.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: N.direccion.calle,
        addressLocality: N.direccion.localidad,
        addressRegion: N.direccion.provincia,
        addressCountry: N.direccion.pais,
      },
      hasMap: N.mapa.comoLlegar,
      sameAs: [N.instagram.url],
      openingHoursSpecification: Object.values(groups).map((g) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: g.days, opens: g.opens, closes: g.closes })),
      contactPoint: [
        { "@type": "ContactPoint", telephone: `+${N.whatsapp.numero}`, contactType: "customer service", availableLanguage: "es" },
        { "@type": "ContactPoint", telephone: N.telefono.numero, contactType: "customer service", availableLanguage: "es" },
      ],
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ---------- Comportamiento general ---------- */
  function setupHeader() {
    const header = $("#header");
    const burger = $("#burger");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const setMenu = (open) => {
      document.documentElement.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };
    burger.addEventListener("click", () => setMenu(!document.documentElement.classList.contains("nav-open")));
    $("#nav").addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
    window.matchMedia("(min-width: 960px)").addEventListener("change", () => setMenu(false));

    // Link activo según la sección visible
    if ("IntersectionObserver" in window) {
      const links = $$("[data-nav] a");
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${en.target.id}`));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      C.nav.forEach((l) => { const s = $(l.href); if (s) io.observe(s); });
      $$("main > section").forEach((s) => { if (!C.nav.some((l) => l.href === `#${s.id}`)) io.observe(s); });
    }
  }

  function setupReveal() {
    const els = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
  }

  function setupFloatTip() {
    // Muestra una vez por sesión el globito "Escribinos por WhatsApp"
    let seen = false;
    try { seen = sessionStorage.getItem("wa-tip") === "1"; } catch (_) { /* sin storage */ }
    if (seen) return;
    setTimeout(() => {
      const f = $("[data-wa-float]");
      f.classList.add("show-tip");
      setTimeout(() => f.classList.remove("show-tip"), 5000);
      try { sessionStorage.setItem("wa-tip", "1"); } catch (_) { /* sin storage */ }
    }, 6000);
  }

  /* ---------- Inicio ---------- */
  renderHeader();
  renderHero();
  renderRibbon();
  renderSeason();
  renderProducts();
  renderQuote();
  renderSchools();
  renderGallery();
  renderSteps();
  renderContact();
  renderFooter();
  injectSchema();
  updateStatus();
  setInterval(updateStatus, 30000);
  setupHeader();
  setupReveal();
  setupFloatTip();
  document.documentElement.classList.add("is-ready");
})();
