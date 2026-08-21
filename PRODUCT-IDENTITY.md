# Blue Dial Labs Product Identity v0.1

## Status

WristAtlas product identity is implemented as the first product-level extension of the Blue Dial Labs visual system.

WristOwl identity remains a design direction only and is not production-approved in this slice.

## Brand architecture

Blue Dial Labs remains the corporate identity and site-wide masthead.

Product identities sit beneath it:

- **Blue Dial Labs** — company / corporate identity
- **WristOwl** — collector decision-intelligence product
- **WristAtlas** — canonical watch identity and data infrastructure product

A product page may display its product mark prominently inside the page hero, but it must not replace the Blue Dial Labs header or imply a separate company/site.

## WristAtlas identity

### Source concept

The approved direction comes from the supplied WristAtlas concept: a globe/reference grid crossed by a compass needle.

The concept communicates:

- canonical reference identity;
- navigation across inconsistent source records;
- normalization and resolution;
- infrastructure rather than watch retail; and
- a watch-domain reference without depicting a literal wristwatch.

### Production refinement

The supplied raster concept is not used directly on the site.

The production mark is a clean vector redraw that preserves the concept while reducing detail for reliable rendering:

- outer reference/globe circle;
- latitude/longitude-style identity grid;
- four cardinal indices;
- restrained diagonal reference indices;
- a central compass needle; and
- Blue Dial Labs navy/blue palette continuity.

The production mark deliberately avoids additional decorative geography, tiny ticks, gradients, shadows, metallic effects, or raster tracing.

### Assets

- `assets/wristatlas-mark.svg` — primary product symbol
- `assets/wristatlas-mark-micro.svg` — reduced-detail small-size symbol
- `assets/wristatlas-mark-inverse.svg` — dark-surface symbol

All three are native SVG geometry. Do not convert bitmap contours into SVG paths.

## WristAtlas wordmark

On the corporate site, `WristAtlas` remains live HTML text next to the SVG mark rather than being baked into the logo image.

The hero lockup uses:

`[WristAtlas mark] | WristAtlas`

with the descriptor:

`Reliable watch identity layer`

This keeps the product name accessible, responsive, searchable, and independent of a logo-font file.

The existing product-stage disclosure — `Working product name · In development` — remains visible and separate from the identity lockup.

## Responsive behavior

The primary WristAtlas mark remains the preferred page-level symbol when there is enough room to render it clearly.

The micro mark is reserved for genuinely constrained product-identity applications. Do not switch to it simply because a page is viewed on mobile if the primary mark remains legible.

The hero lockup scales in place on smaller screens instead of becoming a different product identity.

## Corporate relationship

Blue Dial Labs and WristAtlas intentionally share palette and precision language, but their symbols remain distinct:

- Blue Dial Labs uses the BD dial monogram as the corporate mark.
- WristAtlas uses the globe/reference-grid + compass mark as the product mark.

The shared visual system should make WristAtlas feel built by Blue Dial Labs without making the two marks interchangeable.

## WristOwl boundary

The supplied WristOwl owl/dial concept is promising but remains too detailed for production at normal web sizes.

Do not add it to the corporate site in its current raster form.

A later Product Identity v0.2 slice should preserve the owl/dial idea while simplifying network nodes, binary-eye detail, gear-like ornament, and other small geometry before producing clean SVG assets and integrating the WristOwl page.

## Explicitly out of scope

This slice does not:

- change Blue Dial Labs corporate identity;
- replace the corporate header on WristAtlas pages;
- redesign WristAtlas page content or positioning;
- change the WristAtlas product stage or external-access boundary;
- implement WristOwl identity;
- add product marks to every site surface;
- create social-media or print lockups; or
- imply trademark registration or legal clearance.
