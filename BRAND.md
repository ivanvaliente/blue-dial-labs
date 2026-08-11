# Blue Dial Labs Visual Identity v1.2

## Status

Implemented as the first formal corporate visual system for Blue Dial Labs, with a v1.1 refinement that increased logo prominence and a v1.2 refinement that replaces the secondary brass accent with a restrained copper-red accent.

This remains intentionally a focused identity system, not a website redesign. The existing information architecture, page layouts, typography stack, and product/partner messaging remain intact.

## Brand idea

Blue Dial Labs should feel like an independent instrument for watch-market evidence and decisions: precise, calm, technical, editorial, and collector-aligned.

The identity deliberately avoids looking like a watch manufacturer, luxury retailer, marketplace, or generic AI startup.

## Mark — Reference Dial

The compact mark is a restrained dial/reference instrument rather than a literal wristwatch.

It combines:

- a circular reference field;
- four cardinal indices;
- a blue observation/decision hand; and
- a partial blue arc that creates a recognizable Blue Dial signature.

The mark is intended to suggest measurement, reference identity, observation, and decision quality without implying watch manufacturing.

The website uses the mark alongside a live-text `Blue Dial` + `LABS` wordmark. Live text remains accessible, responsive, and independent of a licensed logo font.

Visual Identity v1.1 made the header mark and wordmark moderately larger so the corporate identity reads more clearly without competing with page content. The footer lockup remains intentionally smaller.

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

Blue remains the primary identity and interaction color. Links, active states, emphasis, and the Reference Dial remain blue so the company continues to read unmistakably as Blue Dial Labs.

Copper red is a secondary accent only. It exists to add warm chromatic contrast without drifting toward gold, jewelry, or conventional blue-and-gold luxury branding. Current uses are deliberately limited to small graphical punctuation such as the hero signal dot, evidence-panel rule, status separators, principle marks, and selected labels on dark bands.

Do not use copper red as the default link color, CTA color, large background field, or broad decorative fill. If copper red becomes visually dominant, the system has exceeded the intended accent ratio.

The former site's general-purpose orange `signal` identity remains retired. For compatibility with the existing CSS architecture, the legacy `--signal` and `--signal-dark` tokens map to dial blue and dial blue dark.

Orange remains reserved for genuinely exceptional or actionable information such as threshold events, warnings, or market changes rather than routine links and branding. Because copper red and alert orange occupy nearby warm territory, the future product UI should validate alert semantics in context rather than assuming the current orange alert tokens are final.

## Typography

Visual Identity v1.2 retains the site's established typography stack:

- editorial serif for major headings;
- sans serif for body and interface copy;
- monospace for technical labels, indices, and metadata.

Changing typography remains intentionally excluded. The current combination already supports the desired editorial + technical character.

## Site integration

`assets/site-polish.css` remains the public stylesheet entry point. It imports:

1. `assets/site-polish-base.css` — the pre-refactor polish layer preserved verbatim; and
2. `assets/brand-v1.css` — the Blue Dial Labs identity layer, currently at visual-system revision v1.2.

This isolates brand changes from layout behavior and makes refinements easy to review or revert.

## Explicitly out of scope

Visual Identity v1.2 does not:

- redesign page layouts;
- rewrite corporate or product positioning;
- introduce a collector-product logo or final product name;
- add decorative watch photography;
- use gears, crowns, watch-case silhouettes, crests, or luxury-brand tropes;
- introduce gradients, AI-glow effects, or ornamental animation.

## Future work

Revisit the identity after external partner/collector feedback or when a final collector-facing product name is selected. At that point, define the relationship between the Blue Dial Labs corporate identity and the product identity rather than assuming they should be visually identical.
