# Blue Dial Labs Visual Identity v2.0

## Status

Implemented as the current corporate visual system for Blue Dial Labs.

v2.0 adopts the approved **BD Dial Monogram** as the primary corporate symbol while preserving the site's existing information architecture, page layouts, typography stack, warm editorial surface, and established navy/blue palette. This is a focused identity refinement rather than a website redesign.

The prior Reference Dial remains part of the design history but is superseded as the primary corporate mark.

## Brand idea

Blue Dial Labs should feel like an independent instrument for watch-market evidence and decisions: precise, calm, technical, editorial, and collector-aligned.

The identity deliberately avoids looking like a watch manufacturer, luxury retailer, marketplace, or generic AI startup.

## Primary mark — BD Dial Monogram

The primary mark combines an interlocked `BD` monogram with a restrained reference-dial system.

It contains:

- an interlocked `BD` monogram as the dominant identity element;
- concentric dial/reference geometry;
- four strong cardinal indices;
- smaller measurement indices;
- sparse observation nodes and evidence rays; and
- the established Blue Dial Labs navy/blue palette.

The visual metaphor is intentionally broader than a literal watch face. It should be readable as a precision instrument, measurement system, reference field, and watch-dial reference at the same time.

This ambiguity is intentional. Blue Dial Labs is a software and data company serving the watch domain, not a watch manufacturer or dealer.

The mark must not be embellished with crowns, lugs, gears, watch-case silhouettes, metallic effects, gradients, or luxury-brand ornament.

## Small-size and inverse marks

The identity includes simplified production variants rather than forcing the detailed primary mark into every context.

### Micro mark

`assets/blue-dial-labs-mark-micro.svg`

Use for small display sizes where the outer evidence detail of the primary mark would become noise. It retains:

- the `BD` monogram;
- concentric dial geometry;
- four cardinal indices; and
- four restrained diagonal indices.

The mobile header and favicon treatment use this simplified geometry.

### Inverse mark

`assets/blue-dial-labs-mark-inverse.svg`

Use on dark navy/ink surfaces. The geometry remains unchanged while the principal strokes become warm white and the dial accents use the established light blue.

The website footer uses the inverse mark.

## Wordmark and lockup

The website uses the SVG symbol alongside a live-text `Blue Dial Labs` wordmark rather than baking the company name into a raster or font-dependent logo image.

The primary horizontal lockup is:

`[BD Dial Monogram] | Blue Dial Labs`

The wordmark uses the site's established editorial display-serif stack. A thin divider separates the symbol from the company name. `Blue Dial` and `Labs` now read as one corporate name rather than using a separate monospace treatment for `LABS`.

Live text remains accessible, responsive, searchable, and independent of a licensed logo font.

## Palette

| Token | Value | Role |
| --- | --- | --- |
| Paper | `#f3f0e8` | Warm editorial background retained from the original site |
| Ink | `#132432` | Primary blue-black text |
| Ink soft | `#52616b` | Secondary copy |
| Dial navy | `#102c3f` | Dark bands, strong surfaces, foundational brand color |
| Dial blue | `#2d6f98` | Primary brand accent and active emphasis |
| Dial blue dark | `#1f5577` | Accessible accent text and hover state |
| Steel | `#8da2b0` | Secondary technical accent |
| Blue light | `#a9c4d5` | Blue accent on dark surfaces |
| Copper red | `#b65349` | Sparse secondary visual punctuation on light surfaces |
| Copper red dark | `#8a3e38` | Darker companion where text-level contrast is required |
| Copper red light | `#d9958d` | Warm accent on dark navy surfaces |
| Alert orange | `#c86a45` | Reserved for future semantic alerts/actions, not general branding |
| Alert orange dark | `#9d4b2f` | Dark semantic alert companion |

## Color semantics

Blue remains the primary identity and interaction color. Links, active states, emphasis, and the BD Dial Monogram remain blue so the company continues to read unmistakably as Blue Dial Labs.

Copper red is a secondary accent only. It exists to add warm chromatic contrast without drifting toward gold, jewelry, or conventional blue-and-gold luxury branding. Current uses are deliberately limited to small graphical punctuation such as the hero signal dot, evidence-panel rule, status separators, principle marks, and selected labels on dark bands.

Do not use copper red as the default link color, CTA color, large background field, or broad decorative fill. If copper red becomes visually dominant, the system has exceeded the intended accent ratio.

The former site's general-purpose orange `signal` identity remains retired. For compatibility with the existing CSS architecture, the legacy `--signal` and `--signal-dark` tokens map to dial blue and dial blue dark.

Orange remains reserved for genuinely exceptional or actionable information such as threshold events, warnings, or market changes rather than routine links and branding. Because copper red and alert orange occupy nearby warm territory, future product UI should validate alert semantics in context rather than assuming the current orange alert tokens are final.

## Typography

Visual Identity v2.0 retains the site's established typography stack:

- editorial serif for major headings and the corporate wordmark;
- sans serif for body and interface copy;
- monospace for technical labels, indices, and metadata.

Changing the broader typography system remains intentionally excluded.

## Site integration

`assets/site-polish.css` remains the public stylesheet entry point. It imports:

1. `assets/site-polish-base.css` — the pre-refactor polish layer preserved verbatim; and
2. `assets/brand-v1.css` — the current Blue Dial Labs identity layer, now at visual-system revision v2.0.

Primary identity assets are:

- `assets/blue-dial-labs-mark.svg` — detailed primary symbol;
- `assets/blue-dial-labs-mark-micro.svg` — small-size symbol;
- `assets/blue-dial-labs-mark-inverse.svg` — dark-surface symbol;
- `favicon.svg` — favicon treatment using the micro geometry; and
- `favicon.ico` — browser fallback generated from the same micro geometry.

This isolates brand changes from layout behavior and makes refinements easy to review or revert.

## Explicitly out of scope

Visual Identity v2.0 does not:

- redesign page layouts;
- rewrite corporate or product positioning;
- define final WristOwl or WristAtlas product logos;
- add decorative watch photography;
- use gears, crowns, watch-case silhouettes, crests, or luxury-brand tropes;
- introduce gradients, AI-glow effects, metallic effects, or ornamental animation.

## Future work

When WristOwl and WristAtlas product identities require their own marks, define their relationship to the Blue Dial Labs corporate identity deliberately rather than assuming the products should simply reuse the corporate monogram.

Any future identity extension should preserve the current principle: the company should look like a precise, collector-aligned evidence and decision instrument before it looks like a watch brand.
