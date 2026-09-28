import { useEffect, useRef, useState } from "react";

import Button from "../utils/Button";
import {
  WHATSAPP_NUMERO_LEGIBLE,
  enlaceWhatsapp,
  mensajeNegocio,
} from "../utils/contacto";
import { formulario } from "../utils/contenido";
import Icono from "./Iconos";

const CAMPO =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder:text-white/50 focus:border-azul-400 focus:outline-none focus:ring-1 focus:ring-azul-400";
// Los selects quitan la flecha del navegador (para que no se vea la del sistema
// sobre fondo oscuro), asi que el desplegable se dibuja aqui, girada hacia abajo.
const SELECT = `${CAMPO} appearance-none pr-10`;
const FLECHA_SELECT =
  "pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/55";
const ETIQUETA = "mb-1.5 block text-[13px] font-medium text-white/70";
const REQUERIDO = (
  <span aria-hidden="true" className="text-azul-300">
    *
  </span>
);

const INICIAL = {
  negocio: "",
  nombre: "",
  tipo: formulario.tipos[0],
  sucursales: formulario.sucursales[0],
  telefono: "",
  necesidad: "",
};

// Modal: solo existe en el DOM cuando alguien pide probarlo. Se cierra con la
// X, con Escape y clic en el fondo, y no deja scrollear la pagina de fondo.
export default function FormularioNegocio({ onCerrar }) {
  const panel = useRef(null);
  const [datos, setDatos] = useState(INICIAL);
  const [error, setError] = useState("");

  useEffect(() => {
    const alPulsar = (evento) => {
      if (evento.key === "Escape") onCerrar();
    };

    document.addEventListener("keydown", alPulsar);
    document.body.style.overflow = "hidden";

    const primerCampo = panel.current && panel.current.querySelector("input");
    if (primerCampo) primerCampo.focus();

    return () => {
      document.removeEventListener("keydown", alPulsar);
      document.body.style.overflow = "";
    };
  }, [onCerrar]);

  const cambiar = (evento) => {
    const { name, value } = evento.target;
    setDatos((actual) => ({ ...actual, [name]: value }));
  };

  const enviar = (evento) => {
    evento.preventDefault();

    if (!datos.negocio.trim() || !datos.nombre.trim()) {
      setError("Necesitamos el nombre de tu negocio y el tuyo.");
      return;
    }
    setError("");

    // El sitio es estatico: no hay backend, asi que armamos el mensaje y lo
    // abrimos en WhatsApp para que el negocio solo le de enviar.
    window.open(
      enlaceWhatsapp(mensajeNegocio(datos)),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar();
      }}
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={formulario.titulo}
        // dvh porque en iOS el 92vh se come la barra del navegador y el boton de
        // enviar queda pegado al borde de la pantalla.
        className="relative max-h-[92vh] max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-white/10 bg-tinta-900 p-6 pb-10 sm:rounded-3xl sm:p-8"
      >
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
        >
          <Icono nombre="cerrar" className="h-4 w-4" />
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-300">
          {formulario.eyebrow}
        </p>
        <h2 className="mt-3 pr-10 text-2xl font-semibold tracking-display sm:text-3xl">
          {formulario.titulo}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-white/50">
          {formulario.parrafo.replace("{numero}", WHATSAPP_NUMERO_LEGIBLE)}
        </p>

        <form onSubmit={enviar} noValidate className="mt-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={ETIQUETA} htmlFor="negocio">
                Nombre del negocio {REQUERIDO}
              </label>
              <input
                id="negocio"
                name="negocio"
                value={datos.negocio}
                onChange={cambiar}
                className={CAMPO}
                placeholder="KiKOI Coffee"
              />
            </div>

            <div>
              <label className={ETIQUETA} htmlFor="nombre">
                Tu nombre {REQUERIDO}
              </label>
              <input
                id="nombre"
                name="nombre"
                value={datos.nombre}
                onChange={cambiar}
                className={CAMPO}
                placeholder="Cómo te llamamos"
              />
            </div>

            <div className="relative">
              <label className={ETIQUETA} htmlFor="tipo">
                Tipo de negocio
              </label>
              <select
                id="tipo"
                name="tipo"
                value={datos.tipo}
                onChange={cambiar}
                className={SELECT}
              >
                {formulario.tipos.map((tipo) => (
                  <option key={tipo} value={tipo} className="bg-tinta-900">
                    {tipo}
                  </option>
                ))}
              </select>
              <Icono nombre="flecha" className={`h-4 w-4 rotate-90 ${FLECHA_SELECT}`} />
            </div>

            <div className="relative">
              <label className={ETIQUETA} htmlFor="sucursales">
                ¿Cuántas sucursales?
              </label>
              <select
                id="sucursales"
                name="sucursales"
                value={datos.sucursales}
                onChange={cambiar}
                className={SELECT}
              >
                {formulario.sucursales.map((cantidad) => (
                  <option
                    key={cantidad}
                    value={cantidad}
                    className="bg-tinta-900"
                  >
                    {cantidad}
                  </option>
                ))}
              </select>
              <Icono nombre="flecha" className={`h-4 w-4 rotate-90 ${FLECHA_SELECT}`} />
            </div>

            <div className="sm:col-span-2">
              <label className={ETIQUETA} htmlFor="telefono">
                Teléfono <span className="text-white/55">(opcional)</span>
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={datos.telefono}
                onChange={cambiar}
                className={CAMPO}
                placeholder="999 177 8325"
              />
            </div>

            <div className="sm:col-span-2">
              <label className={ETIQUETA} htmlFor="necesidad">
                ¿Qué te gustaría resolver primero?{" "}
                <span className="text-white/55">(opcional)</span>
              </label>
              <textarea
                id="necesidad"
                name="necesidad"
                rows={3}
                value={datos.necesidad}
                onChange={cambiar}
                className={`${CAMPO} resize-y`}
                placeholder="Los pedidos se nos pierden entre el mostrador y la cocina"
              />
            </div>
          </div>

          {error ? (
            <p role="alert" className="mt-4 text-[13px] text-rojo-300">
              {error}
            </p>
          ) : null}

          <Button type="submit" tamano="lg" className="mt-6 w-full">
            <Icono nombre="burbuja" className="h-4 w-4" />
            {formulario.cta}
          </Button>

          <p className="mt-3 text-center text-[12px] text-white/55">
            Se abre WhatsApp con tu mensaje listo para enviar.
          </p>
        </form>
      </div>
    </div>
  );
}
