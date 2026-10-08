import type { Deep } from "./deep";

export const DEEP_C4: Record<string, Deep> = {
  "technical-seo-expert": { blocks: [], faqs: [
    { q: "What is the difference between technical SEO and on-page SEO?", a: "Technical SEO makes sure search engines can crawl, render and index the site efficiently. On-page SEO improves the content and structure of individual pages so they match what people search for. Both are needed, and they overlap in areas such as internal links and structured data." },
  ] },
  "wordpress-seo-expert": { blocks: [], faqs: [
    { q: "Do I need a premium SEO plugin for WordPress?", a: "Not usually. The free versions of the main SEO plugins cover titles, sitemaps, schema basics and redirects for most business sites. Premium features help larger or more complex sites, but configuration matters far more than the version." },
    { q: "Why are my WordPress pages not indexed?", a: "Common causes are the search engine visibility setting left ticked, noindex settings in the SEO plugin, pages blocked by robots.txt, thin or duplicate content, or pages missing from the sitemap and internal links. Search Console’s Pages report shows the reason for each URL." },
  ] },
  "shopify-seo-expert": { blocks: [{ type: "p", text: "Shopify makes it easy to launch a store, but ranking it takes the same care as any other site: a clear structure, unique content, a fast theme and steady attention to what shoppers search for. Treat SEO as part of running the store, not a one-off setup task." }], faqs: [
    { q: "Can I change product URLs on Shopify without losing rankings?", a: "Yes, if a URL redirect is created from the old address to the new one. Shopify can create redirects automatically when you change a handle, but check that the option is ticked and test the old URL afterwards." },
    { q: "Should I index Shopify tag pages?", a: "Usually not. Tag-filtered collection pages often create thin, near-duplicate URLs. Keep important groupings as real collections with their own content instead." },
  ] },
  "ecommerce-seo-expert": { blocks: [{ type: "p", text: "Ecommerce SEO rewards stores that think like their customers: categories that match how people search, product pages that answer real questions, and a smooth path from search result to checkout. Build those foundations first, and every other marketing channel works better too." }], faqs: [
    { q: "How many products should a category page show?", a: "Enough for shoppers to see a meaningful range without endless scrolling, with clear pagination or load-more that keeps products crawlable. The first page should carry the main category content and links." },
    { q: "Do product reviews help ecommerce SEO?", a: "Genuine reviews add unique, useful content and help shoppers decide. Show real reviews on product pages and keep any review structured data matched to what is visible." },
  ] },
  "google-maps-seo-expert": { blocks: [{ type: "p", text: "Google Maps is often the first place a local customer meets your business. A specialist who keeps your profile accurate, active and trusted is protecting one of your most valuable sources of new customers, so choose someone who treats that responsibility seriously." }], faqs: [
    { q: "Does my website affect my Google Maps ranking?", a: "Yes. Google uses your website to understand your business. Pages that match your categories and services, with consistent contact details and structured data, support your Maps relevance." },
    { q: "Should I respond to every Google review?", a: "Yes, including positive ones. Replies show future customers that you care, and calm, helpful responses to complaints often win more trust than the complaint costs." },
  ] },
  "on-page-seo-expert": { blocks: [{ type: "p", text: "Good on-page SEO is rarely dramatic. It is a steady habit of making each important page clearer, more accurate and more useful than the alternatives. Over months, that habit compounds into rankings that competitors find hard to take away." }], faqs: [
    { q: "How long should a service page be?", a: "Long enough to answer what buyers need: what is included, cost or range, process, timelines, areas served and FAQs. Many strong service pages run several hundred to over a thousand words, but usefulness matters more than length." },
    { q: "Should every page have an FAQ section?", a: "Only where customers genuinely ask questions about that topic. Relevant FAQs help readers and can be quoted in search and AI answers; generic FAQs added to every page add little." },
  ] },
};
