# AGENTS.md — POS website

## What this is

The POS product's **public marketing website**. It is a standalone app, not part of the POS
system — do **not** port POS logic here: no auth, no Backend API calls, no `API_URL`, no POS
domain enums (sale statuses, payment methods, etc.). The actual system lives in sibling
directories and is documented in `../AGENTS.md`.

- `website/` is its **own git repo** (initial commit: "Initialize project using Create React App").
  The parent `Nebula-POS/` is *not* a git repo.
- `../AGENTS.md` is stale about this project: it lists only four subprojects, does not mention
  `website/`, and calls the product "Astro POS" while the directory is `Nebula-POS`. Treat it as
  background only; its claim that only `Database/` and `frontend/` are git repos is wrong.

## Stack

- CRA 5 (`react-scripts` 5.0.1) + React 19. **JavaScript only** — no TypeScript, and never
  `npm run eject`.
- Tailwind 3.4 is a `devDependency`, wired through the root `tailwind.config.js` plus the
  `@tailwind` directives at the bottom of `src/index.css`. There is deliberately **no
  `postcss.config.js`** — CRA 5 auto-detects Tailwind; do not add one.
- `tailwind.config.js` has an empty `theme.extend` — no brand tokens, no custom font yet.
  (`../frontend/tailwind.config.js` registers Public Sans; nothing is shared between them.)
  Add brand colors/fonts there rather than inline arbitrary values.

## Commands

- `npm start` → dev server on **:3000**. `../frontend` also uses :3000; if both run, use
  `PORT=3001 npm start`.
- `npm test` **watches and never exits**. Always use `CI=true npm test` for a one-shot run.
- There is **no `lint` and no `typecheck` script.** ESLint runs only inside `start`/`build`,
  configured by the `eslintConfig` block in `package.json` (`react-app`, `react-app/jest`).
- `CI=true npm run build` is the strictest available gate: CRA promotes ESLint warnings to
  hard errors. Use it to verify a change, not plain `npm run build`.

## Current known-failing state

Nada: `CI=true npm test` (18 tests) y `CI=true npm run build` pasan limpios. Estos dos problemas
ya no existen y no hay que reintroducirlos:

- `src/App.test.js` ya no es el boilerplate de CRA: asserta el H1 real y envuelve `<App />` en
  `MemoryRouter` con un helper `enRuta(ruta)`, porque `App` ya tiene `<Routes>`.
- `src/App.js` ya no importa `./logo.svg`.

## Layout

- Entry: `src/index.js` (monta `<BrowserRouter>`) → `src/App.js` (layout compartido + `<Routes>`).
- Rutas: `/` → `pages/Inicio.js`, `/planes` → `pages/Planes.js`, `/cobertura` →
  `pages/Cobertura.js`, `/sistema` → `pages/Sistema.js`, y `*` redirige a `/`.
  Esa página se llama **Funcionalidades** en todo lo visible (`navegacion`, pie, botones y el
  `aria-label` de la región): la palabra "Sistema" solo sobrevive en la ruta, en `pages/Sistema.js`
  y en el badge "Ecosistema completo" del plan grande. El header **no** lleva "Cómo funciona": el
  menú son 3 destinos, y el ancla `/#como-funciona` solo se usa desde el pie y el botón
  secundario del cierre. `pages/Sistema.js` es la única consumer de `components/Caracteristicas.js`, que se salió del
  inicio; ambas superficies reciben `nivel` para poder ser `h1` en su página, y `children` se
  renderiza bajo el botón de precios ( ahí va el segundo video, `NebulaVideo1.mp4`). `Cobertura` va con `React.lazy` + `<Suspense>`
  porque la geometría del mapa pesa ~62 kB y solo esa página la usa; `main.js` queda en ~95 kB
  gzip. Las páginas son wrappers delgados sobre `components/Paquetes.js` y
  `components/MapaClientes.js`, y le pasan `nivel="h1"` para que la página tenga su `h1`.
- Los CTA de los planes (los de `PlanesResumen` en el inicio y los de `Paquetes` en `/planes`)
  dicen `ETIQUETA_DEMO` = "Solicitar demostración" y **abren el formulario**, no WhatsApp: ambas
  superficies reciben `onProbar` desde `App.js`. Antes iban directo a WhatsApp, no volver atrás.
- `Inicio` **sí** trae precios, pero en versión corta: `components/PlanesResumen.js` (4 bullets
  por plan, sin toggle mensual/anual) es distinto de `components/Paquetes.js` (los 6 bullets y
  el toggle). Cada plan tiene `resumen` e `incluye` en `utils/contenido.js`, y un test exige que
  todo punto de `resumen` sea texto idéntico de algún punto de `incluye`: si se edita una lista
  y no la otra, el test falla. Agregar una función a un plan significa agregarla a ambas.
