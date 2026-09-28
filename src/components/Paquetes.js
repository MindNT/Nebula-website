import { useState } from "react";

import { paquetes, MONEDA } from "../utils/contenido";
import { ETIQUETA_DEMO } from "../utils/contacto";
import Aparecer from "./Aparecer";
import Button from "../utils/Button";
import Dispositivos from "./Dispositivos";
import Icono from "./Iconos";
import Proximamente from "./Proximamente";

export default function Paquetes({ nivel: Titulo = "h2", onProbar }) {
  const [anual, setAnual] = useState(false);

  return (
    <section id="paquetes" aria-label="Paquetes" className="scroll-mt-20 px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-300">
            Paquetes
          </p>
          <Titulo className="mt-3 text-3xl font-semibold tracking-display sm:text-4xl">
            Mientras más control, menos se te escapa.
          </Titulo>
          <p className="mt-4 text-[15px] leading-relaxed text-white/50">
            Empiezas con los pedidos y subes de nivel cuando tu negocio lo pida.
            Todos los paquetes incluyen precio fijo al mes, sin comisión por
            pedido.
          </p>

          <div
            role="group"
            aria-label="Periodo de facturación"
            className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/15 p-1"
          >
            {[
              { valor: false, texto: "Mensual" },
              { valor: true, texto: "Anual" },
            ].map((opcion) => (
              <button
                key={opcion.texto}
                type="button"
                onClick={() => setAnual(opcion.valor)}
                aria-pressed={anual === opcion.valor}
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                  anual === opcion.valor
                    ? "bg-azul-500 text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {opcion.texto}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {paquetes.map((paquete, indice) => (
            <Aparecer
              key={paquete.nombre}
              retardo={indice * 90}
              className="h-full"
            >
              <article
                className={`relative flex h-full flex-col rounded-3xl p-7 ${
                  paquete.proximamente
                    ? "border border-white/10 bg-white/[0.02] opacity-60"
                    : paquete.destacado
                    ? "border border-white/20"
                    : "border border-white/10 bg-white/[0.03]"
                }`}
              >
                {paquete.proximamente ? <Proximamente /> : null}

                {paquete.destacado && !paquete.proximamente && (
                  <span className="absolute -top-3 left-7 rounded-full bg-azul-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Ecosistema completo
                  </span>
                )}

                <Dispositivos dispositivos={paquete.dispositivos} className="mb-5" />

                <h3 className="text-base font-semibold">{paquete.nombre}</h3>
                <p className="mt-1 text-[13px] font-medium text-azul-300">
                  {paquete.etiqueta}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-white/55">
                  {paquete.descripcion}
                </p>

                <p className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-display">
                    {MONEDA}
                    {anual
                      ? paquete.precio.anual
                      : paquete.precio.mensual}
                  </span>
                  <span className="text-[13px] text-white/55">
                    {anual ? "/año" : "/mes"}
                  </span>
                </p>
                <p className="mt-1 text-[11px] text-white/55">
                  {anual
                    ? "Equivale a 10 meses de pago"
                    : "Facturación mensual, cancela cuando quieras"}
                </p>

                <ul className="mt-7 flex flex-1 flex-col gap-2.5">
                  {paquete.incluye.map((item) => (
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
                  <p className="mt-8 text-center text-[13px] text-white/50">
                    {paquete.nota}
                  </p>
                ) : (
                  <Button
                    onClick={onProbar}
                    variante={paquete.destacado ? "primario" : "fantasma"}
                    className="mt-8 w-full"
                  >
                    {ETIQUETA_DEMO}
                  </Button>
                )}
              </article>
            </Aparecer>
          ))}
        </div>

        <p className="mt-10 text-center text-[13px] text-white/55">
          ¿Tienes varias sucursales? Un asesor prepara la propuesta con el número
          de terminales y el volumen de tu operación.
        </p>
      </div>
    </section>
  );
}
