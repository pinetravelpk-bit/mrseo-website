# MrSEO.pk (Next.js)

This is a Next.js 15 (App Router) rebuild of the `mrseo-theme-v4_3_1` WordPress theme. It keeps every page, every piece of copy, the design (`src/app/globals.css` is the theme's `main.css`), the structured data, the forms and the old WordPress URLs.

Syed Mudassir Shah is now described as **Islamabad based** everywhere the theme said Karachi. That covers the hero card, the "In short" answers, the About page, the contact sidebar, the footer, the contact FAQ, the business address in the schema, the Person schema and `/llms.txt`. Mentions of Karachi as a market (the Karachi city guide, client examples) are unchanged.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and fill it in:

- `NEXT_PUBLIC_SITE_URL`: used for canonical tags, the sitemap and the schema.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`: required for the contact and course application forms. For Gmail, use an app password. Until these are set, the forms return the "please WhatsApp us" fallback message.

## Design

The design system is in `src/app/globals.css`, with colour, spacing and type tokens at the top. Body text is Inter and headings are Plus Jakarta Sans, both self-hosted through `next/font`. Icons are line icons from `lucide-react`, and the mapping from each service, course, city and industry to its icon is in `src/components/Icon.tsx`. The round logo mark (`public/logo-mark.png`) is cropped from the brand logo.

## Blog

Posts are structured data in `src/content/blog/` (one file per batch, plus `extras.ts` for extra sections and short meta descriptions). Each post has a quick answer, key takeaways, sections, FAQs and visual blocks: `slides`, `video` (an animated step-by-step guide), and infographics (`stats`, `bars`, `process`, `compare`, `checklist`). Feature images are generated per post at `/blog-images/<slug>.png`.

**Scheduling:** posts publish in order, one every 2 hours from `SCHEDULE_START` in `src/lib/blog.ts`. A post can override its time with `publishAt`. The blog, sitemap and llms.txt refresh every minute, so posts go live on time without a deploy.

- Preview every post locally regardless of schedule: run with `BLOG_PREVIEW=1` (never set this on the server).
- Check all posts for missing blocks, broken internal links and long meta descriptions: `npm run check:blog`.

## Where things live

| What | Where |
|---|---|
| Phone, email, WhatsApp, base city, campus | `src/lib/site.ts` |
| Cities, industries, services, courses (fees, dates, seats) and all long-form page content | `src/data/generated/*.json` |
| Testimonials (the section stays hidden while this is empty, as in the theme) | `src/data/testimonials.ts` |
| Schema / JSON-LD | `src/lib/schema.tsx` |
| Pages | `src/app/**/page.tsx` |

The JSON in `src/data/generated/` was converted from the theme's PHP arrays by `npm run convert`, which reads `scripts/php-source/`. You can edit either the JSON directly or the PHP source and then run the converter again. If you run it again, it overwrites the JSON.

## URLs (same as WordPress)

`/`, `/about/`, `/contact/`, `/services/` and `/services/{seo,ppc,social-media,web-design,local-seo,content}/`, `/courses/` and `/courses/{slug}/` (12 courses), `/seo-expert/` and `/seo-expert/seo-expert-{city}/` (8 cities), `/seo-for/` and `/seo-for/seo-for-{industry}/` (8 industries), `/blog/`, `/case-studies/`, `/llms.txt`, `/sitemap.xml`, `/robots.txt`.

Redirects: `/sitemap_index.xml` goes to `/sitemap.xml`, and clean slugs like `/seo-expert/karachi/` go to their full URL.
