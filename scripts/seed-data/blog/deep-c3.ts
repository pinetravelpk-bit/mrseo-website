import type { Deep } from "./deep";

export const DEEP_C3: Record<string, Deep> = {
  "technical-seo-expert": {
    blocks: [
      { type: "p", text: "Whatever the size of your site, the principle is the same: make it easy for search engines to reach, render and understand every page that matters, and keep everything else out of the way. A technical SEO expert’s job is to turn that principle into specific, prioritised fixes your developers can deliver." },
    ],
    faqs: [
      { q: "Can my developer handle technical SEO instead of a specialist?", a: "Developers implement most technical fixes, but they may not know which issues matter most for search. A technical SEO expert diagnoses and prioritises; the developer builds. The best results come from both working together." },
    ],
  },
  "wordpress-seo-expert": {
    blocks: [
      { type: "h2", text: "A WordPress maintenance routine that protects rankings" },
      { type: "checklist", title: "Monthly WordPress SEO maintenance", items: [
        "Back up the site, then update core, theme and plugins",
        "Remove plugins that are no longer used",
        "Check Search Console for new errors or security warnings",
        "Test speed on the home page and one key service page",
        "Review new pages for titles, descriptions and internal links",
        "Check that forms and WhatsApp buttons still work",
      ] },
      { type: "p", text: "Thirty minutes a month on this routine prevents most of the problems we are asked to fix on WordPress sites. It is a small investment compared with recovering from a hack or a broken plugin update that quietly removed your pages from Google." },
    ],
    faqs: [
      { q: "Should I move my site away from WordPress for better SEO?", a: "Rarely. A well-configured WordPress site ranks very well. Moving platforms carries migration risk; fix speed, structure and plugins first unless the site is beyond repair." },
    ],
  },
  "shopify-seo-expert": {
    blocks: [
      { type: "h2", text: "A 60-day Shopify SEO plan" },
      { type: "process", title: "Two months to a stronger store", steps: [
        { title: "Weeks 1–2", text: "Audit, fix links to canonical URLs, remove unused apps" },
        { title: "Weeks 3–4", text: "Rewrite top collection introductions and titles" },
        { title: "Weeks 5–6", text: "Improve the top 20 product descriptions and images" },
        { title: "Weeks 7–8", text: "Publish two buying guides linked to collections; review revenue" },
      ] },
      { type: "p", text: "This sequence fixes structural issues first, then improves the pages closest to revenue, then adds content that brings shoppers earlier in their journey. Review organic revenue at day 60 and repeat the cycle with the next set of collections and products." },
    ],
    faqs: [
      { q: "How long does Shopify SEO take to show results?", a: "Technical and collection improvements can show movement within weeks. Building rankings for competitive categories usually takes several months of consistent work." },
    ],
  },
  "ecommerce-seo-expert": {
    blocks: [
      { type: "h2", text: "Choosing an ecommerce SEO expert" },
      { type: "checklist", title: "What to look for", items: [
        "Experience with stores of a similar size and platform",
        "Understanding of faceted navigation and crawl control",
        "Ability to brief developers precisely",
        "Reporting on organic revenue, not only traffic",
        "Knowledge of Pakistani buyer behaviour, COD and delivery expectations",
      ] },
      { type: "p", text: "Ask candidates to review one of your categories and explain what they would change. The answer will show quickly whether they understand ecommerce or are applying general SEO advice to a store." },
    ],
    faqs: [
      { q: "Is ecommerce SEO worth it for a small online store?", a: "Usually yes, if people search for what you sell. Start with your top categories and products, and grow from the pages that produce sales." },
    ],
  },
  "google-maps-seo-expert": {
    blocks: [
      { type: "h2", text: "A simple Maps scorecard for your business" },
      { type: "table", caption: "Score your profile today", head: ["Area", "Strong", "Needs work"], rows: [
        ["Categories", "Specific and accurate", "Broad or missing"],
        ["Services", "All listed with descriptions", "Few or none"],
        ["Photos", "Recent, real, varied", "Old, few or stock"],
        ["Reviews", "Steady flow, all replied to", "Few, old or unanswered"],
        ["Details", "Consistent everywhere", "Different across sites"],
      ] },
      { type: "p", text: "Count how many rows fall in the right-hand column. Each one is a concrete improvement you can make, with or without a specialist." },
    ],
    faqs: [
      { q: "How much does Google Maps SEO cost?", a: "It depends on competition and the number of locations. Setup is often a one-off fee, with ongoing management priced monthly. Compare providers on scope and reporting, not just price." },
    ],
  },
  "on-page-seo-expert": {
    blocks: [
      { type: "h2", text: "An on-page audit you can run on one page today" },
      { type: "checklist", title: "Ten-minute page check", items: [
        "Does the title clearly say what the page offers and where?",
        "Is there one H1 that matches the title’s topic?",
        "Is the main question answered in the first paragraph?",
        "Are prices, timelines or specifics included?",
        "Are there at least two internal links to and from related pages?",
        "Do images have descriptive alt text?",
        "Is the next step, call or WhatsApp, obvious?",
      ] },
      { type: "p", text: "Run this on your most important service page first. Any “no” is a quick improvement, and fixing several on one page often produces visible movement in Search Console within weeks." },
    ],
    faqs: [
      { q: "What tools do on-page SEO experts use?", a: "Google Search Console, a crawler such as Screaming Frog, PageSpeed Insights and the browser itself. Judgement about intent and content matters more than any tool." },
    ],
  },
};
