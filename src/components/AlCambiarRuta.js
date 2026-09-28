import { useEffect } from "react";
import { useLocation } from "react-router";

// Al cambiar de ruta sube al inicio, y si la ruta trae ancla (#seccion) se
// desplaza a esa seccion. Los <section> usan scroll-mt-20 para no quedar
// debajo del header fijo.
export default function AlCambiarRuta() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const seccion = document.getElementById(hash.slice(1));
      if (seccion) {
        seccion.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
