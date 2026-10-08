import type { Deep } from "./deep";

export const DEEP_C2: Record<string, Deep> = {
  /* 11 technical */
  "technical-seo-expert": {
    blocks: [
      { type: "h2", text: "Technical SEO for multilingual and multi-city sites" },
      { type: "p", text: "Businesses that serve several cities or publish in English and Urdu face extra technical decisions. Each city or language version needs its own crawlable URL, clear internal links and, for languages, correct hreflang annotations. Duplicate pages that differ only by city name should be avoided; each city page should carry genuinely local information. A technical SEO expert sets these rules early, because fixing a confused structure later is far harder." },
      { type: "list", items: [
        "Use a consistent URL pattern for city pages, such as /locations/islamabad/.",
        "Keep Urdu and English versions on separate URLs with hreflang between them.",
        "Avoid automatic redirects based on the visitor’s location; let users and Google reach every version.",
        "Make sure each version has its own title, description and structured data.",
      ] },
    ],
    faqs: [
      { q: "How much does a technical SEO audit cost in Islamabad?", a: "It depends on site size and complexity. Small business sites need far less work than large stores or portals. Ask for a fixed price based on the number of pages and templates involved." },
    ],
  },

  /* 12 WordPress */
  "wordpress-seo-expert": {
    blocks: [
      { type: "h2", text: "Image optimisation on WordPress, step by step" },
      { type: "p", text: "Images are usually the heaviest part of a WordPress page, and many Pakistani sites upload photos straight from phones at several megabytes each. Fixing this is one of the quickest speed wins available." },
      { type: "list", ordered: true, items: [
        "Resize images to the largest size they are actually displayed at before uploading.",
        "Compress them, using an image optimisation plugin or a tool before upload.",
        "Serve modern formats such as WebP where your setup supports it.",
        "Use lazy loading for images below the first screen, but not for the main hero image.",
        "Give every image a descriptive file name and alt text.",
      ] },
      { type: "p", text: "After optimising, run PageSpeed Insights again on the same pages. On image-heavy sites, the improvement is often immediately visible in the Largest Contentful Paint figure, which measures how quickly the main content appears." },
    ],
    faqs: [
      { q: "Do I need a page builder for a WordPress business site?", a: "Not usually. The block editor with a lightweight theme can build most business sites. Page builders add flexibility but often add weight that slows pages down." },
      { q: "How often should I update WordPress plugins?", a: "Check for updates at least weekly, with a recent backup in place. Outdated plugins are one of the most common ways WordPress sites get hacked." },
    ],
  },

  /* 13 Shopify */
  "shopify-seo-expert": {
    blocks: [
      { type: "h2", text: "Image, alt text and file names on Shopify" },
      { type: "p", text: "Shopify serves images through its own CDN and handles resizing, but the source files still matter. Upload images at a sensible size, give them descriptive file names before uploading, and write alt text that describes the product accurately, for example “navy blue embroidered lawn suit, three-piece” rather than “IMG_2041”. This helps accessibility, image search and Google’s understanding of the product." },
      { type: "h2", text: "Common Shopify theme fixes" },
      { type: "checklist", title: "Theme fixes a Shopify SEO expert often makes", items: [
        "Point product links in collection grids to the canonical /products/ URL",
        "Ensure each page has one H1, usually the collection or product name",
        "Remove leftover code from uninstalled apps",
        "Defer non-essential scripts so pages render faster",
        "Add structured data where the theme is missing it",
        "Make delivery, COD and return information visible on product pages",
      ] },
      { type: "p", text: "Many of these changes are small edits in theme files, but they should be made carefully, ideally on a duplicate theme first, and tested before publishing. A broken theme costs sales immediately, so caution pays." },
      { type: "h2", text: "Shopify SEO for local Pakistani shoppers" },
      { type: "p", text: "Local shoppers want reassurance before ordering from a store they have not used before. Clear delivery times to major cities, cash-on-delivery options, a WhatsApp number for questions, real photos and genuine reviews all build trust. These details also help the store rank for practical searches such as delivery times or exchange policies, which competitors often ignore." },
    ],
    faqs: [
      { q: "Can I edit Shopify theme code safely for SEO?", a: "Yes, but duplicate the theme first, make and test changes on the copy, and publish only when everything works. Small mistakes in theme files can break pages." },
      { q: "Does Shopify generate a sitemap automatically?", a: "Yes. Shopify creates an XML sitemap automatically. Submit it in Google Search Console and check that important collections and products are included." },
    ],
  },

  /* 14 ecommerce */
  "ecommerce-seo-expert": {
    blocks: [
      { type: "h2", text: "Product descriptions that sell and rank" },
      { type: "p", text: "Product descriptions are where many Pakistani stores lose to marketplaces. Copying the manufacturer’s text gives Google no reason to prefer your page over dozens of identical ones. A strong description answers the questions a shopper would ask a knowledgeable salesperson: what it is made of, how it fits or works, who it suits, how to care for it, and what is included." },
      { type: "table", caption: "Turning a supplier description into a strong one", head: ["Weak element", "Stronger version"], rows: [
        ["“High quality fabric”", "“100% cotton lawn, 2.5 metres shirt, medium weight for summer”"],
        ["“Comfortable fit”", "“Relaxed fit; size chart included; model is 5′6″ wearing size M”"],
        ["“Easy to clean”", "“Machine wash cold, dry in shade to protect the print”"],
        ["No delivery details", "“Delivered in 2–4 days to major cities, COD available”"],
      ] },
      { type: "h2", text: "Earning links for an online store" },
      { type: "p", text: "Links are harder to earn for product pages than for guides, so most ecommerce link building focuses on the brand, categories and useful content. Practical sources include supplier and brand partner pages, local press coverage of launches or collaborations, gift guides published by bloggers and media, and genuinely useful content such as size guides or care guides that others reference." },
      { type: "list", items: [
        "Ask brands you stock to list you as an authorised retailer.",
        "Share launches and collaborations with fashion and lifestyle journalists.",
        "Create definitive size, care or buying guides for your category.",
        "Partner with creators for honest reviews, with sponsored links properly labelled.",
      ] },
      { type: "h2", text: "Marketplaces and your own store together" },
      { type: "p", text: "Many Pakistani brands sell on marketplaces as well as their own store. That is sensible for reach, but your own store should offer reasons to buy direct: full collections, better product information, exclusive items, loyalty benefits or easier exchanges. SEO for your own site then captures shoppers searching your brand and specific products, while marketplaces bring new customers who may later buy direct." },
      { type: "callout", tone: "tip", title: "Protect your brand searches", text: "Make sure your own store ranks first for your brand name, with a clear title, structured data and a complete Business Profile if you have physical outlets." },
    ],
    faqs: [
      { q: "Should I rewrite manufacturer product descriptions?", a: "Yes, for your most important products at least. Unique descriptions with real details about material, fit, care and delivery give Google a reason to rank your page over identical resellers." },
      { q: "How can an online store earn backlinks?", a: "Through brand partner listings, press coverage of launches, gift guides, creator collaborations with labelled sponsored links, and useful guides such as size or care guides." },
    ],
  },

  /* 15 Google Maps */
  "google-maps-seo-expert": {
    blocks: [
      { type: "h2", text: "Verification and keeping your profile safe" },
      { type: "p", text: "Verification proves to Google that your business is real and at the location you claim. Methods vary and may include video verification of your premises, signage and equipment. Prepare properly: show permanent signage, the interior, tools or stock, and something that ties the business to the address. A rushed or unclear verification can lead to delays or rejection." },
      { type: "checklist", title: "Protecting your profile", items: [
        "Keep ownership under a business Google account you control",
        "Add managers rather than sharing the owner login",
        "Avoid frequent changes to name, address or category",
        "Check the profile weekly for user-suggested edits",
        "Keep documents ready in case reverification is requested",
      ] },
      { type: "h2", text: "Questions and answers, messaging and bookings" },
      { type: "p", text: "Features available on Business Profiles change over time, but where messaging, booking links or questions and answers are available, use them actively. Customers who can ask a question or book directly from the profile are more likely to convert. Monitor anything customers post publicly, correct inaccurate information, and respond quickly, because unanswered questions and slow replies send customers to competitors." },
      { type: "h2", text: "When a Google Maps specialist is worth paying for" },
      { type: "p", text: "Some businesses can manage their own profile once it is set up well. A specialist is most valuable when your category is competitive, you have several locations, you have suffered a suspension, competitors use spam tactics, or Maps is your main source of customers. In those cases, expert setup, grid tracking and ongoing management usually pay for themselves quickly." },
    ],
    faqs: [
      { q: "How do I verify my Google Business Profile?", a: "Follow the verification method Google offers, which may include a video of your premises. Show permanent signage, the interior, equipment or stock and something linking the business to the address." },
      { q: "Can I manage Google Maps SEO myself?", a: "Many small businesses can maintain a well-set-up profile themselves. A specialist adds most value in competitive categories, for multiple locations, after suspensions, or when Maps is your main source of customers." },
    ],
  },

  /* 16 on-page */
  "on-page-seo-expert": {
    blocks: [
      { type: "h2", text: "On-page SEO for different page types" },
      { type: "table", caption: "On-page priorities by page type", head: ["Page type", "Top on-page priorities"], rows: [
        ["Home page", "Clear statement of who you are, where and what you do; links to key services"],
        ["Service page", "Intent match, price or range, process, FAQs, strong call to action"],
        ["Location page", "Real local detail, address, map, directions, local reviews"],
        ["Product page", "Unique description, specifications, images with alt text, structured data"],
        ["Blog post or guide", "Direct answer, clear structure, examples, links to related services"],
        ["Contact page", "Accurate details matching the Business Profile, map, timings"],
      ] },
      { type: "h2", text: "Accessibility and on-page SEO" },
      { type: "p", text: "Accessibility and SEO overlap more than most people realise. Descriptive headings, meaningful link text, alt text on images, good contrast and a logical page structure help visitors using screen readers and also help search engines understand your content. Improving accessibility is therefore rarely wasted effort for SEO." },
      { type: "list", items: [
        "Use headings in order, without skipping levels for styling.",
        "Write link text that describes the destination.",
        "Describe meaningful images in alt text; leave decorative ones empty.",
        "Keep text readable with sufficient contrast and size.",
      ] },
      { type: "h2", text: "Keeping on-page work fresh" },
      { type: "p", text: "On-page SEO is never finished. Prices change, services evolve, new questions appear and competitors improve their pages. Review your most important pages every few months: update facts, add new FAQs from customer questions, refresh examples and check that titles still earn clicks. Pages that are kept current tend to hold their rankings better than pages left untouched for years." },
    ],
    faqs: [
      { q: "How often should I update my service pages?", a: "Review your most important pages every few months to update prices, add new customer questions, refresh examples and check that titles still perform well in Search Console." },
      { q: "Does accessibility help SEO?", a: "Often yes. Clear headings, descriptive links, image alt text and a logical structure help both screen reader users and search engines understand your pages." },
    ],
  },
};
