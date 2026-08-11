# Blue Dial Labs corporate site

This repository contains the static corporate website for Blue Dial Labs.

Production site: `https://www.bluediallabs.com`

## Positioning

Blue Dial Labs is building independent software and data infrastructure for better watch decisions.

The public product language currently centers on:

- **Pursuit** — the watch a collector wants plus the conditions under which they would actually buy it.
- **Scout** — the intelligence behind a Pursuit: monitoring supported sources, checking identity and offer context, comparing qualifying opportunities, and surfacing changes that may justify action.
- **How it works** — the public navigation label for the technical approach page at `/approach/`.

Commercial relationships may support the business, but they cannot buy ranking, confidence, or a collector-facing recommendation.

## Site structure

- `/` — homepage
- `/collectors/` — collector product journey
- `/data-partners/` — retailer, dealer, marketplace, data, and technology partner journey
- `/approach/` — how the evidence and decision model works
- `/about/` — company context and current stage
- `/contact/` — basic contact and interest flow
- `/privacy/` — corporate-site privacy notice
- `/commercial-disclosure/` — independence and commercial disclosure
- `/data-standards/` — technical identity, source, offer, and evidence conventions

## Implementation

The site is plain static HTML, CSS, and JavaScript designed for GitHub Pages.

The contact form does not submit to a server-side database. It composes an email in the visitor's configured mail client. Any future change to server-side form handling must be paired with an explicit privacy and data-handling review.

## Visual identity

The current Blue Dial Labs visual identity is defined by the CSS layers under `assets/`:

1. `styles.css` — structural base
2. `site-polish-base.css` — retained pre-brand polish layer
3. `brand-v1.css` — Blue Dial Labs identity tokens and overrides
4. `above-fold.css` — commercial-compression and first-viewport hierarchy

`site-polish.css` is the final stylesheet entry point that imports the layered overrides.

## Governance

GitHub is the source of truth for this site. Changes should be made on branches and reviewed through pull requests rather than pushed directly to `main` unless repository governance explicitly calls for it.

Do not introduce unsupported claims of traction, integrations, coverage, savings, live inventory, customer counts, or commercial relationships.
