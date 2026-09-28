import { ETIQUETA_PROXIMAMENTE } from "../utils/contenido";
import Icono from "./Iconos";

// Los planes que todavia no abren llevan este cintillo en el borde de la
// tarjeta, en el mismo lugar que el badge del plan destacado, para que se lea
// de un vistazo que el plan esta pendiente y no disponible.
export default function Proximamente({ className = "" }) {
  return (
    <span
      className={`absolute -top-3.5 left-7 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-tinta-800 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-black/40 ${className}`}
    >
      <Icono nombre="reloj" className="h-3.5 w-3.5" />
      {ETIQUETA_PROXIMAMENTE}
    </span>
  );
}
