/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  GOOGLE ADS — Dulce Pasión Lencería Fina
 *  Material de campaña RSA + visor tipo ventana de Google.
 *
 *  · 15 titulares     (máx. 30 caracteres) — se marcan en VERDE si cumplen
 *  · 4  descripciones (máx. 90 caracteres) — se marcan en VERDE si cumplen
 *  · 10 palabras clave (máx. 30 caracteres) en concordancia EXACTA [palabra]
 *
 *  Códigos de este sitio (únicos, no reutilizar):
 *    Cuenta / campaña : 235-697-6411
 *    Etiqueta gtag    : AW-2356976411
 *    Conversión       : AW-2356976411/dPlF_8kQwN2LxR7vB
 * ═══════════════════════════════════════════════════════════════════════════
 */
const DPLF_GOOGLE_ADS = {
  urlFinal: "https://dulce-pasi-n-lencer-a-fina.onrender.com/",
  urlVisualizacion: "dulce-pasi-n-lencer-a-fina.onrender.com",
  regionCampana: "Búsqueda · concordancia exacta",

  anunciante: {
    nombreComercial: "Dulce Pasión Lencería Fina",
    titular: "Gladys Bohórquez Hernández",
    verificacion: "30 de agosto de 2026",
    direccion: "DIRECCIÓN COMPLETA",
    email: "candelariomarlenemaria@gmail.com",
    telefono: "NÚMERO CON INDICATIVO",
    idCampana: "235-697-6411",
    awId: "AW-2356976411",
    conversion: "AW-2356976411/dPlF_8kQwN2LxR7vB",
  },

  /* 10 palabras clave APTAS — máx. 30 caracteres — concordancia exacta [clave] */
  palabrasClaveCampana: [
    { texto: "lencería fina", caracteres: 13 },
    { texto: "ropa interior mujer", caracteres: 19 },
    { texto: "lencería de mujer", caracteres: 17 },
    { texto: "ropa íntima femenina", caracteres: 20 },
    { texto: "lencería premium", caracteres: 16 },
    { texto: "sets de lencería", caracteres: 16 },
    { texto: "boutique lencería", caracteres: 17 },
    { texto: "lencería exclusiva", caracteres: 18 },
    { texto: "lencería para mujer", caracteres: 19 },
    { texto: "ropa íntima de mujer", caracteres: 20 },
  ],

  palabrasClaveNegativas: [
    "gratis",
    "free",
    "xxx",
    "porno",
    "erótico barato",
    "disfraz",
    "mayorista china",
    "imitacion",
  ],

  titulares: [
    { texto: "Dulce Pasión Lencería", caracteres: 21 },
    { texto: "Lencería Fina de Mujer", caracteres: 22 },
    { texto: "Ropa Íntima Femenina", caracteres: 20 },
    { texto: "Lencería de Alta Gama", caracteres: 21 },
    { texto: "Colección Lencería Fina", caracteres: 23 },
    { texto: "Lencería Exclusiva", caracteres: 18 },
    { texto: "Boutique de Lencería", caracteres: 20 },
    { texto: "Sets de Lencería Fina", caracteres: 21 },
    { texto: "Encaje, Seda y Tul", caracteres: 18 },
    { texto: "Lencería Femenina Fina", caracteres: 22 },
    { texto: "Pedidos por WhatsApp", caracteres: 20 },
    { texto: "Lencería para Mujer", caracteres: 19 },
    { texto: "Diseño Íntimo de Autor", caracteres: 22 },
    { texto: "Atelier de Lencería", caracteres: 19 },
    { texto: "Calce y Confección Fina", caracteres: 23 },
  ],

  descripciones: [
    {
      texto: "Lencería fina de mujer en seda y encaje. Colecciones exclusivas y asesoría de talla.",
      caracteres: 84,
    },
    {
      texto: "Boutique de ropa íntima femenina. Encargos por WhatsApp y atención confidencial.",
      caracteres: 80,
    },
    {
      texto: "Conjuntos, basques y piezas nupciales. Calidad artesanal y calce preciso de atelier.",
      caracteres: 85,
    },
    {
      texto: "Catálogo, asesoría de estilo y pedidos discretos. Dulce Pasión Lencería Fina.",
      caracteres: 77,
    },
  ],

  extensiones: {
    sitelinks: [
      {
        titulo: "Quiénes somos",
        url: "https://dulce-pasi-n-lencer-a-fina.onrender.com/#somos",
        desc: "La maison y el atelier",
      },
      {
        titulo: "Servicios",
        url: "https://dulce-pasi-n-lencer-a-fina.onrender.com/#servicios",
        desc: "Talla, nupcial y a medida",
      },
      {
        titulo: "Colecciones",
        url: "https://dulce-pasi-n-lencer-a-fina.onrender.com/#ofrecemos",
        desc: "Qué ofrecemos",
      },
      {
        titulo: "Contacto",
        url: "https://dulce-pasi-n-lencer-a-fina.onrender.com/#contacto",
        desc: "Formulario y WhatsApp",
      },
    ],
    callouts: [
      "Asesoría de talla",
      "Encaje y seda",
      "Línea nupcial",
      "Encargos a medida",
      "Empaque discreto",
      "Pedidos por WhatsApp",
    ],
  },

  checklistPoliticas: [
    "El anuncio describe lencería / ropa íntima de mujer, no contenido sexual explícito.",
    "La URL final coincide con el sitio oficial en Render.",
    "Gladys Bohórquez Hernández figura como dueña, verificante de Google Ads, responsable de la forma de pago y del sitio. Correo e ID 235-697-6411 son visibles.",
    "Las palabras clave están en concordancia exacta y coinciden con el contenido.",
    "El sitio incluye términos, privacidad, cookies y casilla obligatoria en el formulario.",
  ],
};

DPLF_GOOGLE_ADS.exportarTitulares = function () {
  return DPLF_GOOGLE_ADS.titulares.map(function (t) {
    return t.texto;
  });
};

DPLF_GOOGLE_ADS.exportarDescripciones = function () {
  return DPLF_GOOGLE_ADS.descripciones.map(function (d) {
    return d.texto;
  });
};

DPLF_GOOGLE_ADS.clavesTexto = function () {
  return DPLF_GOOGLE_ADS.palabrasClaveCampana.map(function (k) {
    return k.texto;
  });
};

DPLF_GOOGLE_ADS.exportarExactas = function () {
  return DPLF_GOOGLE_ADS.clavesTexto().map(function (k) {
    return "[" + k + "]";
  });
};

DPLF_GOOGLE_ADS.combinacion = function (seed) {
  var h = DPLF_GOOGLE_ADS.titulares;
  var d = DPLF_GOOGLE_ADS.descripciones;
  var k = DPLF_GOOGLE_ADS.palabrasClaveCampana;
  var i = Math.abs(seed || 0);
  return {
    h1: h[i % h.length].texto,
    h2: h[(i + 5) % h.length].texto,
    h3: h[(i + 9) % h.length].texto,
    desc: d[i % d.length].texto,
    keyword: k[i % k.length].texto,
  };
};
