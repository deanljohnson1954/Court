# UW Court — Project Notes for Claude

## Stack
- **Framework**: Astro (static site, `output: "static"`)
- **Hosting**: GitHub Pages (custom domain `uwcourt.com`)
- **Source repo**: GitHub (`deanljohnson1954/Court`, branch `main`)

## Build & Deploy Process

### How it works
Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. Installs dependencies (`npm ci`)
2. Runs `npm run build` → `astro build` → outputs to `dist/`
3. Uploads `dist/` as a Pages artifact and deploys via `actions/deploy-pages@v4`

### GitHub Pages settings (required)
- **Source** must be set to **GitHub Actions** (not "Deploy from a branch")
  Settings → Pages → Source → GitHub Actions
- Custom domain: `uwcourt.com`

### To deploy
Just push to `main`. GitHub Actions handles the rest.
```
git add <files>
git commit -m "message"
git push origin main
```

### Local dev
```
npm run dev      # dev server at localhost:4321
npm run build    # builds to dist/
npm run preview  # preview the dist/ build locally
```

## CSS Scoping Note
Astro scopes component CSS with `data-astro-cid-*` attributes. Elements created
by JavaScript at runtime do NOT receive these attributes, so scoped CSS won't match them.
Use inline styles or `:global()` wrappers for JS-generated HTML.

## Canonical URL Note
Pages are built as directories (`about/index.html`) and GitHub Pages serves them
with a trailing slash (`/about/`). The canonical tag in `BaseLayout.astro` normalizes
`Astro.url.pathname` to always include a trailing slash to match this behavior.
Do not remove that normalization — it prevents "Alternate page with proper canonical tag"
errors in Google Search Console.

## Sitemap
`@astrojs/sitemap` generates `sitemap-index.xml` and `sitemap-0.xml` at build time.
`/apply-thanks` is excluded from the sitemap (it has `noindex` and is a post-form page).
To exclude additional pages, add them to the `filter` function in `astro.config.mjs`.

## Pages
- `/` — Home (`src/pages/index.astro`)
- `/about` — Property details & photos (`src/pages/about.astro`)
- `/lease-process` — How the lease works (`src/pages/lease-process.astro`)
- `/apply` — Download PDF application (`src/pages/apply.astro`)
- `/apply-thanks` — Post-submission thank-you, `noindex` (`src/pages/apply-thanks.astro`)

## Assets
- `public/Student-Rental-Application.pdf` — fillable PDF linked from `/apply`
- `public/2026-Court-Application.pdf` — alternate version (both copied to `dist/`)
- `public/robots.txt` — disallows `/apply-thanks`, references sitemap
- `public/.assetsignore` — tells Cloudflare/wrangler to ignore `_worker.js` (not used here)
