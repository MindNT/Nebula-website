import { cobertura, lanzamiento } from "../utils/contenido";
import { mexicoEstados, MAPA_VIEWBOX } from "../utils/mexicoEstados";
import Button from "../utils/Button";
import Aparecer from "./Aparecer";

const CON_CLIENTES = "#034EA2";
const SIN_CLIENTES = "#0E0E12";
const GRIS_DIVISION = "#3A4152";
const GRIS_BORDE = "#4A5265";

function totalDe(estado) {
  return cobertura.clientes[estado.id] || 0;
}

const conClientes = mexicoEstados
  .filter((estado) => totalDe(estado) > 0)
  .map((estado) => ({ ...estado, total: totalDe(estado) }));

const totalNegocios = conClientes.reduce((suma, estado) => suma + estado.total, 0);

function tamanoNumero(estado) {
  return Math.min(18, Math.max(8, Math.min(estado.ancho, estado.alto) * 0.28));
}

export default function MapaClientes({ nivel: Titulo = "h2", onProbar }) {
  const conClientesTexto = conClientes
    .map((estado) => `${estado.nombre} (${estado.total})`)
    .join(", ");

  return (
    <section
      id="cobertura"
      aria-label="Cobertura"
      className="scroll-mt-20 bg-tinta-900 px-5 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-azul-300">
          {cobertura.eyebrow}
        </p>
        <Titulo className="mt-3 text-3xl font-semibold tracking-display sm:text-4xl">
          {cobertura.titulo}
        </Titulo>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/50">
          {cobertura.parrafo}
        </p>
        <p className="mt-4 text-[15px] font-semibold text-azul-300">
          {lanzamiento.titulo.replace("{lugares}", cobertura.lugares)}
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-4xl justify-center">
        <Button onClick={onProbar} tamano="lg">
          {cobertura.cta}
        </Button>
      </div>

      <Aparecer className="mx-auto mt-10 max-w-4xl">
        <svg
          viewBox={MAPA_VIEWBOX}
          role="img"
          aria-labelledby="titulo-mapa-cobertura"
          className="h-auto w-full"
        >
          <title id="titulo-mapa-cobertura">
            Mapa de México con {totalNegocios} negocio
            {totalNegocios === 1 ? "" : "s"} de Nebula en{" "}
            {conClientes.length === 1 ? "1 estado" : `${conClientes.length} estados`}
            {conClientes.length > 0 ? `: ${conClientesTexto}` : ""}.
          </title>

          <g
            fill="none"
            stroke={GRIS_BORDE}
            strokeWidth="1.6"
            strokeLinejoin="round"
          >
            {mexicoEstados.map((estado) => (
              <path key={estado.id} d={estado.d} />
            ))}
          </g>

          <g stroke={GRIS_DIVISION} strokeWidth="1.6" strokeLinejoin="round">
            {mexicoEstados.map((estado) => {
              const total = totalDe(estado);
              return (
                <path
                  key={estado.id}
                  d={estado.d}
                  fill={total > 0 ? CON_CLIENTES : SIN_CLIENTES}
                >
                  <title>
                    {estado.nombre}
                    {total > 0
                      ? ` · ${total} ${total === 1 ? "negocio" : "negocios"}`
                      : " · sin negocios todavía"}
                  </title>
                </path>
              );
            })}
          </g>

          {/* Los numeros del mapa se dibujan a partir de md: en un celular el
              mapa mide 320px y el digito mas grande queda en 7px, ilegible. Los
              chips de abajo y el titulo del svg ya dan el dato. */}
          <g
            className="hidden md:block"
            fill="#FFFFFF"
            textAnchor="middle"
            dominantBaseline="central"
            fontWeight="400"
          >
            {conClientes.map((estado) => (
              <text
                key={estado.id}
                x={estado.cx}
                y={estado.cy}
                fontSize={tamanoNumero(estado)}
              >
                {estado.total}
              </text>
            ))}
          </g>
        </svg>
      </Aparecer>

      <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-6">
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {conClientes.map((estado) => (
            <li
              key={estado.id}
              className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[13px] text-azul-200"
            >
              {estado.nombre} · {estado.total}
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-white/55">
          <li className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-3 w-3 rounded-[3px] bg-[#034EA2]"
            />
            Con clientes Nebula
          </li>
          <li className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-3 w-3 rounded-[3px] border border-white/25 bg-[#0E0E12]"
            />
            Sin negocios todavía
          </li>
        </ul>
      </div>
    </section>
  );
}
