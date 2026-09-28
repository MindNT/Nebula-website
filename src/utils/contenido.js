import kikoi from "../imagenes/KIKOI.jpeg";

export const MONEDA = "$";

// Los planes que todavia no abren se muestran apagados y sin CTA, asi que el
// aviso vive aqui y no repetido en cada tarjeta.
export const ETIQUETA_PROXIMAMENTE = "Próximamente";

// Las anclas de secciones van con ruta absoluta (/#seccion) para que funcionen
// igual desde cualquier pagina; "/planes" y "/cobertura" son paginas aparte.
export const navegacion = [
  { etiqueta: "Funcionalidades", href: "/sistema" },
  { etiqueta: "Cobertura", href: "/cobertura" },
  { etiqueta: "Paquetes", href: "/planes" },
];

// La campaña vigente vive en `lanzamiento` (abajo): 25 negocios seleccionados
// con un año al 15%. Aquí solo se guarda cuántos lugares hay.
// Para sumar un cliente nuevo basta con agregar su estado con el total, usando
// el id de la entidad (yuc, que, jal...) que viene en utils/mexicoEstados.js.
export const cobertura = {
  eyebrow: "Cobertura",
  titulo:
    "Ya somos parte de los negocios que se están cambiando a un software de calidad.",
  parrafo:
    "Cada estado en azul es un negocio que ya dejó de adivinar. Yucatán tiene el primero: KiKOI Coffee.",
  lugares: 25,
  clientes: { yuc: 1 },
  cta: "Quiero formar parte",
};

export const caracteristicas = [
  {
    icono: "recibo",
    titulo: "Cada pedido, con estado y responsable",
    texto:
      "Sabes en qué va cada pedido y quién lo tiene. Se acabó el “¿ya te lo llevaste?” y el pedido que se perdía entre el mostrador y la cocina.",
  },
  {
    icono: "personas",
    titulo: "Cocina y barra al tanto, sin depender de la voz",
    texto:
      "Cada pedido llega solo a su pantalla con su tiempo de preparación. El equipo ve lo mismo que el mostrador, sin tickets que vuelan y sin comandas que se repiten.",
  },
  {
    icono: "capas",
    titulo: "Tu menú, ordenado y siempre al día",
    texto:
      "Organizas por categorías y apagas lo que se agotó con un clic. Así el pedido nunca sale con algo que ya no tienes, y nadie tiene que ir a preguntar si hay.",
  },
  {
    icono: "etiqueta",
    titulo: "Promociones y variantes, en un clic",
    texto:
      "Creas promociones por producto o categoría y variantes por tamaño, sabor o presentación. Sin cálculos a mano y sin códigos sueltos que nadie recuerda.",
  },
  {
    icono: "caja",
    titulo: "El inventario se descuenta solo",
    texto:
      "Cada pedido descuenta stock en el momento. Ves qué se está acabando, qué se perdió y en qué local, antes de quedarte sin producto.",
  },
  {
    icono: "grafica",
    titulo: "Ventas, cancelaciones, ganancias y gastos",
    texto:
      "Analíticas de ventas avanzadas en tiempo real, desde el celular. Qué se vendió, qué se canceló, cuánto ganaste y en qué se te fue el dinero.",
  },
  {
    icono: "hoja",
    titulo: "Cero tickets de papel",
    texto:
      "Cada pedido se envía por correo y se consulta desde el celular. Sin impresora, sin papel y sin cajas de tickets en el mostrador: menos gasto y menos huella.",
  },
];

export const pasos = [
  {
    numero: "01",
    icono: "capas",
    titulo: "Cargas tu catálogo y ya estás tomando pedidos",
    texto:
      "Cargas tus productos, categorías y variantes, y empiezas a recibir pedidos de inmediato. Sin días de espera entre tu menú y tu primer pedido.",
  },
  {
    numero: "02",
    icono: "rayo",
    titulo: "El pedido viaja solo hasta que se entrega",
    texto:
      "Cocina y barra lo ven al instante, el inventario se descuenta solo y el cliente recibe su ticket por correo. Tú solo sigues el avance.",
  },
  {
    numero: "03",
    icono: "grafica",
    titulo: "Al cerrar el día, ya sabes cómo te fue",
    texto:
      "Ventas, cancelaciones, ganancias y gastos en pantalla: qué se vendió, qué se canceló y en qué se te fue el dinero.",
  },
];