- El hero se quedó corto a propósito: H1 de dos líneas más una sola frase
  ("¿Se te pierde un pedido...? Nebula lo sigue de principio a fin y descuenta el inventario
  solo. Sin comisión por pedido."). `components/ComoFunciona.js` sigue en el inicio con los 3
  pasos y un botón "Ver funcionalidades" → `/sistema`, para que la página del sistema sea el
  destino del detalle y no una sección más del scroll.
- Preferencia de diseño del usuario: pocas superficies translúcidas. Los iconos que encabezan
  algo van en cuadro **azul sólido con el icono en blanco** (`bg-azul-500` + `text-white`), no en
  tiles con `bg-azul-500/15`; los botones primarios ya son sólidos por `Button variante="primario"`.
- `Header`, `Pie` y el skip link viven en `App.js`, no en las páginas. `components/AlCambiarRuta.js`
  sube al inicio en cada cambio de ruta y se desplaza a la ancla si la trae.
- La campaña de lanzamiento vive **una sola vez** en `lanzamiento` (`utils/contenido.js`): 25
  negocios seleccionados con un año al 15% de descuento. La usan tanto el bloque final de
  `Galeria.js` como el de `MapaClientes.js`, y el número sale de `cobertura.lugares` vía
  `{lugares}` (nunca escrito a mano). Un test recorre `/`, `/planes`, `/sistema` y `/cobertura`
  y falla si vuelve a aparecer "mes gratis", que quedó derogado.
- `components/FormularioNegocio.js` es el único formulario del sitio y **no es una sección de la
  página**: es un modal (`role="dialog"`, `aria-modal`) que solo existe en el DOM cuando
  `App.js` pone `formulario` en `true`. El estado vive en `App.js`, no en `pages/Inicio.js`,
  porque el modal es **global**: lo abre el botón "Probar Nebula" del header en cualquier página y
  el del hero en el inicio (los dos reciben `onProbar` por props; en móvil el del header cierra
  además el menú). "Quiero formar parte" (galería) manda a WhatsApp con
  `WHATSAPP_LANZAMIENTO`; en `/cobertura` y en los planes sí abre el formulario. El otro botón del hero, "Contactar", sí va directo a WhatsApp. Se cierra con la
  X, con Escape y con clic en el fondo, y bloquea el scroll del fondo. No hay backend: al enviar
  arma el texto con `mensajeNegocio(datos)` y abre `enlaceWhatsapp(...)` con `window.open`, así que
  el negocio solo tiene que darle enviar. Los datos del formulario viven en `formulario`
  (`utils/contenido.js`) y las reglas de WhatsApp en `utils/contacto.js`.
- El numero de ventas es `9991778325` y vive en `utils/contacto.js` como fallback de
  `REACT_APP_WHATSAPP`; el codigo de pais (52) se antepone aparte para armar `wa.me`. Si cambia el
  numero hay que editarlo ahi una sola vez: el texto del formulario lo muestra con
  `WHATSAPP_NUMERO_LEGIBLE`.
- Los dos botones del hero son "Probar Nebula" (abre el modal del formulario, `ETIQUETA_PROBAR`) y
  "Contactar" (WhatsApp). El botón del header es el mismo "Probar Nebula" y también abre el
  formulario. El resto de CTAs siguen con `ETIQUETA_DEMO` = "Solicitar demostración" y van directo
  a WhatsApp, salvo el "Quiero formar parte" de la galería, que usa
  `WHATSAPP_LANZAMIENTO` con su propio mensaje. Ya no existe el ancla `#contacto`.
- `LlamadaFinal` es el cierre y **ya no ofrece una demostración**: su `aria-label` es "Hablar con
  un asesor", el `id` es `asesor` (no `demo`), el H2 es "¿Aún tienes dudas?" y su botón
  `ETIQUETA_ASESOR` = "Hablar con un asesor" va **directo a WhatsApp** con `WHATSAPP_ASESOR`
  ("me gustaría hablar con un asesor de Nebula"), sin pasar por el formulario. El botón secundario
  Su botón secundario dice "Ver funcionalidades" y sigue siendo un ancla a `#como-funciona`,
  válida porque ambas secciones viven solo en el inicio.
- En `MapaClientes.js` el CTA "Quiero formar parte" va **encima** del mapa, no debajo (un test lo
  comprueba con `compareDocumentPosition`) y **abre el formulario** (`onProbar`): el objetivo es
  capturar el negocio, no mandarlo a WhatsApp, y los estados con clientes se rellenan con azul sólido
  `#034EA2`: no hay degradados, y un test falla si vuelve un `linearGradient`. El número de
  clientes es delgado (`fontWeight="400"`, la fuente solo carga 400/500/600/700) y chico
  (`tamanoNumero` va de 8 a 18 px).
- Navegación: los hrefs de `navegacion` (en `utils/contenido.js`) y de las columnas del pie son
  **absolutos** (`/planes`, `/#clientes`) para que funcionen desde cualquier página, y se navega
  con `<Link>` de `react-router`. Un `href="#seccion"` relativo se rompe en cuanto la sección
  vive en otra página.
- Depende de **`react-router`**, no de `react-router-dom` (en v7 el segundo es solo un re-export
  y su subpath `react-router/dom` no lo resuelve el jest de CRA 5). Además `src/setupTests.js`
  polyfillea `TextEncoder`/`TextDecoder` desde `util`, porque el jsdom de CRA 5 no los expone y
  react-router 7 los usa al cargar. Sin ese polyfill la suite no arranca.
- Al publicar hay que configurar el **rewrite a `index.html`** en el hosting (Netlify
  `_redirects`, Vercel rewrites, error document en S3): `/planes` y `/cobertura` no son archivos
  físicos. El dev server de CRA ya lo resuelve.
- `src/utils/mexicoEstados.js` (~62 kB) es geometría generada, no escrita a mano: son los 32
  estados de México de `@svg-maps/mexico` (CC BY 4.0, atribución en el pie). Trae `cx`/`cy`
  (centro del polígono principal, donde se dibuja el número de clientes) y `ancho`/`alto`. Para
  agregar un cliente se edita `cobertura.clientes` en `utils/contenido.js`, no el mapa.
- `src/components`, `src/pages` y `src/utils` ya no están vacíos; `src/Components` / `src/Pages`
  no existen (todo en minúsculas, igual que `../frontend/src`).
- `public/index.html` ya tiene `<title>`, meta description y og:image/og:title/og:description
  propios (antes era boilerplate de CRA). Si se crea una página nueva, sus metas requieren o una
  segunda entrada en `public/` con su propio html, porque CRA no hace meta por ruta.
- `README.md` is unmodified CRA boilerplate and documents no real project conventions. Don't
  treat it as a source of truth.
