import fs from "fs";
import path from "path";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import App from "./App";
import {
  caracteristicas,
  galeria as galeriaDatos,
  paquetes,
  pasos,
} from "./utils/contenido";
import {
  WHATSAPP_ASESOR,
  WHATSAPP_ENLACE,
  WHATSAPP_LANZAMIENTO,
  enlaceWhatsapp,
  mensajeNegocio,
} from "./utils/contacto";

// App usa <Routes>, asi que cada render necesita un router. La ruta por defecto
// es el inicio; las paginas se prueban pasando la ruta.
const enRuta = (ruta = "/") =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>
  );

// El formulario solo existe despues de pedirlo con un boton.
const abrirFormulario = () => {
  const hero = screen.getByRole("region", { name: "Inicio" });
  fireEvent.click(within(hero).getByRole("button", { name: /probar nebula/i }));
  return screen.getByRole("dialog", { name: /cuéntanos de tu negocio/i });
};

const botonProbar = (contenedor) =>
  within(contenedor).getByRole("button", { name: /probar nebula/i });

test("muestra el mensaje principal del producto", () => {
  enRuta();
  const titulo = screen.getByRole("heading", { level: 1 });
  expect(titulo).toHaveTextContent(/cada pedido, en su lugar/i);
});

test("el menú lleva solo a las secciones que tienen pagina propia", () => {
  enRuta();
  const menu = screen.getByRole("navigation", { name: /principal/i });
  const items = within(menu).getAllByRole("listitem");
  expect(items.map((item) => item.textContent)).toEqual([
    "Funcionalidades",
    "Cobertura",
    "Paquetes",
  ]);
});

test("la galería de clientes abre con el caso de Kikoi y su pie de foto", () => {
  enRuta();
  const galeria = screen.getByRole("region", { name: "Clientes" });
  const puntos = within(galeria).getAllByRole("button", {
    name: /tarjeta \d de 6/i,
  });
  expect(puntos).toHaveLength(6);

  const imagen = within(galeria).getByAltText(/kikoi/i);
  expect(imagen).toHaveAttribute("loading", "eager");

  const pie = within(galeria).getByText(/cambió su operación por completo/i);
  expect(pie).toHaveClass("text-azul-300");
  expect(pie.previousElementSibling).toHaveTextContent(/kikoi/i);
});

test("invita a los negocios sin foto, cada uno con un mensaje distinto", () => {
  enRuta();
  const seccion = screen.getByRole("region", { name: "Clientes" });
  const sinFoto = galeriaDatos.filter((entrada) => !entrada.imagen);
  const invitaciones = sinFoto.map((entrada) =>
    within(seccion).getByText(entrada.pie).closest("a")
  );

  expect(invitaciones).toHaveLength(5);
  expect(new Set(invitaciones.map((invitacion) => invitacion.textContent)).size).toBe(5);

  invitaciones.forEach((invitacion) => {
    expect(invitacion).toHaveAttribute("href", expect.stringContaining("wa.me"));
    expect(invitacion).toHaveAttribute("target", "_blank");
  });

  expect(seccion).toHaveTextContent(/los negocios que ya cambiaron te esperan/i);
  expect(seccion).toHaveTextContent(/sé el siguiente en transformar su mostrador/i);
});

test("la galeria ofrece la fase de lanzamiento: 25 negocios, un año al 15%", () => {
  enRuta();
  const galeria = screen.getByRole("region", { name: "Clientes" });
  expect(within(galeria).getByText(/fase de lanzamiento/i)).not.toBeNull();
  expect(
    within(galeria).getByText(/vamos a elegir 25 negocios/i)
  ).not.toBeNull();
  expect(within(galeria).getByText(/15%/)).not.toBeNull();
  const cta = within(galeria).getByRole("link", { name: /quiero formar parte/i });
  expect(decodeURIComponent(cta.getAttribute("href"))).toBe(
    "https://wa.me/529991778325?text=Hola, quiero formar parte de Nebula."
  );
});

test("los testimonios son solo la opinión de Kikoi, en primera persona", () => {
  enRuta();
  const seccion = screen.getByRole("region", { name: "Opiniones" });
  const citas = within(seccion).getAllByRole("figure");
  expect(citas).toHaveLength(1);
  expect(seccion).toHaveTextContent(/sabemos qué comprar antes de que nos falte/i);
  expect(seccion).toHaveTextContent(/kikoi/i);
});

