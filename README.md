# Fair Press — Journal of Science (FPJS)

Editorial portal for **Fair Press**, an independent open access publisher of
peer-reviewed science in medicine and the health sciences. Flagship journal:
**Fair Press Journal of Science** (FPJS).

Built with Next.js 16 + TypeScript. Deployed free on Vercel (`*.vercel.app`).

## Structure

```
FAIR PRESS WEB/
├── web/                  # Next.js app
│   ├── src/
│   │   ├── app/          # App Router: home, about, contact, journals,
│   │   │                 # journal/[id], article/[id], authors, topics,
│   │   │                 # specials, editorial-process, ethics, search,
│   │   │                 # legal/[slug]
│   │   ├── components/   # Logo, Header, Footer
│   │   ├── data/         # Seed data (source of truth): journals, articles,
│   │   │                 # board, topics, specials, news, editorial, legal
│   │   └── lib/          # types, format, data (Supabase optional wrapper)
│   └── next.config.ts    # security headers
├── docs/DESIGN.md        # design spec (palette, typography, rules)
└── .opencode/agent/      # 5 project agents: design, dev, science, legal,
                          # security
```

## Commands

```bash
cd web
npm run dev        # local dev (http://localhost:3000)
npm run build      # production build
npm run lint       # eslint
```

## Deploy to Vercel

```bash
cd web
vercel --prod
```

## How to edit content

All site content lives in `web/src/data/` as typed seed files:

| File | Content |
|---|---|
| `journals.ts` | Journal portfolio (1 active: `fpjs`, 2 coming soon) |
| `articles.ts` | Articles (structured abstracts, authors, DOI, dates) |
| `board.ts` | Editorial board |
| `topics.ts` | Research areas |
| `specials.ts` | Special issues |
| `news.ts` | News & announcements |
| `editorial.ts` | Editorial process, ethics, author guidelines, mission |
| `legal.ts` | Privacy, terms, copyright, cookies |

After editing, rebuild (`npm run build`) and redeploy. Static pages and
`generateStaticParams()` routes pick up changes automatically.

## Optional: connect Supabase (free)

The data layer (`web/src/lib/data.ts`) reads from Supabase when env vars are
present, falling back to the static seed otherwise:

1. Create a free project at [supabase.com](https://supabase.com).
2. Add to `web/.env.local` (gitignored):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
   ```
3. Run the RLS SQL (public read on `journals`/`articles`, writes only via
   `service_role` — see project agent `fairpress-security` for the full SQL).

## Design

Palette: wine `#7A1F2B` · ink `#23201C` · paper `#F7F3EC` · gold `#B98A2F`.
Typography: Source Serif 4 (headlines) + Source Sans 3 (UI), self-hosted via
`next/font`. See `docs/DESIGN.md`.