export const paquetes = [
  {
    nombre: "Básico",
    etiqueta: "Pedidos y menú",
    precio: { mensual: "599", anual: "5,990" },
    descripcion:
      "Todo tu menú y tus pedidos en un solo lugar, sin comisión por pedido.",
    dispositivos: { iconos: ["tableta"], texto: "1 terminal" },
    resumen: [
      "Precio fijo al mes, sin comisión por pedido",
      "Cada pedido con estado, responsable y hora",
      "Inventario que se descuenta solo con cada pedido",
      "Cero tickets de papel: el ticket llega por correo",
    ],
    destacado: false,
    proximamente: false,
    incluye: [
      "Tus productos, categorías y variantes cargados en un momento",
      "Precio fijo al mes, sin comisión por pedido",
      "Cada pedido con estado, responsable y hora",
      "Inventario que se descuenta solo con cada pedido",
      "Cero tickets de papel: el ticket llega por correo",
      "1 terminal y hasta 3 usuarios",
    ],
  },
  {
    nombre: "Medio",
    etiqueta: "Pedidos + cocina y barra",
    precio: { mensual: "999", anual: "9,990" },
    descripcion:
      "Para negocios donde un pedido perdido se paga en comida, en espera y en clientes que no vuelven.",
    dispositivos: { iconos: ["tableta", "tableta"], texto: "2 terminales" },
    resumen: [
      "Los pedidos llegan solos a cocina y barra, con su tiempo de preparación",
      "Cada pedido queda registrado: nada de “no sé quién lo pidió”",
      "Terminales y usuarios ilimitados",
      "Soporte directo de la empresa",
    ],
    destacado: false,
    proximamente: true,
    nota: "Por ahora este plan no se puede contratar.",
    incluye: [
      "Todo lo del plan Básico",
      "Los pedidos llegan solos a cocina y barra, con su tiempo de preparación",
      "Se acabaron los pedidos perdidos y las comandas repetidas",
      "Cada pedido queda registrado: nada de “no sé quién lo pidió”",
      "Terminales y usuarios ilimitados",
      "Soporte directo de la empresa",
    ],
  },
  {
    nombre: "Empresarial",
    etiqueta: "Pedidos + cocina + Nebula Pocket",
    precio: { mensual: "1,499", anual: "14,990" },
    descripcion:
      "Para varios locales donde el inventario y la merma cuestan más de lo que parecen.",
    dispositivos: {
      iconos: ["tableta", "tableta", "celular"],
      texto: "2 terminales y un celular",
    },
    resumen: [
      "Nebula Pocket: ventas, cancelaciones, ganancias y gastos en tiempo real",
      "Stock compartido entre sucursales",
      "Historial de pedidos: quién lo tomó y en qué estado está",
      "Asesor dedicado para tu cuenta",
    ],
    destacado: true,
    proximamente: true,
    nota: "Por ahora este plan no se puede contratar.",
    incluye: [
      "Todo lo del plan Medio",
      "Nebula Pocket: ventas, cancelaciones, ganancias y gastos en tiempo real",
      "Stock compartido entre sucursales",
      "Historial de pedidos: quién lo tomó y en qué estado está",
      "Roles, permisos y respaldos automáticos todas las noches",
      "Asesor dedicado para tu cuenta",
    ],
  },
];

// Fase de lanzamiento: {lugares} negocios seleccionados, un año con 15% de
// descuento. El número sale de cobertura.lugares, no se escribe a mano.
export const lanzamiento = {
  eyebrow: "Fase de lanzamiento",
  titulo: "Vamos a elegir {lugares} negocios para arrancar con nosotros.",
  parrafo:
    "Los que entren se llevan un año de Nebula con 15% de descuento. Cuando se acaben, se acaba.",
  cta: "Quiero formar parte",
};

export const galeria = [
  {
    clave: "kikoi",
    nombre: "KiKOI Coffee",
    imagen: kikoi,
    alt: "KiKOI Coffee, cliente de Nebula.",
    pie: "Cambió su operación por completo.",
  },
  { clave: "mostrador", imagen: null, alt: "", nombre: "Únete", pie: "Los negocios que ya cambiaron te esperan." },
  { clave: "cocina", imagen: null, alt: "", nombre: "Tu turno", pie: "Sé el siguiente en transformar su mostrador." },
  { clave: "barra", imagen: null, alt: "", nombre: "El siguiente", pie: "Ningún pedido se pierde entre el mostrador y la cocina." },
  { clave: "almacen", imagen: null, alt: "", nombre: "Espacio para ti", pie: "Aquí va la foto de tu negocio, el día de hoy." },
  { clave: "equipo", imagen: null, alt: "", nombre: "Desde mañana", pie: "Empieza a operar con Nebula cuando quieras." },
];

export const formulario = {
  eyebrow: "Contacto",
  titulo: "Cuéntanos de tu negocio.",
  parrafo:
    "Llena estos datos y te abrimos WhatsApp con el mensaje ya escrito al {numero}. Un asesor te contesta, sin compromiso.",
  cta: "Enviar por WhatsApp",
  tipos: [
    "Cafetería",
    "Restaurante",
    "Bar o cantina",
    "Tienda de autoservicio",
    "Sucrería o panadería",
    "Otro",
  ],
  sucursales: ["1", "De 2 a 5", "Más de 5", "Todavía no lo sé"],
};

export const testimonios = [
  {
    cita:
      "Los pedidos salen mucho más rápido: el equipo ve qué se pidió, en qué estado va y qué falta por preparar. Y como el inventario está siempre al día, sabemos qué comprar antes de que nos falte. Se nos acabaron los “no hay” y las compras de última hora.",
    autor: "KiKOI Coffee",
    negocio: "Cliente Nebula en Yucatán",
    iniciales: "KI",
  },
];