test("muestra el video del producto en la vista previa", () => {
  enRuta();
  const seccion = screen.getByRole("region", { name: /vista del producto/i });
  const video = within(seccion).getByLabelText(/en acción/i);
  const fuentes = Array.from(video.querySelectorAll("source")).map((fuente) =>
    fuente.getAttribute("src")
  );

  expect(fuentes).toEqual([
    "/videos/NebulaVideo.mp4",
    "/videos/NebulaVideo.mov",
  ]);
  expect(video).toHaveAttribute("poster", "/videos/NebulaVideo-poster.jpg");
  expect(video).toHaveAttribute("width", "2118");
  // El archivo real es 2118x1032: con 1284 el navegador reservaba de mas.
  expect(video).toHaveAttribute("height", "1032");
  expect(video).toHaveAttribute("autoplay");
  expect(video).toHaveAttribute("loop");
  expect(video).toHaveAttribute("playsinline");
  expect(video).toHaveAttribute("preload", "metadata");
});

test("los posters de los videos existen en public", () => {
  enRuta("/sistema");
  const poster = screen
    .getByLabelText(/video de nebula en accion/i)
    .getAttribute("poster");
  expect(poster).toBe("/videos/NebulaVideo1-poster.jpg");

  for (const archivo of [
    "videos/NebulaVideo-poster.jpg",
    "videos/NebulaVideo1-poster.jpg",
  ]) {
    expect(fs.existsSync(path.join(__dirname, "..", "public", archivo))).toBe(
      true
    );
  }
});

test("el mapa marca en azul los estados con clientes y numera cu\u00e1ntos hay", async () => {
  enRuta("/cobertura");
  const seccion = await screen.findByRole("region", { name: "Cobertura" });

  const mapa = within(seccion).getByRole("img");
  const titulo = mapa.getAttribute("aria-labelledby");
  expect(document.getElementById(titulo).textContent).toMatch(
    /1 negocio de Nebula en 1 estado: Yucat\u00e1n \(1\)/i
  );

  const enAzul = Array.from(
    seccion.querySelectorAll('g[stroke="#3A4152"] path[fill]')
  ).filter((estado) => estado.getAttribute("fill") === "#034EA2");
  expect(enAzul).toHaveLength(1);
  // el estado con clientes va en azul solido, no en degradado
  expect(seccion.querySelector("linearGradient")).toBeNull();
  expect(enAzul[0].querySelector("title").textContent).toMatch(
    /Yucat\u00e1n \u00b7 1 negocio/i
  );

  const numero = Array.from(mapa.querySelectorAll("text")).map((t) => t.textContent);
  expect(numero).toEqual(["1"]);

  const dentroDeYucatan = mapa.querySelector('text[x="737.2"][y="334"]');
  expect(dentroDeYucatan).not.toBeNull();
  expect(dentroDeYucatan).toHaveTextContent("1");
});

