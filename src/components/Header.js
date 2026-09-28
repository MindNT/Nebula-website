import { useEffect, useState } from "react";
import { Link } from "react-router";

import Icono from "./Iconos";
import Logo from "./Logo";
import { navegacion } from "../utils/contenido";
import { ETIQUETA_PROBAR } from "../utils/contacto";
import Button from "../utils/Button";

export default function Header({ onProbar }) {
  const [abierto, setAbierto] = useState(false);
  const [desplazado, setDesplazado] = useState(false);

  useEffect(() => {
    const alDesplazar = () => setDesplazado(window.scrollY > 8);
    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });
    return () => window.removeEventListener("scroll", alDesplazar);
  }, []);

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  const cerrar = () => setAbierto(false);

  // El boton del header abre el formulario; en movil ademas cierra el menu.
  const probar = () => {
    setAbierto(false);
    onProbar();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        desplazado || abierto
          ? "bg-black/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-10"
      >
        <Link to="/" onClick={cerrar} className="flex items-center">
          <Logo className="h-8 w-auto" prioridad />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navegacion.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="py-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                {item.etiqueta}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button onClick={probar} tamano="sm">
            {ETIQUETA_PROBAR}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setAbierto((valor) => !valor)}
          aria-expanded={abierto}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
        >
          <Icono nombre={abierto ? "cerrar" : "menu"} className="h-5 w-5" />
        </button>
      </nav>

      {abierto && (
        <div className="bg-black/95 px-6 pb-8 pt-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navegacion.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={cerrar}
                  className="block rounded-xl px-3 py-2.5 text-[15px] text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-3">
            <Button onClick={probar} className="w-full">
              {ETIQUETA_PROBAR}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
