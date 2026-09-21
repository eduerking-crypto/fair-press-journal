# Fair Press — Design System (FPJS)

Brief specification for the editorial portal "Fair Press" (journal: Fair Press Journal of Science, FPJS). English-only. Visual references: MDPI grid clarity, Nature/Lancet typographic sobriety.

## Palette

| Token | Hex | Usage |
| --- | --- | --- |
| `--wine` | `#7A1F2B` | Primary. Buttons, active nav, links, monogram, selection |
| `--wine-dark` | `#5E1520` | Hover states on light surfaces |
| `--ink` | `#23201C` | Body text; footer background |
| `--ink-soft` | `#5A544B` | Secondary text (7.5:1 on white, 6.8:1 on paper) |
| `--paper` | `#F7F3EC` | Page background |
| `--paper-2` | `#EFE8DC` | Alternate surfaces, soft dividers |
| `--gold` | `#B98A2F` | Accents and hover — dark surfaces only |
| `--line` | `#E3DCCD` | Hairline borders on light surfaces |
| — | `#FFFFFF` | Cards, header surface |

All text combinations meet WCAG AA (4.5:1). Gold is never used as text on light backgrounds (2.9:1 there); on `--ink` it reaches 6.3:1, which is why footer accents and the footer focus ring use gold.

## Typography

- Headings: Source Serif 4 (700), line-height 1.25, exposed as `--font-serif` / `--serif`.
- Body and UI: Source Sans 3 (400/500/600), line-height 1.6, exposed as `--font-sans` / `--sans`.
- `.journal-name`: serif small-caps, letter-spacing 0.06em.
- Wordmark: two lines — "Fair Press" serif small-caps over "Journal of Science" in letterspaced uppercase sans.

## Components

- **Logo** (`src/components/Logo.tsx`): burgundy monogram "FP" as inline SVG (48px, 4px radius, cream serif bold) + two-line wordmark. `variant="dark"` (default) for light surfaces; `variant="light"` for dark surfaces such as the footer.
- **Header** (`src/components/Header.tsx`): sticky, white, 1px bottom hairline; logo left, nav right (Home, Journals, Topics, Specials, Editorial Process, About); Submit button styled with `.btn`. Below 920px the nav collapses into a hamburger menu (`useState`, `aria-expanded`/`aria-controls`). Active section tracked with `usePathname` + `aria-current="page"`.
- **Footer** (`src/components/Footer.tsx`): `--ink` background, cream text, four columns (About Fair Press, For Authors, Browse, Legal) and a bottom row with copyright and ISSN line. Server component.
- **Buttons**: 4px radius, no gradients. `.btn` solid wine with white text; `.btn-ghost` outline wine with wine text; both invert on hover via `--wine-dark`.
- **Container**: `max-width: 1200px`, 24px inline gutters.

## Anti-"AI look" rules

1. No purple/blue gradients, no glow, no glassmorphism, no neon.
2. No decorative emojis anywhere.
3. Corner radius 2–6px only (buttons 4px, cards up to 6px).
4. Consistent 8pt-based spacing rhythm; whitespace is generous but even.
5. Gold is an accent, never a gradient fill or a large surface.
6. Serif carries authority (headlines, wordmark); sans carries UI (nav, buttons, body). Never swap roles.