test("ofrece la campana vigente: 25 negocios con un año al 15%", async () => {
  enRuta("/cobertura");
  const seccion = await screen.findByRole("region", { name: "Cobertura" });
  expect(seccion).toHaveTextContent(
    /vamos a elegir 25 negocios para arrancar con nosotros/i
  );
  expect(seccion).toHaveTextContent(/ya somos parte de los negocios que se est\u00e1n cambiando/i);
  const cta = within(seccion).getByRole("button", { name: /quiero formar parte/i });
  // el boton se ofrece antes de ver el mapa
  const mapa = within(seccion).getByRole("img");
  expect(cta.compareDocumentPosition(mapa) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

  // el objetivo es capturar el negocio: abre el formulario
  fireEvent.click(cta);
  expect(screen.getByRole("dialog", { name: /cuéntanos de tu negocio/i })).not.toBeNull();
});

test("el mapa tiene las 32 entidades federativas delineadas en gris", async () => {
  enRuta("/cobertura");
  const seccion = await screen.findByRole("region", { name: "Cobertura" });
  const delineados = seccion.querySelectorAll('g[stroke="#3A4152"] path');
  expect(delineados).toHaveLength(32);
  const pintados = seccion.querySelectorAll('g[stroke="#3A4152"] path[fill]');
  expect(pintados).toHaveLength(32);
});

test("ordena las secciones de la promesa al cierre", () => {
  enRuta();
  const orden = Array.from(
    document.querySelectorAll("main section")
  ).map((seccion) => seccion.getAttribute("aria-label"));

  expect(orden).toEqual([
    "Inicio",
    "Vista del producto",
    "Cómo funciona",
    "Clientes",
    "Planes",
    "Opiniones",
    "Hablar con un asesor",
  ]);
});

test("el CTA de los planes del inicio abre el formulario", () => {
  enRuta();
  const resumen = screen.getByRole("region", { name: "Planes" });
  const ctas = within(resumen).getAllByRole("button", {
    name: /solicitar demostración/i,
  });
  // solo el plan basico esta abierto; los otros avisan que llegan pronto
  expect(ctas).toHaveLength(1);

  fireEvent.click(ctas[0]);
  expect(screen.getByRole("dialog", { name: /cuéntanos de tu negocio/i })).not.toBeNull();
});

test("el CTA de cada plan en /planes tambien abre el formulario", () => {
  enRuta("/planes");
  const seccion = screen.getByRole("region", { name: "Paquetes" });
  const ctas = within(seccion).getAllByRole("button", {
    name: /solicitar demostración/i,
  });
  expect(ctas).toHaveLength(1);

  fireEvent.click(ctas[0]);
  expect(screen.getByRole("dialog", { name: /cuéntanos de tu negocio/i })).not.toBeNull();
});

test("el cierre ofrece hablar con un asesor y si manda a WhatsApp", () => {
  enRuta();
  const cierre = screen.getByRole("region", { name: /hablar con un asesor/i });
  expect(cierre).toHaveTextContent(/aún tienes dudas/i);
  expect(cierre).toHaveTextContent(/un asesor de Nebula te responde/i);

  const cta = within(cierre).getByRole("link", { name: /hablar con un asesor/i });
  expect(cta).toHaveAttribute("href", WHATSAPP_ASESOR);
  expect(decodeURIComponent(cta.getAttribute("href"))).toContain(
    "me gustaría hablar con un asesor de Nebula"
  );
  // este si es directo a WhatsApp, no pasa por el formulario
  expect(screen.queryByRole("dialog")).toBeNull();

  // la via secundaria son las funcionalidades, no un "como funciona"
  const secundaria = within(cierre).getByRole("link", {
    name: /ver funcionalidades/i,
  });
  expect(secundaria).toHaveAttribute("href", "#como-funciona");
  expect(within(cierre).queryByRole("link", { name: /cómo funciona/i })).toBeNull();
});

test("no promete operar sin internet, porque Nebula es online", () => {
  enRuta();
  expect(document.body.textContent).not.toMatch(
    /sin internet|se corte internet|sin conexión/i
  );
});

test("no promete cobrar ni procesar pagos, porque Nebula no cobra", () => {
  enRuta();
  expect(document.body.textContent).not.toMatch(
    /cobra en segundos|atajos de teclado|quién cobró|corte de caja|punto de venta/i
  );
});

test("el inicio muestra los precios en version compacta, no la completa", () => {
  enRuta();
  const resumen = screen.getByRole("region", { name: "Planes" });
  expect(within(resumen).getByText(/elige por d\u00f3nde empezar/i)).not.toBeNull();
  expect(within(resumen).getByText(/ver el detalle de cada plan/i)).not.toBeNull();
  for (const [nombre, precio] of [
    ["B\u00e1sico", "599"],
    ["Medio", "999"],
    ["Empresarial", "1,499"],
  ]) {
    const tarjeta = within(resumen).getByRole("heading", { level: 3, name: nombre });
    expect(tarjeta.closest("article")).toHaveTextContent(precio);
  }

  // la version con el toggle mensual/anual y los 6 puntos vive en /planes
  expect(screen.queryByRole("region", { name: "Paquetes" })).toBeNull();
  expect(screen.queryByRole("group", { name: /periodo/i })).toBeNull();
});

test("los pasos siguen en el inicio, con su icono, y llevan a las funcionalidades", () => {
  enRuta();
  const seccion = screen.getByRole("region", { name: "Cómo funciona" });
  expect(within(seccion).getAllByRole("listitem")).toHaveLength(3);
  expect(
    within(seccion).getByRole("link", { name: /ver funcionalidades/i })
  ).toHaveAttribute("href", "/sistema");

  // cada paso se anuncia con un icono, no solo con el numero
  for (const paso of pasos) {
    expect(paso.icono).toBeTruthy();
    const item = within(seccion).getByText(paso.titulo).closest("li");
    expect(item.querySelector("svg")).not.toBeNull();
    expect(item).toHaveTextContent(paso.numero);
  }
});

test("las funciones del sistema son una pagina aparte", () => {
  enRuta("/sistema");
  const seccion = screen.getByRole("region", { name: "Funcionalidades" });
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    /ni un pedido perdido, ni un peso sin explicación/i
  );
  expect(within(seccion).getByText(/lo que hoy se te pierde/i)).not.toBeNull();
  expect(within(seccion).getAllByRole("listitem")).toHaveLength(
    caracteristicas.length
  );
  expect(
    within(seccion).getByRole("link", { name: /ver planes y precios/i })
  ).toHaveAttribute("href", "/planes");
});

