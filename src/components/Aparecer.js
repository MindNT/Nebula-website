import { useEffect, useRef, useState } from "react";

// Envoltorio que anima a la entrada. `como` deja que el nodo sea el `li` de una
// lista, para no meter un `div` entre el `ol` y sus items.
export default function Aparecer({
  children,
  retardo = 0,
  className = "",
  como: Componente = "div",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return (
    <Componente
      ref={ref}
      style={{ transitionDelay: `${retardo}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </Componente>
  );
}
