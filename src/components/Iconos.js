const trazos = {
  rayo: ["M13 2 4 14h6l-1 8 9-12h-6l1-8Z"],
  caja: ["M21 8 12 3 3 8v8l9 5 9-5V8Z", "M3 8l9 5 9-5", "M12 21v-8"],
  tarjeta: ["M3 6h18v12H3z", "M3 10h18"],
  grafica: ["M3 21h18", "M6 21V11", "M12 21V6", "M18 21v-7"],
  nubeOff: ["M2 2l20 20", "M13 18H7a4 4 0 0 1-.7-7.9", "M10 6a5 5 0 0 1 8.5 3.4", "M15 18a4 4 0 0 0 3-3.9"],
  escudo: ["M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z", "m9 12 2 2 4-4"],
  flecha: ["M5 12h14", "m13 6 6 6-6 6"],
  menu: ["M4 7h16", "M4 12h16", "M4 17h16"],
  cerrar: ["M6 6l12 12", "M18 6 6 18"],
  check: ["m5 13 4 4L19 7"],
  chispa: ["m12 3 2.6 5.6 6.4.8-4.7 4.3 1.3 6.3L12 17l-5.6 3 1.3-6.3L3 9.4l6.4-.8L12 3Z"],
  hoja: ["M20 4c-8 0-13 4-13 10a5 5 0 0 0 5 5c6 0 8-7 8-15Z", "M4 21c1-6 4-10 9-12"],
  capas: ["M12 3 3 7.5 12 12l9-4.5L12 3Z", "M3 12.5 12 17l9-4.5", "M3 16.5 12 21l9-4.5"],
  etiqueta: ["M4 4h7l9 9-7 7-9-9V4Z", "M8 8h.01"],
  burbuja: ["M4 5h16v11H8l-4 4V5Z"],
  personas: ["M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1", "M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M17 11a3 3 0 0 0 0-6", "M21 19v-1a4 4 0 0 0-3-3.9"],
  recibo: ["M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3Z", "M9 8h6", "M9 12h6"],
  tableta: ["M3 5h18v14H3z", "M12 16.4h.01"],
  celular: ["M7 2h10v20H7z", "M10.5 5h3", "M12 18.4h.01"],
  reloj: ["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z", "M12 7.5V12l3 2"],
};

export default function Icono({ nombre, className = "h-5 w-5" }) {
  const paths = trazos[nombre];
  if (!paths) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