test("la pagina de funcionalidades suma un segundo video del producto", () => {
  enRuta("/sistema");
  const seccion = screen.getByRole("region", { name: "Funcionalidades" });
  const video = within(seccion).getByLabelText(/video de nebula en accion/i);
  expect(video.tagName).toBe("VIDEO");
  expect(video).toHaveAttribute("preload", "metadata");
  expect(video).toHaveAttribute("playsinline");
  expect(video.querySelector("source")).toHaveAttribute(
    "src",
    expect.stringContaining("NebulaVideo1.mp4")
  );
  // el boton de precios va antes que el video
  const boton = within(seccion).getByRole("link", { name: /ver planes y precios/i });
  expect(boton.compareDocumentPosition(video) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});

test("el mapa sigue siendo una pagina aparte, no esta en el inicio", () => {
  enRuta();
  expect(screen.queryByRole("region", { name: "Cobertura" })).toBeNull();
  expect(screen.queryByRole("region", { name: "Opiniones" })).not.toBeNull();
});

test("el resumen compacto de precios no promete nada que el plan completo no tenga", () => {
  for (const paquete of paquetes) {
    for (const item of paquete.resumen) {
      expect(paquetes.find((p) => p.nombre === paquete.nombre).incluye).toContain(
        item
      );
    }
  }
});

test("la version compacta muestra el resumen de cada plan", () => {
  enRuta();
  const resumen = screen.getByRole("region", { name: "Planes" });
  for (const paquete of paquetes) {
    const tarjeta = within(resumen)
      .getByRole("heading", { level: 3, name: paquete.nombre })
      .closest("article");
    for (const item of paquete.resumen) {
      expect(within(tarjeta).getByText(item)).not.toBeNull();
    }
  }
});

test("la pagina de planes abre con su propio titulo", () => {
  enRuta("/planes");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    /mientras m\u00e1s control/i
  );
  expect(screen.getByRole("region", { name: "Paquetes" })).not.toBeNull();
  expect(screen.queryByRole("region", { name: "Cobertura" })).toBeNull();
});

test("la pagina de cobertura abre con su propio titulo", async () => {
  enRuta("/cobertura");
  expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent(
    /ya somos parte de los negocios/i
  );
  const seccion = screen.getByRole("region", { name: "Cobertura" });
  expect(within(seccion).getByRole("img")).not.toBeNull();
  expect(screen.queryByRole("region", { name: "Paquetes" })).toBeNull();
});

test("una ruta desconocida manda al inicio", () => {
  enRuta("/no-existe");
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    /cada pedido, en su lugar/i
  );
});

test("el menu apunta a las paginas de precios y cobertura", () => {
  enRuta();
  const menu = screen.getByRole("navigation", { name: /principal/i });
  const destinos = within(menu)
    .getAllByRole("link")
    .map((enlace) => enlace.getAttribute("href"));
  expect(destinos).toEqual(
    expect.arrayContaining(["/planes", "/cobertura", "/sistema"])
  );
});

test("ofrece los tres paquetes del ecosistema con sus precios", () => {
  enRuta("/planes");
  const seccion = screen.getByRole("region", { name: "Paquetes" });
  const tarjetas = within(seccion).getAllByRole("article");
  expect(tarjetas).toHaveLength(3);

  const esperado = [
    [/Básico/, /599/],
    [/Medio/, /999/],
    [/Empresarial/, /1,499/],
  ];

  tarjetas.forEach((tarjeta, indice) => {
    esperado[indice].forEach((patron) => {
      expect(tarjeta).toHaveTextContent(patron);
    });
  });
});

