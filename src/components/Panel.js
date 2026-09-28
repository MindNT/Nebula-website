export default function Panel() {
  return (
    // El halo necesita `isolate` en la seccion: con -z-10 se queda tapado por
    // el fondo negro de la raiz de la app y no se ve nunca.
    <section aria-label="Vista del producto" className="relative isolate px-5 pb-20 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-[420px] max-w-4xl rounded-full bg-azul-500/10 blur-[140px]"
      />

      <div className="mx-auto w-full max-w-7xl">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className="h-auto w-full"
          poster={`${process.env.PUBLIC_URL}/videos/NebulaVideo-poster.jpg`}
          // El alto real del archivo es 1032: con 1284 el navegador reservaba una
          // caja mas alta que el video y la pagina saltaba al cargar.
          width="2118"
          height="1032"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Nebula en acción: la tableta de 13 pulgadas sobre su base metálica negra siguiendo el recorrido de un pedido."
        >
          <source
            src={`${process.env.PUBLIC_URL}/videos/NebulaVideo.mp4`}
            type="video/mp4"
          />
          <source
            src={`${process.env.PUBLIC_URL}/videos/NebulaVideo.mov`}
            type="video/quicktime"
          />
        </video>
      </div>
    </section>
  );
}
