export default function Panel() {
  return (
    <section aria-label="Vista del producto" className="relative px-5 pb-20 lg:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 -z-10 mx-auto h-[420px] max-w-4xl rounded-full bg-azul-500/10 blur-[140px]"
      />

      <div className="mx-auto w-full max-w-7xl">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className="h-auto w-full"
          poster={`${process.env.PUBLIC_URL}/videos/NebulaVideo-poster.jpg`}
          width="2118"
          height="1284"
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
