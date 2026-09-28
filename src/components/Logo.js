export default function Logo({
  className = "h-9 w-auto",
  prioridad = false,
  alt = "Nebula",
}) {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/logo.png`}
      alt={alt}
      width="1877"
      height="617"
      className={className}
      loading={prioridad ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
