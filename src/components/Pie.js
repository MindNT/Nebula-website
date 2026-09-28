import { Link } from "react-router";

import Logo from "./Logo";
import { WHATSAPP_ENLACE } from "../utils/contacto";

// En el pie solo van destinos que existen: nada de columnas con links de relleno.
const enlaces = [
  { texto: "Funcionalidades", href: "/sistema" },
  { texto: "Cómo funciona", href: "/#como-funciona" },
  { texto: "Cobertura", href: "/cobertura" },
  { texto: "Paquetes", href: "/planes" },
  { texto: "Contacto", href: WHATSAPP_ENLACE, externo: true },
];

export default function Pie() {
  return (
    <footer className="bg-black px-6 pb-8 pt-14 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center">
              <Logo className="h-7 w-auto" />
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-white/55">
              Pedidos, cocina, barra y las métricas de tu negocio en el celular.
              Sin comisiones por pedido.
            </p>
          </div>

          <nav aria-label="Del pie">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {enlaces.map((enlace) =>
                enlace.externo ? (
                  <li key={enlace.texto}>
                    <a
                      href={enlace.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-1.5 text-[13px] text-white/55 transition-colors hover:text-white"
                    >
                      {enlace.texto}
                    </a>
                  </li>
                ) : (
                  <li key={enlace.texto}>
                    <Link
                      to={enlace.href}
                      className="inline-block py-1.5 text-[13px] text-white/55 transition-colors hover:text-white"
                    >
                      {enlace.texto}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nebula. Todos los derechos reservados.</p>
          <p>
            Mapa de México:{" "}
            <a
              href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/mexico"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/20 transition-colors hover:text-white"
            >
              svg-maps
            </a>{" "}
            (CC BY 4.0)
          </p>
        </div>
      </div>
    </footer>
  );
}