test("los planes que aun no abren salen apagados y sin CTA", () => {
  ["/", "/planes"].forEach((ruta) => {
    enRuta(ruta);
    const seccion = screen.getByRole("region", {
      name: ruta === "/" ? "Planes" : "Paquetes",
    });

    paquetes.filter((paquete) => paquete.proximamente).forEach((paquete) => {
      const tarjeta = within(seccion)
        .getAllByRole("article")
        .find((art) => within(art).queryByText(paquete.nombre));

      expect(tarjeta).toHaveTextContent(/próximamente/i);
      expect(tarjeta).toHaveTextContent(paquete.nota);
      expect(tarjeta).toHaveClass("opacity-60");
      expect(
        within(tarjeta).queryByRole("button", { name: /solicitar demostración/i })
      ).toBeNull();
      // el cintillo vive en el borde de la tarjeta, no dentro del flujo
      const cintillo = within(tarjeta).getByText(/próximamente/i);
      expect(cintillo).toHaveClass("absolute");
    });

    const abiertos = paquetes.filter((paquete) => !paquete.proximamente);
    abiertos.forEach((paquete) => {
      const tarjeta = within(seccion)
        .getAllByRole("article")
        .find((art) => within(art).queryByText(paquete.nombre));
      expect(tarjeta).not.toHaveClass("opacity-60");
    });

    if (ruta === "/") cleanup();
  });
});

test("cada plan dibuja los dispositivos que incluye, sin cuadro de fondo", () => {
  ["/", "/planes"].forEach((ruta) => {
    enRuta(ruta);
    const seccion = screen.getByRole("region", {
      name: ruta === "/" ? "Planes" : "Paquetes",
    });

    paquetes.forEach((paquete) => {
      const tarjeta = within(seccion)
        .getAllByRole("article")
        .find((art) => within(art).queryByText(paquete.nombre));
      const grupo = within(tarjeta).getByRole("img", {
        name: paquete.dispositivos.texto,
      });

      expect(grupo.querySelectorAll("svg")).toHaveLength(
        paquete.dispositivos.iconos.length
      );
      grupo.querySelectorAll("svg").forEach((icono) => {
        expect(icono).toHaveClass("text-white");
      });
      // los iconos van sueltos, sin el cuadro azul de los demas bloques
      expect(grupo).not.toHaveClass("bg-azul-500");
    });

    if (ruta === "/") cleanup();
  });
});

test("Probar Nebula abre el formulario y Contactar manda a WhatsApp", () => {
  enRuta();
  // el formulario no esta en la pagina hasta que lo piden
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(document.querySelector("form")).toBeNull();

  fireEvent.click(botonProbar(screen.getByRole("region", { name: "Inicio" })));

  const dialogo = screen.getByRole("dialog", { name: /cuéntanos de tu negocio/i });
  expect(dialogo).toHaveAttribute("aria-modal", "true");
  for (const etiqueta of [
    /nombre del negocio/i,
    /tu nombre/i,
    /tipo de negocio/i,
    /sucursales/i,
    /teléfono/i,
    /resolver primero/i,
  ]) {
    expect(within(dialogo).getByLabelText(etiqueta)).not.toBeNull();
  }
  expect(
    within(dialogo).getByRole("button", { name: /enviar por whatsapp/i })
  ).not.toBeNull();

  expect(screen.getByRole("link", { name: /contactar/i })).toHaveAttribute(
    "href",
    expect.stringContaining("wa.me/529991778325")
  );
});

test("el boton Probar Nebula del header abre el formulario desde cualquier pagina", () => {
  enRuta("/planes");
  expect(screen.queryByRole("dialog")).toBeNull();

  const menu = screen.getByRole("navigation", { name: /principal/i });
  fireEvent.click(botonProbar(menu));

  expect(screen.getByRole("dialog", { name: /cuéntanos de tu negocio/i })).not.toBeNull();
});

