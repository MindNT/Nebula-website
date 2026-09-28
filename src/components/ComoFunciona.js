import { pasos } from "../utils/contenido";
import Button from "../utils/Button";
import Aparecer from "./Aparecer";
import Icono from "./Iconos";

export default function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      aria-label="Cómo funciona"
      className="scroll-mt-20 bg-tinta-800 px-5 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-300">
            Cómo funciona
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-display sm:text-4xl">
            Del catálogo cargado al pedido entregado.
          </h2>
          <p className="mt-4 text-[15px] text-white/50">
            Tres pasos la primera vez. Después, solo operas.
          </p>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-3">
          {pasos.map((paso, indice) => (
            <Aparecer key={paso.numero} retardo={indice * 110}>
              <li className="relative">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-azul-500 text-white">
                    <Icono nombre={paso.icono} className="h-6 w-6" />
                  </span>
                  <span className="text-4xl font-semibold tracking-display text-white/40 sm:text-5xl">
                    {paso.numero}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-titulo">
                  {paso.titulo}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/50">
                  {paso.texto}
                </p>
              </li>
            </Aparecer>
          ))}
        </ol>

        <div className="mt-14 flex justify-center">
          <Button to="/sistema" variante="fantasma" tamano="lg">
            Ver funcionalidades
            <Icono nombre="flecha" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
