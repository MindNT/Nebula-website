import Hero from "../components/Hero";
import Panel from "../components/Panel";
import Galeria from "../components/Galeria";
import PlanesResumen from "../components/PlanesResumen";
import ComoFunciona from "../components/ComoFunciona";
import Testimonios from "../components/Testimonios";
import LlamadaFinal from "../components/LlamadaFinal";

export default function Inicio({ onProbar }) {
  return (
    <>
      <Hero onProbar={onProbar} />
      <Panel />
      <ComoFunciona />
      <Galeria />
      <PlanesResumen onProbar={onProbar} />
      <Testimonios />
      <LlamadaFinal />
    </>
  );
}