test("el formulario se cierra con la X, con Escape y con el fondo", () => {
  enRuta();
  let dialogo = abrirFormulario();

  fireEvent.click(within(dialogo).getByRole("button", { name: /cerrar/i }));
  expect(screen.queryByRole("dialog")).toBeNull();

  dialogo = abrirFormulario();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByRole("dialog")).toBeNull();

  dialogo = abrirFormulario();
  fireEvent.click(dialogo.parentElement);
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(document.body.style.overflow).toBe("");
});

test("el CTA de la galeria manda el mensaje de la fase de lanzamiento", () => {
  enRuta();
  const seccion = screen.getByRole("region", { name: "Clientes" });
  const cta = within(seccion).getByRole("link", { name: /quiero formar parte/i });
  expect(cta.getAttribute("href")).toBe(WHATSAPP_LANZAMIENTO);
  expect(cta).toHaveAttribute("target", "_blank");
});

test("el formulario avisa si faltan los datos obligatorios y no abre WhatsApp", () => {
  const abrir = jest.spyOn(window, "open").mockImplementation(() => null);
  enRuta();
  const seccion = abrirFormulario();
  fireEvent.click(within(seccion).getByRole("button", { name: /enviar por whatsapp/i }));
  expect(within(seccion).getByRole("alert")).toHaveTextContent(/nombre de tu negocio/i);
  expect(abrir).not.toHaveBeenCalled();
  abrir.mockRestore();
});

test("el formulario arma el mensaje con los datos y lo manda al numero de ventas", () => {
  const abrir = jest.spyOn(window, "open").mockImplementation(() => null);
  enRuta();
  const seccion = abrirFormulario();
  fireEvent.change(within(seccion).getByLabelText(/nombre del negocio/i), {
    target: { value: "KiKOI Coffee" },
  });
  fireEvent.change(within(seccion).getByLabelText(/tu nombre/i), {
    target: { value: "Ana" },
  });
  fireEvent.change(within(seccion).getByLabelText(/tipo de negocio/i), {
    target: { value: "Cafetería" },
  });
  fireEvent.change(within(seccion).getByLabelText(/sucursales/i), {
    target: { value: "De 2 a 5" },
  });
  fireEvent.click(within(seccion).getByRole("button", { name: /enviar por whatsapp/i }));

  const [url] = abrir.mock.calls[0];
  expect(url).toBe(
    enlaceWhatsapp(
      mensajeNegocio({
        negocio: "KiKOI Coffee",
        nombre: "Ana",
        tipo: "Cafetería",
        sucursales: "De 2 a 5",
        telefono: "",
        necesidad: "",
      })
    )
  );
  const mensaje = decodeURIComponent(url.split("text=")[1]);
  expect(mensaje).toContain("KiKOI Coffee");
  expect(mensaje).toContain("Ana");
  expect(mensaje).toContain("Cafetería");
  expect(mensaje).toContain("De 2 a 5");
  abrir.mockRestore();
});

test("todos los enlaces de WhatsApp van al mismo numero", () => {
  for (const ruta of ["/", "/planes", "/sistema", "/cobertura"]) {
    const { unmount } = enRuta(ruta);
    const enlaces = Array.from(
      document.querySelectorAll('a[href^="https://wa.me"]')
    );
    expect(enlaces.length).toBeGreaterThan(0);
    for (const enlace of enlaces) {
      expect(enlace.getAttribute("href")).toContain("wa.me/529991778325");
    }
    unmount();
  }
  expect(WHATSAPP_ENLACE).toContain("wa.me/529991778325");
});

test("el mes gratis ya no se ofrece en ninguna parte del sitio", async () => {
  for (const ruta of ["/", "/planes", "/sistema", "/cobertura"]) {
    const { unmount } = enRuta(ruta);
    if (ruta === "/cobertura") {
      await screen.findByRole("region", { name: "Cobertura" });
    }
    expect(document.body.textContent).not.toMatch(/mes gratis/i);
    unmount();
  }

  // El texto renderizado no basta: un toggle lo esconderia hasta pulsarlo, asi
  // que tambien se busca la palabra en el codigo de los componentes.
  const fuentes = fs
    .readdirSync(path.join(__dirname, "components"))
    .map((archivo) => path.join(__dirname, "components", archivo))
    .concat(fs.readdirSync(path.join(__dirname, "pages")).map((archivo) => path.join(__dirname, "pages", archivo)))
    .concat([path.join(__dirname, "utils", "contenido.js")]);

  for (const archivo of fuentes) {
    expect(fs.readFileSync(archivo, "utf8")).not.toMatch(/mes\s+gratis/i);
  }
});

