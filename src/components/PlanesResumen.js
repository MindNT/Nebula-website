import { Link } from "react-router";

import { paquetes, MONEDA } from "../utils/contenido";
import { ETIQUETA_DEMO } from "../utils/contacto";
import Aparecer from "./Aparecer";
import Button from "../utils/Button";
import Dispositivos from "./Dispositivos";
import Icono from "./Iconos";
import Proximamente from "./Proximamente";

// Version corta de los precios para el inicio: nombre, precio y cuatro puntos.
// El detalle completo vive en la pagina /planes (components/Paquetes.js).
export default function PlanesResumen({ onProbar }) {
  return (
    <section aria-label="Planes" className="scroll-mt-20 px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-300">
            Planes
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-display sm:text-4xl">
            Elige por dónde empezar.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/50">
            Los tres planes incluyen precio fijo al mes, sin comisión por pedido.
          </p>
          <Link
            to="/planes"
            className="mt-5 inline-flex items-center gap-1.5 py-1.5 text-[13px] font-semibold text-azul-300 transition-colors hover:text-azul-200"
          >
            Ver el detalle de cada plan
            <Icono nombre="flecha" className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {paquetes.map((paquete, indice) => (
            <Aparecer key={paquete.nombre} retardo={indice * 80} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-2xl p-6 ${
                  paquete.proximamente
                    ? "border border-white/10 bg-white/[0.02] opacity-60"
                    : paquete.destacado
                    ? "border border-white/20"
                    : "border border-white/10 bg-white/[0.03]"
                }`}
              >
                {paquete.proximamente ? <Proximamente className="left-6" /> : null}
                <Dispositivos dispositivos={paquete.dispositivos} className="mb-4" />

                <h3 className="text-[15px] font-semibold">{paquete.nombre}</h3>
                <p className="mt-0.5 text-[12px] font-medium text-azul-300">
                  {paquete.etiqueta}
                </p>

                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-3xl font-semibold tracking-display">
                    {MONEDA}
                    {paquete.precio.mensual}
                  </span>
                  <span className="text-[13px] text-white/55">/mes</span>
                </p>
                <p className="mt-1 text-[11px] text-white/55">
                  Anual: {MONEDA}
                  {paquete.precio.anual}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-2">
                  {paquete.resumen.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[13px] leading-relaxed text-white/65"
                    >
                      <Icono
                        nombre="check"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azul-300"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {paquete.proximamente ? (
                  <p className="mt-6 text-center text-[13px] text-white/50">
                    {paquete.nota}
                  </p>
                ) : (
                  <Button
                    onClick={onProbar}
                    variante={paquete.destacado ? "primario" : "fantasma"}
                    className="mt-6 w-full"
                  >
                    {ETIQUETA_DEMO}
                  </Button>
                )}
              </article>
            </Aparecer>
          ))}
        </div>
      </div>
    </section>
  );
}
