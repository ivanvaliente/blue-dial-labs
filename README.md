# Standard Time Labs corporate website

Static corporate website currently published at [ivanvaliente.github.io/standard-time-labs](https://ivanvaliente.github.io/standard-time-labs/). `standardtimelabs.com` remains the intended custom domain. The site is intentionally dependency-light: semantic HTML, shared CSS, a small vanilla JavaScript file for navigation and local email composition, no JavaScript framework, no database, no analytics, and no cookie-dependent technology.

## Scope

This is a pre-launch corporate credibility site. It does not provide Watch Collector OS application functionality, accounts, search, price aggregation, live integrations, affiliate links, ecommerce, or collector-data intake. The contact form does not submit to a website backend; it prepares an email in the visitor's configured mail application.

## Local preview

From the repository root:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`. The regular pages use relative asset and navigation paths so the same markup works under the GitHub Pages project path and, later, at the custom-domain root. Use an HTTP preview when testing clean directory routes and custom 404 behavior.

## Current GitHub Pages deployment

The public repository is `ivanvaliente/standard-time-labs`. GitHub Pages deploys from `main` and `/ (root)` at:

`https://ivanvaliente.github.io/standard-time-labs/`

No `CNAME` file is committed while the site uses the GitHub Pages project URL. Canonical URLs, Open Graph URLs, `robots.txt`, `sitemap.xml`, and the custom 404 paths currently use that deployed URL.

## Moving to the custom domain

1. In GitHub account settings, open **Pages**, add `standardtimelabs.com`, and publish the unique TXT challenge GitHub provides. Keep that verification TXT record in DNS.
2. In **Repository Settings → Pages**, set the custom domain to `standardtimelabs.com`. GitHub will add or update the root `CNAME` file for branch-based deployment.
3. Update canonical URLs, Open Graph URLs, `robots.txt`, `sitemap.xml`, and the absolute paths in `404.html` from the project URL to `https://standardtimelabs.com/`.
4. Add the web DNS records below while preserving all Microsoft 365 mail and verification records.
5. Wait for GitHub's DNS check and certificate provisioning, then enable **Enforce HTTPS**.
6. Confirm that `https://standardtimelabs.com/` loads and that `https://www.standardtimelabs.com/` redirects to the apex host.

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

The `www` CNAME must point directly to `ivanvaliente.github.io`, not to the repository path and not to `standardtimelabs.com`. Because the site's configured custom domain is the apex, GitHub Pages will redirect the correctly configured `www` host to `standardtimelabs.com`.

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