test("el texto chico nunca baja de la mitad de blanco", async () => {
  // Contra un fondo negro, white/30 queda en 2.5:1 y white/45 en 4.4:1: los dos
  // fallan el contraste minimo de WCAG AA para texto normal. Los unicos lugares
  // donde se acepta mas apagado son los numeros gigantes de los pasos.
  const apagados = [];
  const esTextoGrande = (clases) =>
    /text-\[(1[89]|[2-9]\d)px\]|text-(xl|[2-9]xl)\b/.test(clases);

  for (const ruta of ["/", "/planes", "/sistema", "/cobertura"]) {
    const { unmount } = enRuta(ruta);
    if (ruta === "/cobertura") {
      await screen.findByRole("region", { name: "Cobertura" });
    }

    document.querySelectorAll('[class*="text-white/"]').forEach((el) => {
      const clases = el.getAttribute("class") || "";
      const opacidad = Number((clases.match(/text-white\/(\d+)/) || [])[1]);
      if (opacidad && opacidad <= 45 && !esTextoGrande(clases)) {
        apagados.push(
          `${ruta}: ${clases} -> "${el.textContent.trim().slice(0, 30)}"`
        );
      }
    });
    unmount();
  }

  expect(apagados).toEqual([]);
});

test("los halos azules se ven: su seccion aísla el contexto de apilamiento", async () => {
  // Con -z-10 y sin `isolate`, el halo queda detras del fondo negro de la raiz
  // de la app y nunca se pinta, por mas azul que tenga el elemento.
  for (const ruta of ["/", "/planes", "/sistema", "/cobertura"]) {
    const { unmount } = enRuta(ruta);
    if (ruta === "/cobertura") {
      await screen.findByRole("region", { name: "Cobertura" });
    }

    document.querySelectorAll("section").forEach((seccion) => {
      const halos = seccion.querySelectorAll(".absolute.-z-10");
      if (halos.length === 0) return;
      const clases = seccion.getAttribute("class") || "";
      expect(clases).toMatch(/isolate/);
    });
    unmount();
  }
});

test("el pie se queda solo con destinos que existen", () => {
  enRuta();
  const pie = screen.getByRole("contentinfo");
  const destinos = Array.from(
    within(pie).getByRole("navigation", { name: /del pie/i }).querySelectorAll("a")
  ).map((enlace) => enlace.textContent);
  expect(destinos).toEqual([
    "Funcionalidades",
    "Cómo funciona",
    "Cobertura",
    "Paquetes",
    "Contacto",
  ]);

  // el mapa es CC BY 4.0: la atribucion no es opcional
  expect(pie).toHaveTextContent(/cc by 4\.0/i);
  expect(pie.querySelector('a[href*="svg-maps"]')).not.toBeNull();
});

// public/index.html y public/manifest.json no los toca React, asi que se leen
// del disco: el SEO se rompe en silencio si alguien edita una meta a mano.
const leerPublico = (archivo) =>
  fs.readFileSync(path.join(__dirname, "..", "public", archivo), "utf8");

// Las metas de description y og:description van en varias lineas, asi que se
// busca el tag completo y de ahi se saca el content. `atributo` entra completo,
// por ejemplo 'name="description"'.
const metaDe = (html, atributo) => {
  const tag = html.match(new RegExp(`<meta[^>]*${atributo}[^>]*>`));
  if (!tag) return null;
  const contenido = tag[0].match(/content="([^"]*)"/);
  return contenido ? contenido[1] : null;
};

test("el html publica dice Republica Mexicana y trae datos estructurados", () => {
  const html = leerPublico("index.html");

  expect(html).toContain('lang="es-MX"');
  expect(html).toMatch(/<title>[^<]*restaurantes en México<\/title>/);
  expect(metaDe(html, 'name="description"')).toMatch(/toda la República/);
  expect(metaDe(html, 'property="og:locale"')).toBe("es_MX");
  expect(metaDe(html, 'property="og:title"')).not.toBeNull();
  expect(metaDe(html, 'property="og:description"')).not.toBeNull();
  expect(metaDe(html, 'name="twitter:card"')).not.toBeNull();
  // sin esto Google no indexa la pagina
  expect(metaDe(html, 'name="robots"')).toMatch(/index, follow/);
});

