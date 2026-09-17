# Consultora Norte — Blog

> Demo build: blog corporativo para una consultora PyME argentina. 11 notas seed en 5 categorías, RSS, sitemap, SEO por post, layout editorial responsive.

---

## Problema

Consultora Norte publica artículos sobre estrategia, operaciones, finanzas y RR.HH. para PyMEs industriales. Quería **posicionar contenido en Google sin depender de un programador** y con un editor visual mínimo. Necesitaban:

- Un sitio rápido, estático y barato de mantener.
- Cero vendor lock-in: los editores escriben Markdown; el sitio se regenera en cada push.
- SEO funcional (meta tags por post, OG, sitemap, RSS) sin plugins de WordPress.
- Categorización clara para que el archivo envejezca bien.

## Solución

Blog estático generado con **Astro 7 + Content Collections + Tailwind CSS v4**. Estructura orientada a SEO técnico desde el día uno:

- **Content Collections** con `rssSchema` extendido: cada post declara `title`, `description`, `pubDate`, `author`, `authorRole`, `category` (enum cerrado), `readingTime`, `heroImage`, `heroAlt`, `ogImage`, `tags`, `featured`. El schema valida en build y bloquea contenido mal formado.
- **SEO por post** generado desde un componente compartido (`<SEO/>`): title único, description, canonical, OG type/article, OG image, Twitter card, article meta (`published_time`, `author`, `section`).
- **RSS feed** nativo en `/rss.xml` con `@astrojs/rss`, ordenado por `pubDate` y con stylesheet XSL para que el feed se vea elegante cuando alguien lo abre en el navegador.
- **Sitemap** automático con `@astrojs/sitemap` en `/sitemap-index.xml` con `changefreq=weekly` y `priority=0.7`.
- **Paginación** real en `/blog/page/[page].astro` (PAGE_SIZE=6). 11 posts → 2 páginas.
- **Filtrado por categoría** en `/blog/category/[categoria]/` con índice de categorías en `/blog/category/`.
- **Sin runtime JS** para la mayoría del sitio. Solo formularios (`/contact/`, newsletter del footer) usan ~1KB de script inline — no hace falta React ni Preact islands.

## Stack

| Pieza | Versión | Rol |
|---|---|---|
| Astro | 7.3.3 | Framework SSG. Content Collections, sitemap, RSS. |
| Tailwind CSS | 4.3.3 (plugin Vite oficial `@tailwindcss/vite`) | Sistema editorial, sin `@apply`, todo CSS-first con `@theme`. |
| @tailwindcss/typography | 0.5.20 | Estilado de `prose-editorial` (preset editorial custom encima de Typography). |
| @astrojs/rss | 4.0.19 | Generación de `/rss.xml` con metadata RSS válida. |
| @astrojs/sitemap | 3.7.4 | Generación de `sitemap-index.xml`. |
| Markdown | — | Posts en `src/content/blog/*.md` con frontmatter validado por Zod. |

### Sistema editorial

- **Tipografía:** `Bricolage Grotesque` (display/sans) + `Newsreader` (serif/prose) + `JetBrains Mono` (números y metadata). Cargadas vía Google Fonts con `font-display: swap`.
- **Paleta:** `paper #FBF7F0` (fondo), `ink #15171A` (texto), `accent #A8421F` (terracotta), `mute #5C5852`, `line #E5DFD0`. Contraste mínimo 13:1.
- **Layout family:** editorial Split/Bento — hero con featured destacado, grid de recientes, índice de categorías, posts relacionados en individuales.
- **Imágenes:** ilustraciones SVG originales por categoría, escalan a cualquier viewport sin pérdida y pesan ~1KB cada una.
- **Iconos:** glifos SVG inline (cero dependencias de `@phosphor`/`lucide`).
- **Movimiento:** solo CSS `transition` con `cubic-bezier(0.32, 0.72, 0, 1)`. Respeta `prefers-reduced-motion: reduce`.

### Datos simulados

- `src/data/site.json` — metadata del sitio y redes sociales.
- `src/data/authors.json` — 3 socios ficticios con avatar SVG.
- `src/data/categories.json` — 5 categorías con slug, descripción y tono.

## Cómo correrlo

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # genera /dist
pnpm preview  # sirve /dist en localhost
```

> Requisitos: Node ≥ 22.12. pnpm ≥ 9 (recomendado 10+).

Una vez generado `dist/`, se puede desplegar en cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages). El sitemap apunta a `https://blog.consultoranorte.example` por configuración — cambiar `site` en `astro.config.mjs` antes del build de producción.

## Estructura

```
src/
├── content.config.ts          # schema Zod para la colección blog
├── styles/global.css          # design tokens + componentes + prose editorial
├── data/                       # JSON simulados (sitio, autores, categorías)
├── content/blog/              # 11 posts markdown con frontmatter
├── components/                 # SEO, Header, Footer, PostCard, CategoryChip, etc.
├── layouts/BaseLayout.astro   # shell del documento
└── pages/
    ├── index.astro             # landing
    ├── about.astro
    ├── contact.astro
    ├── 404.astro
    ├── rss.xml.js              # endpoint del feed
    └── blog/
        ├── index.astro              # página 1 del archivo
        ├── [slug].astro             # post individual
        ├── page/[page].astro        # paginación (2, 3, ...)
        └── category/
            ├── index.astro          # índice de categorías
            └── [categoria].astro    # posts por categoría
```

## Accesibilidad y performance

- `lang="es-AR"` declarado.
- Skip link al `<main>`.
- Contraste mínimo 13:1 entre texto y fondo en toda la paleta.
- Imágenes con `alt` siempre; avatares con `aria-label` y `role="img"` cuando son SVG.
- Formularios con `<label>` (visibles o `sr-only`), `aria-live` para mensajes de estado, `novalidate` y validación por script con anuncios al usuario.
- `prefers-reduced-motion: reduce` desactiva todas las transiciones y `scroll-behavior: smooth`.
- Lighthouse esperado **90+ en Performance y SEO**. Bundle CSS único ~30KB sin JS framework runtime. HTML completamente estático.

## Datos del cliente ficticio

- **Empresa:** Consultora Norte.
- **Fundación:** 2014.
- **Socios:** 3 — Lucía Fernández (Estrategia), Martín Oviedo (Finanzas), Soledad Rivas (Personas).
- **Sede:** Córdoba, Argentina.
- **Audiencia:** dueños y gerentes de PyMEs manufactureras y de servicios, plantas de 20–200 personas.
