import { Link } from "react-router";

import Button from "../utils/Button";
import { WHATSAPP_ENLACE, ETIQUETA_PROBAR } from "../utils/contacto";
import Icono from "./Iconos";
import Logo from "./Logo";

export default function Hero({ onProbar }) {
  return (
    // `isolate` crea el contexto de apilamiento de la seccion: sin el, el halo
    // con -z-10 queda detras del fondo negro de la raiz y no se ve nunca.
    <section
      id="inicio"
      aria-label="Inicio"
      className="relative isolate overflow-hidden px-5 pb-8 pt-28 sm:pt-32 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-azul-500/10 blur-[150px]"
      />

      <div className="mx-auto max-w-5xl text-center">
        <Logo className="mx-auto h-11 w-auto sm:h-14" prioridad />

        <Link
          to="/planes"
          className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-white/15 px-3.5 py-1 text-center text-xs text-white/70 transition-colors hover:border-white/40 hover:text-white"
        >
          <span className="rounded-full bg-azul-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            0 comisiones
          </span>
          Precio fijo al mes, sin comisión por pedido
          {/* En 320px la flecha se caia a una tercera linea del cintillo. */}
          <Icono nombre="flecha" className="hidden h-3 w-3 sm:block" />
        </Link>

        <h1 className="mt-6 text-[2rem] font-semibold leading-[1.08] tracking-display sm:text-5xl lg:text-6xl">
          Cada pedido, en su lugar.
          <br />
          <span className="text-azul-300">Cada venta, en su número.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/55 sm:text-lg">
          ¿Se te pierde un pedido entre el mostrador y la cocina? Nebula lo
          sigue de principio a fin y descuenta el inventario solo. Sin comisión
          por pedido.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={onProbar} tamano="lg" className="w-full sm:w-auto">
            {ETIQUETA_PROBAR}
            <Icono nombre="flecha" className="h-4 w-4" />
          </Button>
          <Button
            href={WHATSAPP_ENLACE}
            variante="secundario"
            tamano="lg"
            className="w-full sm:w-auto"
          >
            Contactar
          </Button>
        </div>

        <p className="mt-4 text-[13px] text-white/55">
          Un asesor te responde por WhatsApp · Sin compromiso
        </p>
      </div>
    </section>
  );
}
