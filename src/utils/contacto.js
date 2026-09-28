// Numero de WhatsApp para ventas. REACT_APP_WHATSAPP es el numero local (10
// digitos); el codigo de pais se antepone aparte para armar bien el wa.me.
const numero = process.env.REACT_APP_WHATSAPP || "9991778325";
const pais = process.env.REACT_APP_PAIS || "52";

export const WHATSAPP_NUMERO = numero;

export function enlaceWhatsapp(texto = "") {
  const consulta = texto ? `?text=${encodeURIComponent(texto)}` : "";
  return `https://wa.me/${pais}${numero}${consulta}`;
}

export const WHATSAPP_ENLACE = enlaceWhatsapp(
  "Hola, me gustaría solicitar una demostración de Nebula."
);

// El CTA de "Quiero formar parte" no ofrece Nebula, se ofrece para la fase de
// lanzamiento, asi que lleva su propio mensaje.
export const WHATSAPP_LANZAMIENTO = enlaceWhatsapp(
  "Hola, quiero formar parte de Nebula."
);

// Como se muestra el numero en el texto de la pagina: 9991778325 -> 999 177 8325
export const WHATSAPP_NUMERO_LEGIBLE = numero.replace(
  /(\d{3})(\d{3})(\d{4})/,
  "$1 $2 $3"
);

export const ETIQUETA_DEMO = "Solicitar demostración";
// El cierre ya no ofrece una demo, ofrece hablar con alguien: por eso el CTA
// va directo a WhatsApp y no al formulario.
export const ETIQUETA_ASESOR = "Hablar con un asesor";
export const WHATSAPP_ASESOR = enlaceWhatsapp(
  "Hola, me gustaría hablar con un asesor de Nebula."
);
export const ETIQUETA_PROBAR = "Probar Nebula";

// Arma el mensaje que se abre en WhatsApp con los datos del formulario.
export function mensajeNegocio(datos) {
  const lineas = [
    "Hola, me interesa Nebula.",
    "",
    `Negocio: ${datos.negocio}`,
    `Contacto: ${datos.nombre}`,
    `Tipo de negocio: ${datos.tipo}`,
    `Sucursales: ${datos.sucursales}`,
  ];

  if (datos.telefono) lineas.push(`Teléfono: ${datos.telefono}`);
  if (datos.necesidad) {
    lineas.push("", `Lo que más me gustaría resolver: ${datos.necesidad}`);
  }

  return lineas.join("\n");
}
