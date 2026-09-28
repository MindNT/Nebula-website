import { useCallback, useEffect, useRef, useState } from "react";

import { cobertura, galeria, lanzamiento } from "../utils/contenido";
import { WHATSAPP_ENLACE, WHATSAPP_LANZAMIENTO } from "../utils/contacto";
import Button from "../utils/Button";
import Icono from "./Iconos";

export default function Galeria() {
  const pista = useRef(null);
  const [indice, setIndice] = useState(0);
  const total = galeria.length;

  const irA = useCallback((nuevo) => {
    const pistaEl = pista.current;
    if (!pistaEl) return;
    const hijo = pistaEl.children[nuevo];
    if (!hijo) return;
    pistaEl.scrollTo({
      left: hijo.offsetLeft - pistaEl.offsetLeft,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const pistaEl = pista.current;
    if (!pistaEl) return undefined;

    const alDesplazar = () => {
      const centro = pistaEl.scrollLeft + pistaEl.clientWidth / 2;
      let cercano = 0;
      let menor = Infinity;

      Array.from(pistaEl.children).forEach((hijo, i) => {
        const distancia = Math.abs(
          hijo.offsetLeft + hijo.clientWidth / 2 - centro
        );
        if (distancia < menor) {
          menor = distancia;
          cercano = i;
        }
      });

      setIndice(cercano);
    };

    alDesplazar();
    pistaEl.addEventListener("scroll", alDesplazar, { passive: true });
    return () => pistaEl.removeEventListener("scroll", alDesplazar);
  }, []);

  const anterior = () => irA(Math.max(0, indice - 1));
  const siguiente = () => irA(Math.min(total - 1, indice + 1));

  const flechaBoton =
    "grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-white/40 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/15 disabled:hover:bg-transparent";

  return (
    <section id="clientes" aria-label="Clientes" className="px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl rounded-3xl border border-white/15 px-6 py-9 text-center sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-300">
            {lanzamiento.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-display sm:text-3xl">
            {lanzamiento.titulo.replace("{lugares}", cobertura.lugares)}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-white/55">
            {lanzamiento.parrafo}
          </p>
          <div className="mt-7 flex justify-center">
            <Button href={WHATSAPP_LANZAMIENTO} tamano="lg">
              {lanzamiento.cta}
              <Icono nombre="flecha" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:-mx-10 lg:px-10">
          {galeria.map((foto, i) => (
            <div
              key={foto.clave}
              className="relative aspect-[9/16] w-[68%] shrink-0 snap-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] sm:w-[40%] lg:w-[28%]"
            >
              {foto.imagen ? (
                <img
                  src={foto.imagen}
                  alt={foto.alt}
                  loading={foto.clave === galeria[0].clave ? "eager" : "lazy"}
                  fetchPriority={foto.clave === galeria[0].clave ? "high" : "auto"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <a
                  href={WHATSAPP_ENLACE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full w-full flex-col items-center justify-center px-7 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-azul-300"
                >
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                      {foto.nombre}
                    </span>
                    <span className="mt-2 block text-balance text-[17px] font-semibold leading-snug text-azul-300 transition-colors duration-300 group-hover:text-azul-200">
                      {foto.pie}
                    </span>
                  </span>
                </a>
              )}

              {foto.imagen && foto.pie ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black from-25% via-black/85 via-65% to-transparent px-5 pb-6 pt-24">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    {foto.nombre}
                  </p>
                  <p className="mt-2 text-balance text-[17px] font-semibold leading-snug text-azul-300">
                    {foto.pie}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {galeria.map((foto, i) => (
              <button
                key={foto.clave}
                type="button"
                onClick={() => irA(i)}
                aria-label={`Tarjeta ${i + 1} de ${total}`}
                aria-current={indice === i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  indice === i
                    ? "w-7 bg-azul-500"
                    : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <div className="hidden gap-2 lg:flex">
            <button
              type="button"
              onClick={anterior}
              disabled={indice === 0}
              aria-label="Foto anterior"
              className={flechaBoton}
            >
              <Icono nombre="flecha" className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={siguiente}
              disabled={indice === total - 1}
              aria-label="Foto siguiente"
              className={flechaBoton}
            >
              <Icono nombre="flecha" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
