import { useEffect, useRef, useState } from "react";

import { caracteristicas } from "../utils/contenido";
import Button from "../utils/Button";
import Icono from "./Iconos";

export default function Caracteristicas({ nivel: Nivel = "h2", children }) {
  const [activo, setActivo] = useState(0);
  const items = useRef([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const observador = new IntersectionObserver(
      (entradas) => {
        const enPantalla = entradas.find((entrada) => entrada.isIntersecting);
        if (enPantalla) setActivo(Number(enPantalla.target.dataset.indice));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    items.current.forEach((nodo) => nodo && observador.observe(nodo));
    return () => observador.disconnect();
  }, []);

  const actual = caracteristicas[activo];

  return (
    <section id="funciones" aria-label="Funcionalidades" className="scroll-mt-20 px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-300">
            Lo que hoy se te pierde
          </p>
          <Nivel className="mt-3 text-3xl font-semibold tracking-display sm:text-4xl">
            Ni un pedido perdido, ni un peso sin explicación.
          </Nivel>
          <p className="mt-4 text-[15px] leading-relaxed text-white/50">
            Las tablets repartidas, el pedido que nadie encuentra, el producto que
            se evapora sin que nadie lo note, las cajas de tickets y las
            comisiones que no te pertenecen. Nebula pone todo eso en una sola
            pantalla y un solo número.
          </p>

          <div className="mt-8 hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 lg:block">
            <p className="text-[13px] text-white/55">Estás viendo</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-azul-500 text-white">
                <Icono nombre={actual.icono} className="h-[18px] w-[18px]" />
              </span>
              <p className="text-[17px] font-semibold tracking-titulo">
                {actual.titulo}
              </p>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-white/55">
              {actual.texto}
            </p>
          </div>

          <Button to="/planes" variante="fantasma" className="mt-6 w-full">
            Ver planes y precios
            <Icono nombre="flecha" className="h-4 w-4" />
          </Button>

          {children}
        </div>

        <ol className="mt-12 flex flex-col lg:mt-0">
          {caracteristicas.map((item, indice) => (
            <li
              key={item.titulo}
              ref={(nodo) => {
                items.current[indice] = nodo;
              }}
              data-indice={indice}
              // El margen negativo nunca puede ser mayor que el padding de la
              // seccion (px-5, lg:px-8): con sm:-mx-6 la pagina se salia 4px.
              className={`relative -mx-5 px-5 py-8 transition-colors duration-500 lg:-mx-6 lg:px-6 ${
                activo === indice ? "bg-white/[0.04]" : "bg-transparent"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1/2 h-10 w-[3px] -translate-y-1/2 rounded-full transition-all duration-500 ${
                  activo === indice
                    ? "bg-azul-500 opacity-100"
                    : "bg-white opacity-0"
                }`}
              />

              <div className="flex items-start gap-4">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl transition-colors duration-500 ${
                    activo === indice
                      ? "bg-azul-500 text-white"
                      : "bg-white/[0.06] text-azul-300"
                  }`}
                >
                  <Icono nombre={item.icono} className="h-[18px] w-[18px]" />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold tracking-titulo">
                    {item.titulo}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/50">
                    {item.texto}
                  </p>
                </div>

                <Icono
                  nombre={item.icono}
                  className="hidden h-12 w-12 shrink-0 text-white/[0.06] sm:block"
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
