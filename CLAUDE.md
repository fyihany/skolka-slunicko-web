# MŠ Sluníčko — web

Astro (SSG) + Tailwind CSS 4 web pro Soukromou mateřskou školu Sluníčko, Ostrava-Poruba.

## Repo & hosting

- **GitHub repo:** https://github.com/fyihany/skolka-slunicko-web
- **Preview (GitHub Pages):** https://fyihany.github.io/skolka-slunicko-web/
- **Produkční doména (budoucí):** https://www.skolka-slunicko.cz
- **Deploy:** automaticky při push na `main` přes `.github/workflows/deploy.yml`

## Důležité — astro.config.mjs

```js
site: 'https://fyihany.github.io',
base: '/skolka-slunicko-web',
```

`base` je nastaven kvůli GitHub Pages (subpath). **Před nasazením na produkci** je nutné:
1. Změnit `site` zpět na `'https://www.skolka-slunicko.cz'`
2. Odstranit řádek `base: '/skolka-slunicko-web'`

## Stack

- **Framework:** Astro 6 (SSG)
- **CSS:** Tailwind CSS 4 (přes `@tailwindcss/vite`)
- **Ikony:** `astro-icon` + `@iconify-json/ph` (Phosphor Icons)
- **Sitemap:** `@astrojs/sitemap`
- **Node:** >=22.12.0

## Struktura

```
src/
  components/
    Navigation.astro   # sticky header, mobile menu, breadcrumb-aware isActive()
    Footer.astro       # footer s navigací a kontaktem
    Logo.astro         # SVG logo
    PageHero.astro     # hero sekce s ikonou
    SEO.astro          # meta tagy, OG, JSON-LD
  layouts/
    BaseLayout.astro   # základní layout (Navigation + Footer)
  pages/               # jedna stránka = jeden .astro soubor
  styles/
    global.css         # Tailwind @theme + base styly
public/
  dokumenty/           # PDF/DOC ke stažení
  logo.svg, favicon.*
```

## Design

- Barvy: `#F9C22E` (sun), `#D4A017` (sun-dark), `#FFFBF0` (sun-light), `#2D2D2D` (dark)
- Font: Nunito (Google Fonts, načítán v BaseLayout)
- Border-radius: vše zaobleno na 10px (definováno v `@theme`)
- Mobile-first, WCAG 2.1 AA

## Navigace — isActive()

`Navigation.astro` používá `import.meta.env.BASE_URL` pro správné porovnání aktivní stránky:

```ts
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
function isActive(href: string) {
  const path = currentPath.replace(base, '') || '/';
  if (href === "/") return path === "/" || path === "";
  return path.startsWith(href);
}
```

Absolutní `href="/..."` linky **nepřidávat ručně s base prefixem** — Astro je při buildu automaticky přepíše.

## Dynamický obsah (zatím mock/placeholder)

- Jídelníček, Aktuality, Galerie → budoucí Google Apps Script JSON API
- Kontaktní formulář → Google Apps Script doPost
- Instagram feed → Instagram Basic Display API (přes Apps Script)

Vše čeká na zřízení Google účtu školy (schválení klientem).

## Klíčové kontakty

- **Ředitelka:** Michaela Krečmerová, DiS.
- **Telefon:** 725 828 130
- **Email:** info@skolka-slunicko.cz
- **Adresa:** Bohuslava Martinů 812/11, Ostrava-Poruba, 708 00
