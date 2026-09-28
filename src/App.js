import { lazy, Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router";

import FormularioNegocio from "./components/FormularioNegocio";
import Header from "./components/Header";
import Pie from "./components/Pie";
import AlCambiarRuta from "./components/AlCambiarRuta";
import Inicio from "./pages/Inicio";
import Planes from "./pages/Planes";
import Sistema from "./pages/Sistema";

// La geometria del mapa pesa ~62 kB y solo la necesita /cobertura, asi que se
// carga bajo demanda en vez de en el bundle del inicio.
const Cobertura = lazy(() => import("./pages/Cobertura"));

function App() {
  // El formulario es un modal global: el header lo abre desde cualquier pagina
  // con "Probar Nebula", igual que el hero en el inicio.
  const [formulario, setFormulario] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-black"
      >
        Saltar al contenido
      </a>

      <Header onProbar={() => setFormulario(true)} />
      <AlCambiarRuta />

      <main id="contenido">
        <Suspense fallback={<div aria-hidden="true" className="min-h-screen" />}>
          <Routes>
            <Route
              path="/"
              element={<Inicio onProbar={() => setFormulario(true)} />}
            />
            <Route path="/cobertura" element={<Cobertura onProbar={() => setFormulario(true)} />} />
            <Route
              path="/planes"
              element={<Planes onProbar={() => setFormulario(true)} />}
            />
            <Route path="/sistema" element={<Sistema />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Pie />

      {formulario ? (
        <FormularioNegocio onCerrar={() => setFormulario(false)} />
      ) : null}
    </div>
  );
}

export default App;
