# Standard Time Labs corporate website

Static corporate website for [standardtimelabs.com](https://standardtimelabs.com/). The site is intentionally dependency-free: semantic HTML, one shared stylesheet, no JavaScript framework, no database, no analytics, and no cookie-dependent technology.

## Scope

This is a pre-launch corporate credibility site. It does not provide Watch Collector OS application functionality, accounts, search, price aggregation, live integrations, affiliate links, ecommerce, or collector-data intake.

## Local preview

From the repository root:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`. Root-relative links require a local web server rather than opening the HTML files directly.

## GitHub Pages deployment

1. Create a public GitHub repository named `standard-time-labs-site` under the `ivanvaliente` account.
2. Push these files to the `main` branch, with `index.html` and `CNAME` at the repository root.
3. In **Repository Settings → Pages**, set **Source** to **Deploy from a branch**, then choose `main` and `/ (root)`.
4. Set the custom domain to `standardtimelabs.com`. The committed `CNAME` file already uses that canonical host.
5. Add the DNS records below. Preserve all Microsoft 365 mail and verification records.
6. Wait for GitHub's DNS check and certificate provisioning to complete, then enable **Enforce HTTPS** in Pages settings.
7. Confirm that `https://standardtimelabs.com/` loads and that `https://www.standardtimelabs.com/` redirects to the apex host.

GitHub recommends verifying the custom domain before changing DNS. In GitHub account settings, open **Pages**, add `standardtimelabs.com`, and publish the unique TXT challenge GitHub provides. Keep that verification TXT record in DNS.

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

The privacy notice and commercial disclosure are initial operational copy, not legal advice. They should receive qualified professional review before public launch and again before adding forms, analytics, affiliate links, user accounts, international targeting, or collector-product data processing.

## Official deployment references

- [Managing a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Securing a GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Verifying a custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
