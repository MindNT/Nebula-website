import { testimonios } from "../utils/contenido";
import Aparecer from "./Aparecer";

export default function Testimonios() {
  return (
    <section
      id="opiniones"
      aria-label="Opiniones"
      className="scroll-mt-20 bg-tinta-800 px-5 py-10 lg:px-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-300">
          Opiniones
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-display sm:text-2xl">
          KiKOI Coffee, después de operar con Nebula.
        </h2>

        <div className="mx-auto mt-6 max-w-2xl">
          {testimonios.map((testimonio, indice) => (
            <Aparecer key={testimonio.autor} retardo={indice * 90}>
              <figure className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left">
                <p className="text-[15px] leading-relaxed text-white/75">
                  “{testimonio.cita}”
                </p>
                <figcaption className="mt-5 flex items-center gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-azul-400 to-azul-700 text-[11px] font-bold text-white">
                    {testimonio.iniciales}
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold">
                      {testimonio.autor}
                    </span>
                    <span className="block text-[13px] text-white/40">
                      {testimonio.negocio}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Aparecer>
          ))}
        </div>
      </div>
    </section>
  );
}
