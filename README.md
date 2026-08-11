# Blue Dial Labs corporate website

Static corporate website published at [www.bluediallabs.com](https://www.bluediallabs.com/). The site is intentionally dependency-light: semantic HTML, shared CSS, a small vanilla JavaScript file for navigation and local email composition, no JavaScript framework, no database, no analytics, and no cookie-dependent technology.

## Scope

This is a pre-launch corporate credibility site. It does not provide Watch Collector OS application functionality, accounts, search, price aggregation, live integrations, affiliate links, ecommerce, or collector-data intake. The contact form does not submit to a website backend; it prepares an email in the visitor's configured mail application.

## Local preview

From the repository root:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`. The regular pages use relative asset and navigation paths so the same markup works in local HTTP previews and at the custom-domain root. Use an HTTP preview when testing clean directory routes and custom 404 behavior.

## Current GitHub Pages deployment

The public repository is `ivanvaliente/standard-time-labs`. GitHub Pages deploys from `main` and `/ (root)` at:

`https://www.bluediallabs.com/`

The committed `CNAME` sets `www.bluediallabs.com` as the canonical host. The apex address, `https://bluediallabs.com/`, should redirect to `www` once the apex and `www` DNS records are fully propagated and HTTPS is available. Canonical URLs, Open Graph URLs, `robots.txt`, `sitemap.xml`, and the custom 404 paths all target the Blue Dial Labs custom-domain root.

## Deployment maintenance

1. Keep the repository Pages source set to `main` and `/ (root)`.
2. Keep `CNAME` set to `www.bluediallabs.com`.
3. Preserve the Blue Dial Labs web DNS records below alongside all Microsoft 365 mail and verification records.
4. Keep **Enforce HTTPS** enabled once GitHub makes it available for the custom domain.
5. After deployment changes, confirm that `https://www.bluediallabs.com/` loads and that `https://bluediallabs.com/` redirects to `www`.
6. Treat any former corporate domain as redirect-only. Manage that redirect outside this repository rather than configuring it as a second GitHub Pages canonical domain.

## Blue Dial Labs DNS records

Create these web records at the DNS provider for `bluediallabs.com`. The four IPv4 records are required for the apex when using `A` records; the four IPv6 records are recommended for IPv6 support.

| Type | Host | Value |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `AAAA` | `@` | `2606:50c0:8000::153` |
| `AAAA` | `@` | `2606:50c0:8001::153` |
| `AAAA` | `@` | `2606:50c0:8002::153` |
| `AAAA` | `@` | `2606:50c0:8003::153` |
| `CNAME` | `www` | `ivanvaliente.github.io` |

The `www` DNS CNAME must point directly to `ivanvaliente.github.io`, not to the repository path and not to `bluediallabs.com`. Because the site's configured custom domain is `www.bluediallabs.com`, GitHub Pages redirects the correctly configured Blue Dial Labs apex host to `www`.

## Legacy-domain transition

`bluediallabs.com` is the canonical public domain from this migration forward. Any former corporate domain should exist only to protect continuity and redirect existing links or visitors.

DNS records by themselves do not create an HTTP redirect. Configure the former apex and `www` host through the registrar, DNS/edge provider, or another redirect service so they permanently redirect to the corresponding `https://www.bluediallabs.com/...` path, preferably preserving the request path.

Once that redirect service is in place, the former domain's web-facing records should point to that redirect service rather than directly to this GitHub Pages site. Keep any legacy mail records that are still intentionally receiving mail during the transition.

### Do not disturb email DNS

Do not delete or replace existing mail records simply as part of the website move, including:

- `MX` records for Microsoft 365;
- the SPF `TXT` record;
- DKIM selector `CNAME` records;
- the `_dmarc` `TXT` record;
- Microsoft domain-verification records; or
- any other mail-specific records.

For `bluediallabs.com`, make sure the equivalent Microsoft 365 mail and verification records are configured before relying on `@bluediallabs.com` addresses publicly. For any legacy domain, retain or forward mail for as long as needed during the transition.

Only remove or replace web-facing `A`/`AAAA` records at `@` or an existing `www` record when they conflict with the intended website or redirect configuration. Do not use a wildcard DNS record.

## Content and legal review

The company and product are described as in development. The site intentionally makes no claim of live coverage, approved integrations, existing partnerships, user traction, trademark ownership, or guaranteed price accuracy.

The privacy notice and commercial disclosure are initial operational copy, not legal advice. They should receive qualified professional review before public launch and again before adding server-side form processing, analytics, affiliate links, user accounts, international targeting, or collector-product data processing.

## Official deployment references

- [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-github-pages-site)
- [Securing a GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Verifying a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-github-pages-site/verifying-your-custom-domain-for-github-pages)
