import Icono from "./Iconos";

// Los iconos van sueltos en la esquina de la tarjeta (sin cuadro de fondo): el
// azul se reserva para texto y acentos. El grupo lleva aria-label porque los
// SVG son decorativos y solos no dicen cuantos dispositivos incluye el plan.
export default function Dispositivos({ dispositivos, className = "" }) {
  if (!dispositivos || !dispositivos.iconos.length) return null;

  return (
    <span
      role="img"
      aria-label={dispositivos.texto}
      title={dispositivos.texto}
      className={`flex items-end gap-1.5 ${className}`}
    >
      {dispositivos.iconos.map((nombre, indice) => (
        <Icono
          key={`${nombre}-${indice}`}
          nombre={nombre}
          className="h-6 w-6 shrink-0 text-white"
        />
      ))}
    </span>
  );
}
