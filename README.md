# Yongmin Kim Portfolio

Next.js portfolio website with separate pages and English-only content.

## Stack

- Next.js App Router + TypeScript
- Vitest + Testing Library
- Playwright
- Vercel deployment

## Pages

- `/` Home: left intro + right image, desktop no-scroll, mobile scroll
- `/about` About Me
- `/projects` Work/Side project filter with outbound links
- `/contact` Contact links (email, LinkedIn, GitHub, X)

## Environment

Create `.env.local`:

```bash
cp .env.example .env.local
```

`NEXT_PUBLIC_SITE_URL` is used for canonical metadata, sitemap, and robots output.

## Local Development

```bash
npm install
npm run dev -- --port 3000
```

## Verification Commands

```bash
npx vitest run
npx playwright test
npm run lint
npm run build
```

## Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```
2. Login:
```bash
vercel login
```
3. Deploy preview or production:
```bash
vercel
vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` in Vercel project settings to your production domain (for example `https://your-domain.com`).
