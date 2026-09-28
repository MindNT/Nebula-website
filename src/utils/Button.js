import { Link } from "react-router";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-colors duration-200 active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-azul-300 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-black " +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100";

const variantes = {
  primario: "bg-azul-500 text-white hover:bg-azul-400",
  secundario: "bg-white text-black hover:bg-azul-200",
  fantasma:
    "border border-white/20 text-white/85 hover:border-white/50 hover:text-white",
};

const tamanos = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

export default function Button({
  variante = "primario",
  tamano = "md",
  href,
  to,
  className = "",
  children,
  ...props
}) {
  const clases = `${base} ${variantes[variante]} ${tamanos[tamano]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={clases} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    const externo = href.startsWith("http");
    return (
      <a
        href={href}
        className={clases}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={clases} {...props}>
      {children}
    </button>
  );
}
