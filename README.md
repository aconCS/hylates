# Hylates website handbook

A one-page client handbook (brand assets + every site page and its purpose), built with [Astro](https://astro.build) as a fully static site.

## Run locally

```bash
npm install
npm run dev
```

## Edit content

- **Text, colours, pages:** `src/data/content.ts`
- **Page previews:** replace files in `public/img/` (same file names), or add a new entry to `pages` in `content.ts`
- **Logos:** `public/assets/`
- **Styles:** `src/styles/global.css`

## Deploy to Cloudflare Pages

**Option A: Git (auto-deploys on every push)**

1. Push this folder to a GitHub or GitLab repo.
2. In Cloudflare: Workers & Pages → Create → Pages → Connect to Git → pick the repo.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `handbook` (only if the repo root is the parent folder)

**Option B: Direct upload (no Git)**

```bash
npm run build
npx wrangler pages deploy dist --project-name hylates-handbook
```

Or drag the `dist` folder into Workers & Pages → Create → Pages → Upload assets.

The page sets `noindex` so it stays out of search results. To keep it private, put it behind Cloudflare Access (Zero Trust → Access → Applications).