test("los datos estructurados declaran cobertura nacional", () => {
  const html = leerPublico("index.html");
  const bloque = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  );
  expect(bloque).not.toBeNull();

  const { "@graph": grafica } = JSON.parse(bloque[1]);
  const donde = JSON.stringify(grafica);
  expect(donde).toMatch(/"México"/);
  expect(donde).toMatch(/"es-MX"/);
  grafica.forEach((nodo) => {
    expect(nodo).toHaveProperty("@type");
  });
});

test("el precio del dato estructurado es el del plan que ya esta abierto", () => {
  const html = leerPublico("index.html");
  const bloque = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  );
  const { "@graph": grafica } = JSON.parse(bloque[1]);
  const app = grafica.find((nodo) => nodo["@type"] === "SoftwareApplication");

  const abiertos = paquetes.filter((paquete) => !paquete.proximamente);
  expect(app.offers).toHaveLength(abiertos.length);
  expect(app.offers.map((oferta) => oferta.price)).toEqual(
    abiertos.map((paquete) => paquete.precio.mensual)
  );
  expect(app.offers[0].priceCurrency).toBe("MXN");
});

test("el manifest ya no es el de create react app y usa el favicon", () => {
  const manifest = JSON.parse(leerPublico("manifest.json"));

  expect(manifest.name).not.toMatch(/react app/i);
  expect(manifest.short_name).toBe("Nebula");
  expect(manifest.lang).toBe("es-MX");
  expect(manifest.icons.some((icono) => icono.src === "favicon.png")).toBe(true);
  expect(manifest.icons.some((icono) => icono.src === "favicon.ico")).toBe(true);
  // el splash blanco antes de cargar la app se ve como un flash
  expect(manifest.background_color).toBe("#000000");

  const html = leerPublico("index.html");
  expect(html).toContain('rel="apple-touch-icon" href="%PUBLIC_URL%/favicon.png"');
});

test("github pages devuelve la ruta pedida: 404.html y el html comparten llave", () => {
  const html = leerPublico("index.html");
  const error = leerPublico("404.html");

  // 404.html guarda la URL y se va a la raiz; index.html la devuelve antes de
  // que arranque React. Si cambia una llave y no la otra, /planes abre en /.
  const llave = error.match(/sessionStorage\.setItem\("([^"]+)"/)[1];
  expect(html).toContain(`sessionStorage.getItem("${llave}")`);
  expect(html).toContain("history.replaceState");
  expect(error).toContain('window.location.replace("/")');
  // el sitio vive en la raiz del dominio, por eso la redireccion es absoluta
  expect(leerPublico("robots.txt")).toMatch(/Allow: \//);
});

test("las rutas de assets son relativas, para que el sitio aguante el subdominio", () => {
  const paquete = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8")
  );

  // con homepage "." CRA genera ./static/... en vez de /static/...
  expect(paquete.homepage).toBe(".");
});

test("las urls absolutas usan el dominio de public/CNAME", () => {
  const cname = leerPublico("CNAME").trim();
  const html = leerPublico("index.html");

  expect(cname).toBe("www.nebula.mindnt.com.mx");
  expect(metaDe(html, 'property="og:image"')).toBe(
    `https://${cname}/favicon.png`
  );
  expect(metaDe(html, 'name="twitter:image"')).toBe(
    `https://${cname}/favicon.png`
  );
  expect(leerPublico("robots.txt")).toContain(
    `Sitemap: https://${cname}/sitemap.xml`
  );

  // el sitemap lista las cuatro rutas y ninguna otra
  const sitemap = leerPublico("sitemap.xml");
  const rutas = Array.from(sitemap.matchAll(/<loc>https:\/\/[^/]+([^<]*)<\/loc>/g))
    .map((ruta) => ruta[1]);
  expect(rutas).toEqual(["/", "/planes", "/sistema", "/cobertura"]);
  rutas.forEach((ruta) => expect(sitemap).toContain(`https://${cname}${ruta}`));

  // los datos estructurados no dejan rutas relativas
  const bloque = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  );
  expect(bloque[1]).not.toMatch(/"(url|logo|image)": "\//);
});
