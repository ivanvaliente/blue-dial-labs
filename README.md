# Standard Time Labs corporate website

Static corporate website published at [www.standardtimelabs.com](https://www.standardtimelabs.com/). The site is intentionally dependency-light: semantic HTML, shared CSS, a small vanilla JavaScript file for navigation and local email composition, no JavaScript framework, no database, no analytics, and no cookie-dependent technology.

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

`https://www.standardtimelabs.com/`

The committed `CNAME` sets `www.standardtimelabs.com` as the canonical host. The apex address, `https://standardtimelabs.com/`, redirects to `www`. Canonical URLs, Open Graph URLs, `robots.txt`, `sitemap.xml`, and the custom 404 paths all target the custom-domain root.

## Deployment maintenance

1. Keep the repository Pages source set to `main` and `/ (root)`.
2. Keep `CNAME` set to `www.standardtimelabs.com`.
3. Preserve the web DNS records below alongside all Microsoft 365 mail and verification records.
4. Keep **Enforce HTTPS** enabled in the repository Pages settings.
5. After deployment changes, confirm that `https://www.standardtimelabs.com/` loads and that `https://standardtimelabs.com/` redirects to `www`.

## DNS records

Create these web records at the DNS provider. The four IPv4 records are required for the apex when using `A` records; the four IPv6 records are recommended for IPv6 support.

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

The `www` DNS CNAME must point directly to `ivanvaliente.github.io`, not to the repository path and not to `standardtimelabs.com`. Because the site's configured custom domain is `www.standardtimelabs.com`, GitHub Pages redirects the correctly configured apex host to `www`.

### Do not disturb email DNS

Do not delete or replace existing:

- `MX` records for Microsoft 365;
- the SPF `TXT` record;
- DKIM selector `CNAME` records;
- the `_dmarc` `TXT` record;
- Microsoft domain-verification records; or
- any other mail-specific records.

Only remove or replace existing web-facing `A`/`AAAA` records at `@` or an existing `www` record if they conflict with the GitHub Pages values above. Do not use a wildcard DNS record.

## Content and legal review

The company and product are described as in development. The site intentionally makes no claim of live coverage, approved integrations, existing partnerships, user traction, trademark ownership, or guaranteed price accuracy.

The privacy notice and commercial disclosure are initial operational copy, not legal advice. They should receive qualified professional review before public launch and again before adding server-side form processing, analytics, affiliate links, user accounts, international targeting, or collector-product data processing.

## Official deployment references

- [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Securing a GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Verifying a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
