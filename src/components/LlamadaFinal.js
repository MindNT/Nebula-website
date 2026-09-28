import Button from "../utils/Button";
import { WHATSAPP_ASESOR, ETIQUETA_ASESOR } from "../utils/contacto";
import Icono from "./Iconos";
import Aparecer from "./Aparecer";

export default function LlamadaFinal() {
  return (
    // `relative isolate` dejan al halo con -z-10 dentro de la seccion: si no, el
    // fondo negro de la raiz lo tapa y el cierre se ve plano.
    <section
      id="asesor"
      aria-label="Hablar con un asesor"
      className="relative isolate scroll-mt-20 px-5 py-24 lg:px-8"
    >
      <Aparecer className="mx-auto max-w-5xl text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-64 max-w-4xl rounded-full bg-azul-500/10 blur-[120px]"
        />
        <h2 className="text-3xl font-semibold tracking-display sm:text-4xl lg:text-5xl">
          ¿Aún tienes dudas?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/50 sm:text-base">
          Cuéntanos qué te falta por aclarar y un asesor de Nebula te responde
          por WhatsApp en menos de 24 horas, sin compromiso.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            href={WHATSAPP_ASESOR}
            tamano="lg"
            className="w-full sm:w-auto"
          >
            <Icono nombre="burbuja" className="h-4 w-4" />
            {ETIQUETA_ASESOR}
          </Button>
          <Button
            href="#como-funciona"
            variante="secundario"
            tamano="lg"
            className="w-full sm:w-auto"
          >
            Ver funcionalidades
          </Button>
        </div>
      </Aparecer>
    </section>
  );
}
