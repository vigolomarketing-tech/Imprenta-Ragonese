/* =============================================================
   IMPRENTA RAGONESE — CONTENIDO DEL SITIO
   -------------------------------------------------------------
   Todo lo que se ve en la página sale de este archivo.
   Para cambiar un texto, un horario, un producto o una foto,
   editá acá y guardá. No hace falta tocar el HTML ni el JS.

   Fotos: reemplazá los archivos de /img por fotos reales
   (ideal .jpg o .webp, ~1200px de ancho) y cambiá la ruta acá.
   ============================================================= */

const CONFIG = {
  /* ---------- Datos del negocio ---------- */
  negocio: {
    nombre: "Imprenta Ragonese",
    rubro: "Imprenta · Gráfica",
    dueno: "Sergio Ragonese",
    logo: "img/logo.svg",
    direccion: {
      calle: "Davel 1260",
      localidad: "Longchamps",
      provincia: "Buenos Aires",
      pais: "AR",
    },
    whatsapp: {
      numero: "5491139460942", // formato internacional, sin + ni espacios
      visible: "11-3946-0942",
    },
    telefono: {
      numero: "+541146005934",
      visible: "4600-5934",
    },
    email: "imprenta.ragonese@gmail.com",
    instagram: {
      usuario: "@imprenta_ragonese",
      url: "https://www.instagram.com/imprenta_ragonese/",
    },
    zonaHoraria: "America/Argentina/Buenos_Aires",
    mapa: {
      embed: "https://www.google.com/maps?q=Davel+1260,+Longchamps,+Buenos+Aires,+Argentina&output=embed",
      comoLlegar: "https://www.google.com/maps/dir/?api=1&destination=Davel+1260,+Longchamps,+Buenos+Aires,+Argentina",
    },
    // URL pública del sitio (completar cuando esté publicado; se usa en schema.org)
    sitioUrl: "",
  },

  /* ---------- Horarios ----------
     0 = domingo, 1 = lunes ... 6 = sábado.
     Cada día es una lista de franjas ["apertura", "cierre"] en formato 24 h.
     Lista vacía = cerrado. */
  horarios: {
    0: [],
    1: [["09:00", "13:00"], ["16:00", "20:00"]],
    2: [["09:00", "13:00"], ["16:00", "20:00"]],
    3: [["09:00", "13:00"], ["16:00", "20:00"]],
    4: [["09:00", "13:00"], ["16:00", "20:00"]],
    5: [["09:00", "13:00"], ["16:00", "20:00"]],
    6: [["09:00", "13:00"]],
  },
  // Cómo se muestran los horarios en la tabla de contacto
  horariosTexto: [
    { dias: "Lunes a viernes", horas: "9:00 a 13:00 · 16:00 a 20:00", diasNum: [1, 2, 3, 4, 5] },
    { dias: "Sábados", horas: "9:00 a 13:00", diasNum: [6] },
    { dias: "Domingos", horas: "Cerrado", diasNum: [0] },
  ],

  /* ---------- Menú ---------- */
  nav: [
    { texto: "Productos", href: "#productos" },
    { texto: "Calendarios 2027", href: "#calendarios" },
    { texto: "Trabajos", href: "#trabajos" },
    { texto: "Contacto", href: "#contacto" },
  ],

  /* ---------- WhatsApp: textos base ---------- */
  whatsapp: {
    saludo: "¡Hola Imprenta Ragonese! 👋",
    general: "¡Hola Imprenta Ragonese! 👋 Quiero hacer una consulta.",
    presupuesto: "¡Hola Imprenta Ragonese! 👋 Quiero pedir un presupuesto.",
    botonHeader: "Pedir por WhatsApp",
    botonFlotante: "Escribinos por WhatsApp",
  },

  /* ---------- Hero ---------- */
  hero: {
    etiqueta: "Imprenta · Gráfica en Longchamps",
    titulo: "Imprimimos lo que",
    tituloDestacado: "tu negocio",
    tituloFinal: "necesita",
    subtitulo: "Calendarios, stickers, volantes, tarjetas y más. Diseño e impresión en Longchamps.",
    ctaPrincipal: "Pedir presupuesto",
    ctaSecundario: "Ver productos",
    puntos: ["Diseño incluido", "Atención personalizada", "Retiro en el local"],
    collage: [
      { img: "img/hero/calendario.svg", alt: "Calendario de pared impreso", clase: "c-cal" },
      { img: "img/hero/volante.svg", alt: "Volante full color", clase: "c-vol" },
      { img: "img/hero/tarjeta.svg", alt: "Tarjetas personales", clase: "c-tar" },
      { img: "img/hero/sticker.svg", alt: "Plancha de stickers troquelados", clase: "c-sti" },
    ],
  },

  /* ---------- Cinta de productos (debajo del hero) ---------- */
  cinta: ["Calendarios 2027", "Stickers troquelados", "Volantes", "Tarjetas personales", "Banners", "Vinilos", "Etiquetas", "Diplomas", "Talonarios", "Cuadernos de comunicaciones"],

  /* ---------- Banner de temporada: CALENDARIOS 2027 ---------- */
  calendarios: {
    etiqueta: "Temporada abierta",
    titulo: "Calendarios 2027",
    subtitulo: "Pedilos para tu negocio, emprendimiento, souvenirs y más. Tu marca en la pared de tus clientes los 365 días del año.",
    usos: ["Negocios", "Emprendimientos", "Souvenirs", "Regalos empresariales"],
    // Cuenta regresiva hasta esta fecha (hora Argentina)
    fechaObjetivo: "2027-01-01T00:00:00-03:00",
    textoCuenta: "para el 2027",
    boton: "Pedir este calendario",
    variantes: [
      {
        id: "almanaque-300g",
        nombre: "Almanaque Ilustración 300g",
        detalle: "Con agujero para colgar",
        descripcion: "Papel ilustración grueso, colores vivos y terminación prolija. El clásico de mostrador.",
        img: "img/calendarios/almanaque-300g-agujero.svg",
        destacado: "El más pedido",
        medidas: ["31 x 46 cm", "23 x 31 cm", "15,5 x 31 cm", "15,5 x 23 cm"],
      },
      {
        id: "almanaque-150g",
        nombre: "Almanaque Ilustración 150g",
        detalle: "Con varilla",
        descripcion: "Liviano, con varilla metálica arriba y abajo. Queda impecable colgado en cualquier pared.",
        img: "img/calendarios/almanaque-150g-varilla.svg",
        destacado: "",
        medidas: ["31 x 46 cm", "23 x 31 cm", "15,5 x 31 cm", "15,5 x 23 cm"],
      },
      {
        id: "almanaque-carpita",
        nombre: "Almanaque Carpita",
        detalle: "De escritorio",
        descripcion: "Para el escritorio de tus clientes: cartulina troquelada o carpita anillada mes a mes.",
        img: "img/calendarios/almanaque-carpita.svg",
        destacado: "Ideal souvenir",
        medidas: ["Cartulina troquelada 21 x 11 cm", "Carpita anillada 20 x 15 cm"],
      },
    ],
  },

  /* ---------- Catálogo de productos ----------
     icono: stickers | etiqueta | volante | tarjeta | banner | cuaderno | diploma | regalo | talonario
     variantes: opciones que aparecen en el cotizador (paso "medida / variante")
     cantidades: opcional, si el producto usa otras cantidades típicas */
  productos: {
    titulo: "Todo lo que imprimimos",
    subtitulo: "Elegí un producto y consultanos por WhatsApp. Te asesoramos sin compromiso.",
    boton: "Consultar",
    lista: [
      {
        id: "stickers",
        nombre: "Stickers troquelados",
        icono: "stickers",
        descripcion: "Para negocios y emprendimientos: logos, packaging, agradecimientos. Cortados a la forma que quieras.",
        img: "img/productos/stickers.svg",
        variantes: ["Redondos 5 cm", "Redondos 7 cm", "Cuadrados 5 x 5 cm", "Forma personalizada"],
      },
      {
        id: "etiquetas",
        nombre: "Etiquetas para souvenirs",
        icono: "etiqueta",
        descripcion: "Etiquetas personalizadas para cumpleaños, bautismos, casamientos y eventos.",
        img: "img/productos/etiquetas.svg",
        variantes: ["Colgantes con hilo", "Redondas autoadhesivas", "Rectangulares", "A medida"],
      },
      {
        id: "volantes",
        nombre: "Volantes",
        icono: "volante",
        descripcion: "Full color o blanco y negro, simple o doble faz. Ideales para promos y aperturas.",
        img: "img/productos/volantes.svg",
        variantes: ["A5 full color", "A6 full color", "A5 blanco y negro", "1/4 oficio blanco y negro"],
        cantidades: [100, 500, 1000, 5000],
      },
      {
        id: "tarjetas",
        nombre: "Tarjetas personales",
        icono: "tarjeta",
        descripcion: "Tarjetas que dejan buena impresión: papel grueso, frente y dorso, terminación mate o brillo.",
        img: "img/productos/tarjetas.svg",
        variantes: ["Simple faz", "Doble faz", "Con laminado mate", "Con laminado brillo"],
        cantidades: [100, 250, 500, 1000],
      },
      {
        id: "banners",
        nombre: "Banners y vinilos",
        icono: "banner",
        descripcion: "Banners roll-up, lonas y vinilos para vidrieras, vehículos y eventos.",
        img: "img/productos/banners.svg",
        variantes: ["Banner roll-up", "Lona con ojales", "Vinilo para vidriera", "Vinilo de corte"],
        cantidades: [1, 2, 5, 10],
      },
      {
        id: "cuadernos",
        nombre: "Cuadernos de comunicaciones",
        icono: "cuaderno",
        descripcion: "Para colegios y jardines, con el escudo y los datos de la institución.",
        img: "img/productos/cuadernos.svg",
        variantes: ["Tapa blanda", "Tapa con laminado", "Anillado", "Con hojas personalizadas"],
      },
      {
        id: "diplomas",
        nombre: "Diplomas y certificados",
        icono: "diploma",
        descripcion: "Para egresados, cursos, actos y reconocimientos. En papeles especiales.",
        img: "img/productos/diplomas.svg",
        variantes: ["A4", "A5", "Papel texturado", "Con nombres personalizados"],
      },
      {
        id: "souvenirs",
        nombre: "Souvenirs y cumpleaños",
        icono: "regalo",
        descripcion: "Banderines, candy bar, cajitas, invitaciones y todo para tu fiesta.",
        img: "img/productos/souvenirs.svg",
        variantes: ["Kit candy bar", "Banderines", "Invitaciones", "Cajitas y bolsitas"],
        cantidades: [10, 20, 50, 100],
      },
      {
        id: "talonarios",
        nombre: "Talonarios y recibos",
        icono: "talonario",
        descripcion: "Recibos, remitos, presupuestos y órdenes numeradas, con original y duplicado.",
        img: "img/productos/talonarios.svg",
        variantes: ["Original y duplicado", "Original y triplicado", "Tamaño A5", "Tamaño A4"],
        cantidades: [5, 10, 20, 50],
      },
    ],
  },

  /* ---------- Cotizador "Armá tu pedido" ---------- */
  cotizador: {
    titulo: "Armá tu pedido",
    subtitulo: "En 5 pasos y menos de un minuto. Te pasamos el presupuesto por WhatsApp.",
    cantidades: [50, 100, 500, 1000],
    opcionesDiseno: [
      { valor: "Ya tengo el diseño", detalle: "Te mando el archivo" },
      { valor: "Necesito que lo diseñen", detalle: "Lo hacemos nosotros" },
    ],
    aclaracion: "Sin precios en la web: te pasamos el presupuesto por WhatsApp.",
    botonFinal: "Enviar pedido por WhatsApp",
  },

  /* ---------- Para colegios ---------- */
  colegios: {
    etiqueta: "Para instituciones",
    titulo: "Para colegios y jardines",
    texto: "Acompañamos a escuelas y jardines con los impresos de todo el ciclo lectivo. Hacemos el pedido completo, con la identidad de tu institución y en los tiempos que necesitás.",
    img: "img/colegios/colegios.svg",
    items: [
      { icono: "cuaderno", titulo: "Cuadernos de comunicaciones", texto: "Con escudo, datos y hojas a medida de cada nivel." },
      { icono: "libreta", titulo: "Libretas", texto: "Libretas de calificaciones y de asistencia." },
      { icono: "diploma", titulo: "Diplomas de fin de año", texto: "Egresados, actos y reconocimientos con nombres impresos." },
    ],
    cta: "Hacé el pedido para tu institución",
    mensaje: "¡Hola Imprenta Ragonese! 👋 Escribo de una institución educativa y quiero pedir presupuesto para cuadernos de comunicaciones / libretas / diplomas.\n\n🏫 Institución: \n📦 Qué necesitamos: \n🔢 Cantidad aproximada: ",
  },

  /* ---------- Galería de trabajos ----------
     Reemplazá cada img por la foto real del trabajo.
     categoria debe coincidir con una de "categorias". */
  galeria: {
    titulo: "Trabajos que salieron de nuestra imprenta",
    subtitulo: "Algunos de los impresos que hacemos todos los días para negocios, emprendedores y colegios.",
    categorias: ["Calendarios", "Stickers", "Volantes", "Tarjetas", "Colegios"],
    items: [
      { titulo: "Almanaque 300g · Panadería El Trigal", categoria: "Calendarios", img: "img/galeria/01-panaderia-el-trigal.svg" },
      { titulo: "Stickers troquelados · Veterinaria Patitas", categoria: "Stickers", img: "img/galeria/02-veterinaria-patitas.svg" },
      { titulo: "Volantes A5 · Gimnasio Fuerza Sur", categoria: "Volantes", img: "img/galeria/03-gimnasio-fuerza-sur.svg" },
      { titulo: "Tarjetas doble faz · Kiosco El Punto", categoria: "Tarjetas", img: "img/galeria/04-kiosco-el-punto.svg" },
      { titulo: "Cuadernos de comunicaciones · Jardín Pequeños Gigantes", categoria: "Colegios", img: "img/galeria/05-jardin-pequenos-gigantes.svg" },
      { titulo: "Almanaque con varilla · Ferretería El Tornillo", categoria: "Calendarios", img: "img/galeria/06-ferreteria-el-tornillo.svg" },
      { titulo: "Stickers para packaging · Dietética Semillas", categoria: "Stickers", img: "img/galeria/07-dietetica-semillas.svg" },
      { titulo: "Volantes de temporada · Heladería Polar", categoria: "Volantes", img: "img/galeria/08-heladeria-polar.svg" },
      { titulo: "Diplomas de egresados · Colegio Los Aromos", categoria: "Colegios", img: "img/galeria/09-colegio-los-aromos.svg" },
      { titulo: "Almanaque carpita · Pet Shop Huellitas", categoria: "Calendarios", img: "img/galeria/10-pet-shop-huellitas.svg" },
      { titulo: "Tarjetas personales · Estética Luna Nueva", categoria: "Tarjetas", img: "img/galeria/11-estetica-luna-nueva.svg" },
      { titulo: "Cuadernos de comunicaciones · Instituto Nuevo Horizonte", categoria: "Colegios", img: "img/galeria/12-instituto-nuevo-horizonte.svg" },
    ],
    botonLightbox: "Quiero uno así",
    ctaInstagram: "Ver más en Instagram",
  },

  /* ---------- Cómo trabajamos ---------- */
  pasos: {
    titulo: "Cómo trabajamos",
    subtitulo: "Simple, rápido y sin vueltas.",
    lista: [
      { icono: "whatsapp", titulo: "Nos escribís por WhatsApp", texto: "Contanos qué necesitás, la cantidad y para cuándo. Te respondemos con el presupuesto." },
      { icono: "diseno", titulo: "Diseñamos o usamos tu archivo", texto: "Si tenés el diseño, lo imprimimos. Si no, lo armamos con vos y te mandamos la prueba." },
      { icono: "local", titulo: "Retirás en el local", texto: "Pasás a buscar tu pedido por Davel 1260, Longchamps, listo para usar." },
    ],
    badges: [
      { icono: "diseno", texto: "Diseño incluido" },
      { icono: "persona", texto: "Atención personalizada" },
      { icono: "precio", texto: "Precios para emprendedores" },
    ],
  },

  /* ---------- Contacto ---------- */
  contacto: {
    titulo: "Visitanos o escribinos",
    subtitulo: "Estamos en Longchamps. Pedidos y consultas por WhatsApp.",
    botonComoLlegar: "Cómo llegar",
    botonWhatsapp: "Escribir por WhatsApp",
    notaPedidos: "Los pedidos se toman únicamente por WhatsApp.",
  },

  /* ---------- Footer ---------- */
  footer: {
    frase: "Imprenta de barrio con calidad profesional.",
    credito: "Sitio desarrollado por Vigolo Web Studio",
    creditoUrl: "", // opcional: link del estudio
  },
};
