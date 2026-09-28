import Caracteristicas from "../components/Caracteristicas";

// La pagina del sistema mete un segundo video bajo el boton de precios: es la
// misma promesa que la lista de funciones, vista desde el producto.
export default function Sistema() {
  return (
    <Caracteristicas nivel="h1">
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-azul-300">
        Otra perspectiva
      </p>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        className="mt-3 h-auto w-full"
        poster={`${process.env.PUBLIC_URL}/videos/NebulaVideo1-poster.jpg`}
        width="2118"
        height="1284"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Video de Nebula en accion."
      >
        <source
          src={`${process.env.PUBLIC_URL}/videos/NebulaVideo1.mp4`}
          type="video/mp4"
        />
      </video>
    </Caracteristicas>
  );
}
