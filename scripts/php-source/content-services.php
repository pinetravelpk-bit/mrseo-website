<?php
/**
 * MrSEO.pk - Service Page Long-Form Content Library
 * Original editorial copy for every service landing page.
 * Each entry targets 1,000 to 1,500 words.
 *
 * @package MrSEO_PK
 */
if(!defined('ABSPATH')) exit;

function mrseo_service_content(string $slug): array {
    $all = mrseo_service_content_all();
    return $all[$slug] ?? [];
}

function mrseo_service_content_all(): array {
    return [

/* ============================================================
   SEO
   ============================================================ */
'seo' => [
 'quick' => 'SEO is the work of making a website the result Google prefers to show. In practice that means fixing what is technically broken, building pages that match what people actually search, and earning enough credibility that Google trusts the site. For most Pakistani businesses the first meaningful movement comes in 30 to 90 days.',
 'sections' => [

  ['h2' => 'What SEO Actually Involves',
   'html' => <<<'H'
<p>SEO gets sold as a mysterious service, which suits agencies that would rather not be measured. It is not mysterious. Google is trying to answer a question, and your page either answers it better than the alternatives or it does not. Everything else is detail about how you demonstrate that.</p>
<p>The work divides into three parts that all have to function. Technical health decides whether Google can crawl, render and index your pages at all. Content decides whether those pages actually match what people search and answer it properly. Authority decides whether Google believes you over the eleven other sites saying similar things.</p>
<p>Most struggling Pakistani websites fail on the first two long before authority becomes the bottleneck. A site that takes nine seconds to load on a mobile connection, has four pages competing for the same keyword, and no page addressing the questions buyers actually ask does not need more backlinks. It needs the foundations fixed first, which is cheaper and faster than most owners expect.</p>
H],

  ['h2' => 'The Technical Layer',
   'html' => <<<'H'
<p>This is the least glamorous part and the one that most often unlocks everything else.</p>
<ul>
<li><strong>Crawling and indexing.</strong> Pages blocked by robots directives, orphaned with no internal links, or buried ten clicks deep will not rank. We check what Google has actually indexed against what should be indexed, and the gap is usually larger than owners expect.</li>
<li><strong>Core Web Vitals and speed.</strong> Pakistani traffic is overwhelmingly mobile on inconsistent connections. Page weight matters more here than in markets with better average bandwidth. Image handling, render-blocking scripts and unused CSS are the usual culprits.</li>
<li><strong>Duplicate and thin pages.</strong> Multiple URLs serving the same content split ranking signals between them. Canonical tags, redirect hygiene and consolidating near-duplicates often produces gains without writing a single new page.</li>
<li><strong>Structured data.</strong> Correct schema for your business type, services, articles and FAQs. This does not rank you higher directly, but it affects how your listing appears and whether AI answer engines can read your content properly.</li>
<li><strong>Mobile rendering.</strong> Not just responsive layout, but whether content, navigation and forms actually work on a real phone. Broken mobile forms silently discard leads on a surprising number of Pakistani sites.</li>
</ul>
H],

  ['h2' => 'Keyword Research That Is Not Guesswork',
   'html' => <<<'H'
<p>Most keyword research in Pakistan is done with an international tool that badly underreports local volume, particularly for Roman Urdu queries. It produces a tidy spreadsheet that misses a large share of the market.</p>
<p>We start with your own Search Console data instead, because it shows the queries you are already appearing for, including the ones no tool tracks. Then we look at what your ranking competitors are actually getting traffic from, what your site search box records, and what your sales team hears on the phone. Tools come last, as a check rather than a starting point.</p>
<p>The output is a keyword map: every target phrase assigned to exactly one page, grouped by intent. Informational queries go to guides. Commercial comparison queries go to comparison pages. Transactional queries go to service or product pages. When two pages chase the same phrase they compete with each other and both underperform, which is one of the most common self-inflicted problems we find.</p>
H],

  ['h2' => 'Content That Earns the Position',
   'html' => <<<'H'
<p>Google has spent years getting better at recognising content written to rank versus content written to be useful. Keyword density, word count targets and spun paragraphs stopped working some time ago.</p>
<p>What works is depth on a genuine question. A page about root canal cost that explains the procedure, the variables affecting price, what changes between a molar and an incisor, and what the follow-up involves will outrank a page that repeats the phrase forty times. The searcher stays on it, does not bounce back to the results, and that behaviour is visible.</p>
<p>For businesses in healthcare, finance, legal or anything affecting wellbeing, Google applies stricter assessment. Named authors with real qualifications, review dates, accurate information and clear organisational identity carry more weight than any on-page tactic in those categories.</p>
<p>We also write for answer engines now, not only for the ten blue links. That means short self-contained answers near the top of each page, clear question-format headings, and FAQs present in the HTML rather than injected by JavaScript. Content structured this way gets pulled into featured snippets and AI summaries far more reliably.</p>
H],

  ['h2' => 'Authority and Links',
   'html' => <<<'H'
<p>Links remain a significant ranking factor, and the Pakistani market has an unusually large supply of people selling bad ones. Private blog networks, bulk directory packages and paid guest post farms all work briefly and then cost you more than they gained.</p>
<p>Our approach is slower and duller. Pakistani business directories that real people use, chamber of commerce and trade association listings, industry publications, university and institutional pages where you have a genuine relationship, supplier and partner sites, and local press when you have something actually newsworthy.</p>
<p>Digital PR works when there is a real story. Original data from your own business, a genuinely useful free tool, or research nobody else has published will earn links without paying for them. This takes longer than buying a package and it survives algorithm updates, which the package does not.</p>
H],

  ['h2' => 'Timelines, Reporting and What You Should Expect',
   'html' => <<<'H'
<p>Honest ranges, based on what we actually see:</p>
<ul>
<li><strong>Local service businesses:</strong> visible ranking movement in 30 to 60 days, meaningful enquiry growth by month three.</li>
<li><strong>Competitive urban categories:</strong> three to six months to solid positions, longer if the site starts with significant technical debt.</li>
<li><strong>Healthcare, finance, legal and property:</strong> six to twelve months, because those categories are assessed more strictly and the credibility work takes time to build.</li>
<li><strong>New domains with no history:</strong> add roughly three months to any of the above.</li>
</ul>
<p>Reporting runs weekly for rank tracking and monthly for the full picture. The monthly report shows positions on the keywords that matter, organic traffic, and the enquiries that came from it. Impressions and total keyword counts are easy to inflate and mean very little, so they are context rather than headline numbers.</p>
<p>If a month goes badly you will hear it from us before you notice it yourself. That is the whole point of tracking weekly.</p>
H],

 ],
 'faqs' => [
  ['q'=>'How long does SEO take to work?','a'=>'Local service businesses usually see ranking movement within 30 to 60 days and enquiry growth by month three. Competitive categories such as property, healthcare groups and finance take six to twelve months because Google assesses those results more strictly. A brand new domain adds roughly three months to any of those estimates.'],
  ['q'=>'What does SEO cost in Pakistan?','a'=>'It depends on how many services and areas need covering, how much content already exists, and how competitive your category is. A single-location clinic needs far less work than a multi-campus school or a developer with twenty projects. We quote after the audit rather than selling fixed packages, because a package price is a guess made before anyone has looked at the site.'],
  ['q'=>'Can you guarantee first page rankings?','a'=>'No, and nobody honestly can. Google does not sell or guarantee positions. Any agency offering a guaranteed number one is either targeting keywords nobody searches or planning to use tactics that will eventually cost you the site. What we commit to is a written plan, weekly tracking and monthly reporting tied to enquiries.'],
  ['q'=>'Do I need SEO if I am already running Google Ads?','a'=>'They serve different purposes. Ads stop the moment you stop paying; SEO compounds but takes months to build. Most businesses that can afford both run ads for immediate coverage while SEO develops, then reduce ad spend on the terms organic has taken over. If budget only allows one, the answer depends on how urgently you need leads.'],
  ['q'=>'Will you need access to my website and Google accounts?','a'=>'Yes for meaningful work. Search Console and Analytics access lets us see what is actually happening rather than guessing. Site access is needed for technical fixes, though we can also supply changes for your own developer to implement if you prefer. The free audit only needs your URL.'],
 ],
],

/* ============================================================
   PPC AND GOOGLE ADS
   ============================================================ */
'ppc' => [
 'quick' => 'Paid search buys visibility immediately while SEO builds. Done properly it is measurable to the rupee: every click, enquiry and sale traceable back to a keyword. Done badly it quietly burns budget on broad match traffic that was never going to convert, which is what most underperforming Pakistani accounts are actually doing.',
 'sections' => [

  ['h2' => 'When Paid Search Is the Right Spend',
   'html' => <<<'H'
<p>Ads are not automatically the answer, and we will say so when they are not. They make sense when you need leads before SEO can realistically deliver, when your category is so competitive that organic will take a year, when you are launching something new with no search history, or when demand is seasonal and you need to be visible during a narrow window.</p>
<p>They make less sense when your margins cannot absorb the click cost, when your website converts badly enough that paid traffic will simply leak away, or when nobody is searching for what you sell yet. Running ads to a page that converts at half a percent is buying an expensive lesson.</p>
<p>The first thing we check is whether the landing experience can hold the traffic. Fixing a slow, confusing or trust-poor page before spending on clicks routinely doubles the return on the same budget.</p>
H],

  ['h2' => 'Account Structure and Keyword Discipline',
   'html' => <<<'H'
<p>Most inherited Pakistani accounts have the same problems. Broad match everywhere, no negative keyword list, one campaign covering six unrelated services, and conversion tracking that either does not exist or fires on page loads rather than actual enquiries.</p>
<p>What we build instead:</p>
<ul>
<li><strong>Tight campaign and ad group structure,</strong> so each group covers a small set of closely related terms with ad copy that matches them specifically. Relevance lowers cost per click and raises position at the same time.</li>
<li><strong>Match type control.</strong> Exact and phrase match for the terms you know convert, broad match used deliberately and monitored rather than left running.</li>
<li><strong>A negative keyword list that grows weekly.</strong> This is where most wasted spend hides. Free, jobs, salary, course, and dozens of category-specific terms drain budget silently.</li>
<li><strong>Search term reports reviewed properly,</strong> not skimmed. The queries that actually triggered your ads tell you more than any keyword tool.</li>
<li><strong>Geographic and schedule targeting</strong> matched to where and when your customers actually convert, rather than running nationwide at 3am by default.</li>
</ul>
H],

  ['h2' => 'Conversion Tracking Is Not Optional',
   'html' => <<<'H'
<p>An account without correct conversion tracking is not being managed, it is being guessed at. Yet a large share of Pakistani accounts we inherit either track nothing or track the wrong thing.</p>
<p>For most businesses here that means tracking form submissions as distinct events, call clicks from mobile, WhatsApp click-throughs, and where possible the enquiries that actually became customers. WhatsApp matters particularly, because for a great many Pakistani businesses it is the primary contact channel and an account that ignores it is blind to most of its own results.</p>
<p>Once tracking is honest, the optimisation work becomes straightforward. You can see which keywords produce enquiries and which produce clicks, shift budget accordingly, and stop the arguments about whether the campaign is working.</p>
H],

  ['h2' => 'Beyond Google Search',
   'html' => <<<'H'
<p><strong>Google Display and YouTube.</strong> Useful for awareness and remarketing, wasteful as a primary lead channel for most service businesses. Remarketing to people who already visited your site is usually the highest-return display spend available.</p>
<p><strong>Meta ads, Facebook and Instagram.</strong> Strong for consumer categories with visual products, and for interest-based targeting where search demand does not exist yet. Pakistani audiences on Meta skew younger and more mobile than on search, and creative quality matters far more than targeting sophistication.</p>
<p><strong>Google Shopping.</strong> For e-commerce with a proper product feed, this frequently outperforms text ads on cost per sale. Feed quality does most of the work, and most Pakistani feeds are incomplete.</p>
<p><strong>TikTok.</strong> Increasingly viable for consumer brands in Pakistan, particularly beauty, fashion and food. Creative-led rather than targeting-led, and it burns out faster, so it needs constant new material.</p>
<p>We recommend the channels that fit your buying cycle rather than the ones that are easiest to bill for.</p>
H],

  ['h2' => 'Budget, Management and What Gets Reported',
   'html' => <<<'H'
<p>Ad budget and management fee are separate. The budget goes to Google or Meta and we never take a cut of it, because a percentage-of-spend model gives the agency a direct incentive to spend more of your money. Management is a flat monthly fee based on account complexity.</p>
<p>Starting budgets depend entirely on category. A local clinic in Multan can produce meaningful volume on a fraction of what a Karachi property developer needs to be competitive. We will estimate a realistic floor before you commit, and if that floor is above what you can spend, we will say the campaign is not viable rather than take the fee anyway.</p>
<p>Monthly reporting shows spend, clicks, cost per click, conversions, cost per conversion, and where possible revenue attributed. The headline number is cost per enquiry, because that is the one that determines whether the channel is worth continuing.</p>
H],

 ],
 'faqs' => [
  ['q'=>'How much should I budget for Google Ads in Pakistan?','a'=>'It varies enormously by category. Competitive terms in property, legal and healthcare in Karachi or Lahore cost multiples of what a local service term costs in Quetta or Multan. We estimate a realistic minimum before you commit, and if your budget falls below what the category needs to produce results, we will tell you rather than take the work.'],
  ['q'=>'Do you take a percentage of my ad spend?','a'=>'No. Management is a flat monthly fee and the ad budget goes directly to the platform. Percentage-of-spend pricing gives an agency a direct incentive to spend more of your money, which is not an incentive you want your agency to have.'],
  ['q'=>'Should I run ads or invest in SEO?','a'=>'Ads produce leads immediately and stop when you stop paying. SEO takes months and compounds. Most businesses that can afford both run ads while SEO builds, then reduce spend on the terms organic takes over. If you can only do one, it depends on how urgently you need enquiries and how competitive your category is.'],
  ['q'=>'Why is my current campaign spending money without producing leads?','a'=>'The usual causes are broad match keywords with no negative list, ads pointing at a homepage instead of a relevant landing page, conversion tracking that is missing or misconfigured, and a website that cannot convert the traffic it receives. An account audit normally identifies which of these applies within a day.'],
  ['q'=>'Can you track WhatsApp enquiries from ads?','a'=>'Yes, and it matters a great deal in Pakistan because WhatsApp is the primary contact channel for most businesses here. Click-to-WhatsApp events can be tracked as conversions, which usually reveals that campaigns were performing considerably better than the reporting suggested.'],
 ],
],

/* ============================================================
   SOCIAL MEDIA
   ============================================================ */
'social-media' => [
 'quick' => 'Social media works in Pakistan when it is treated as a distribution and trust channel rather than a posting schedule. Facebook still carries the widest reach, Instagram drives consumer discovery, TikTok has become genuinely commercial, and WhatsApp is where most of the actual selling happens.',
 'sections' => [

  ['h2' => 'How Pakistani Social Media Actually Behaves',
   'html' => <<<'H'
<p>International social media playbooks translate badly here, and following them is why so many Pakistani business pages post diligently and sell nothing.</p>
<p><strong>Facebook</strong> remains the widest-reach platform in Pakistan across age groups and cities, and it is still where community groups, marketplace activity and older audiences live. Businesses that wrote it off because it looks unfashionable elsewhere have usually abandoned their largest available audience.</p>
<p><strong>Instagram</strong> drives discovery for anything visual: food, fashion, beauty, interiors, travel, weddings. Urban and skewing younger and more affluent. Reels reach considerably further than static posts.</p>
<p><strong>TikTok</strong> has become commercially serious in Pakistan, particularly for beauty, fashion, food and consumer products. It rewards volume and personality over production budget, and content burns out fast, so it needs constant new material rather than a quarterly campaign.</p>
<p><strong>LinkedIn</strong> matters for B2B, exports, software services and professional recruitment, and it is very lightly used by Pakistani companies, which makes it unusually easy to stand out.</p>
<p><strong>WhatsApp</strong> is where the conversation moves once interest exists. Every other platform is really a funnel into it.</p>
H],

  ['h2' => 'Content That Earns Attention Rather Than Filling a Calendar',
   'html' => <<<'H'
<p>Posting five times a week because a content calendar says so produces very little. What produces results is a smaller amount of material people actually want to see.</p>
<p>The formats that consistently work for Pakistani businesses: showing the work being done rather than describing it, answering the questions customers ask before buying, before and after results with real permission, staff and behind-the-scenes material that makes the business feel like people rather than a logo, honest pricing content, and short educational clips in the language your audience speaks.</p>
<p>What consistently fails: stock imagery with a quote on it, festival greetings that mention nothing about your business, reposted content from international pages, and anything that reads as though it was written to fill a slot.</p>
<p>Language matters more here than most agencies allow for. Urdu and Roman Urdu captions frequently outperform English for consumer categories, while B2B and professional audiences expect English. Mixing them naturally, the way people actually speak, works better than choosing one and being rigid about it.</p>
H],

  ['h2' => 'Paid Distribution and Why Organic Alone Stalls',
   'html' => <<<'H'
<p>Organic reach on Facebook and Instagram has been declining for years. A page with ten thousand followers might reach a few hundred of them per post. Treating social media as a free channel means accepting that ceiling.</p>
<p>The productive model is to create content organically, identify which pieces earn genuine engagement, and put budget behind those specifically. This is far more efficient than designing an ad from scratch, because the audience has already told you what works.</p>
<p>Remarketing is the highest-return social spend available to most Pakistani businesses. Showing content to people who already visited your website, watched a video or engaged with your page costs a fraction of cold targeting and converts several times better.</p>
<p>Creative quality is the main lever on Meta now, more than targeting settings. The platform's own optimisation finds the audience if the creative earns attention. Weak creative cannot be rescued by clever targeting, which is the reverse of how most accounts are managed.</p>
H],

  ['h2' => 'Influencers and Community',
   'html' => <<<'H'
<p>Influencer marketing in Pakistan has matured past the point where follower count means anything useful. Engagement rate, audience location and content fit all matter more, and inflated follower numbers remain common enough that verification is worth the effort.</p>
<p>Micro-influencers, roughly five to fifty thousand followers with a specific niche, usually outperform larger accounts on cost per acquired customer. Their audiences trust them more and their rates are a fraction of the larger names.</p>
<p>Community management is the unglamorous half of this. Responding to comments and messages quickly, handling complaints in public without becoming defensive, and maintaining an actual presence in relevant Facebook groups builds more durable trust than any campaign. In Pakistan, where word of mouth is still the dominant referral mechanism, this compounds.</p>
H],

  ['h2' => 'What We Deliver and How It Is Measured',
   'html' => <<<'H'
<ul>
<li><strong>Channel strategy</strong> based on where your buyers actually are, rather than defaulting to all platforms at once.</li>
<li><strong>Content production</strong> including photography direction, short-form video, graphics and copy in English, Urdu or a natural mix.</li>
<li><strong>Paid distribution</strong> with proper conversion tracking, including click-to-WhatsApp events which most accounts ignore entirely.</li>
<li><strong>Community management</strong> covering comments, direct messages and reviews within agreed response times.</li>
<li><strong>Influencer selection and management</strong> with engagement verification before any payment is agreed.</li>
<li><strong>Monthly reporting</strong> focused on reach, engagement quality, website traffic and enquiries generated, not follower count.</li>
</ul>
<p>Follower growth is the metric clients ask about and the one that matters least. A page with two thousand engaged local followers who buy is worth more than fifty thousand who do not.</p>
H],

 ],
 'faqs' => [
  ['q'=>'Which social platform is best for a Pakistani business?','a'=>'Facebook still has the widest reach across age groups and cities. Instagram drives discovery for visual categories such as food, fashion, beauty and weddings. TikTok is now commercially serious for consumer products. LinkedIn matters for B2B and exports and is very lightly used, which makes it easy to stand out. The right answer depends on where your buyers actually are, not on which platform is fashionable.'],
  ['q'=>'How often should we post?','a'=>'Consistency matters more than frequency, and quality matters more than both. Three genuinely useful posts a week outperform daily filler. We would rather produce less material that earns attention than fill a calendar with content nobody engages with.'],
  ['q'=>'Do we need to spend on ads or is organic enough?','a'=>'Organic reach on Facebook and Instagram has declined to the point where relying on it alone caps your results severely. The efficient approach is creating content organically, seeing what earns real engagement, then putting budget behind those specific pieces. Remarketing to previous website visitors is usually the highest-return spend available.'],
  ['q'=>'Should our captions be in English or Urdu?','a'=>'For consumer categories, Urdu and Roman Urdu frequently outperform English. For B2B, professional services and exports, English is expected. Mixing them naturally, the way your customers actually speak, usually works better than committing rigidly to one.'],
  ['q'=>'Is influencer marketing worth it in Pakistan?','a'=>'It can be, provided you verify engagement rather than trusting follower counts, which are inflated often enough to matter. Micro-influencers with five to fifty thousand niche followers usually deliver better cost per customer than larger names, because their audiences trust them more and their rates are far lower.'],
 ],
],

/* ============================================================
   WEB DESIGN AND DEVELOPMENT
   ============================================================ */
'web-design' => [
 'quick' => 'A website has one job: turn visitors into enquiries. Most Pakistani business sites fail at it because they load slowly on mobile, hide their pricing, bury contact options and were never built with search in mind. We build sites that are fast, crawlable and structured so that SEO work later actually has something to work with.',
 'sections' => [

  ['h2' => 'Why Most Pakistani Business Websites Underperform',
   'html' => <<<'H'
<p>The pattern repeats across almost every audit. A site was built three or four years ago by whoever was cheapest, loaded with a heavy multipurpose theme and a dozen plugins, filled with stock imagery, and left alone since. It takes eight seconds to load on a mobile connection, the contact form has been broken for months without anyone noticing, and the pages are structured in a way that makes ranking them very difficult.</p>
<p>None of that is unusual and none of it is the owner's fault. The problem is that most web development here is sold as a one-time deliverable, disconnected from whether the site will ever be found or whether it converts anyone.</p>
<p>We build with the next two years in mind. That means a site fast enough to hold mobile visitors on variable connections, structured so that adding service and area pages later is straightforward, and instrumented so you can actually see what visitors do.</p>
H],

  ['h2' => 'Speed, and Why It Matters More Here',
   'html' => <<<'H'
<p>Pakistani traffic is overwhelmingly mobile, frequently on connections that vary considerably by area and time of day. A page that loads acceptably on office fibre can be unusable in Korangi at 8pm.</p>
<p>The work is unglamorous and effective. Modern image formats at correct dimensions rather than four megabyte JPEGs scaled down in the browser. Lazy loading below the fold. Removing render-blocking scripts and the plugins nobody uses. Server-level caching. A content delivery setup where it genuinely helps. Fonts loaded without blocking the first paint.</p>
<p>Core Web Vitals are part of how Google assesses page experience, so speed feeds ranking as well as conversion. But the commercial argument is simpler than the ranking one: visitors who leave before the page loads were never going to enquire, and on a slow Pakistani site that is a substantial share of everyone who arrived.</p>
H],

  ['h2' => 'Built to Convert, Not Just to Look Modern',
   'html' => <<<'H'
<p>Design decisions that consistently improve enquiry rates for Pakistani businesses:</p>
<ul>
<li><strong>WhatsApp as a primary contact route,</strong> not buried in a footer. A visible button with a pre-filled message consistently outperforms contact forms here, and it should exist on every page.</li>
<li><strong>Published pricing, even as ranges.</strong> Pakistani buyers compare aggressively and skip businesses that hide their prices behind a form. Hiding cost does not preserve negotiating room, it removes you from the shortlist.</li>
<li><strong>Real photography.</strong> Your premises, your team, your work. Stock imagery is recognisable and it undermines trust in a market where trust is the main obstacle.</li>
<li><strong>Trust signals placed early.</strong> Registration numbers, credentials, years in business, real reviews and a physical address. These matter more here than design polish.</li>
<li><strong>Forms that ask for less.</strong> Every additional required field loses submissions. Name, contact and a message is usually enough to start.</li>
<li><strong>Working mobile navigation and forms,</strong> tested on real devices rather than a browser resize.</li>
</ul>
H],

  ['h2' => 'Platform Choice',
   'html' => <<<'H'
<p><strong>WordPress</strong> suits most Pakistani businesses. It is flexible, the ecosystem is mature, you can maintain content yourself, and it does not lock you in. The risks are plugin bloat and neglected updates, both of which are manageable with discipline. This is what we recommend by default for service businesses, clinics, schools, agencies and content-driven sites.</p>
<p><strong>Shopify</strong> makes sense for e-commerce where you want the platform to handle hosting, security and payments and you are willing to accept the monthly cost and the constraints. Good for stores that want to launch quickly without technical overhead.</p>
<p><strong>WooCommerce</strong> suits e-commerce that needs more control, has unusual requirements, or wants to avoid platform fees. It requires more maintenance attention than Shopify.</p>
<p><strong>Custom development</strong> is worth it when you have genuinely unusual functional requirements. It is rarely worth it for a standard business website, and quoting custom builds for straightforward sites is a common way of inflating a project.</p>
<p>We will tell you which of these fits, including when the honest answer is that your existing site needs fixing rather than replacing. Rebuilding a site that only needs speed work and better content is an expensive way to solve the wrong problem.</p>
H],

  ['h2' => 'Built With SEO Rather Than Before It',
   'html' => <<<'H'
<p>A site built without search in mind creates work that has to be undone later. Common examples: a single page URL structure that leaves nowhere to add service or area pages, headings used for styling rather than hierarchy, content rendered entirely through JavaScript, image-based text, and no schema markup anywhere.</p>
<p>We build with a logical URL structure that has room to expand, proper heading hierarchy, server-rendered content, structured data appropriate to the business type, XML sitemaps, and Search Console and Analytics configured from launch rather than months later.</p>
<p>Launch also includes redirect mapping when replacing an existing site. Losing accumulated rankings because old URLs were not redirected is one of the most costly and most preventable mistakes in a website rebuild, and it happens constantly.</p>
H],

 ],
 'faqs' => [
  ['q'=>'How long does a website take to build?','a'=>'A straightforward business site with a handful of pages typically takes three to five weeks including content and revisions. Larger sites with many service or area pages, or e-commerce with a substantial catalogue, take longer. The main variable is usually how quickly content and photography can be gathered, not development time.'],
  ['q'=>'Should I rebuild my site or fix the one I have?','a'=>'Often fixing is the better answer. If the structure is sound and the problems are speed, content and conversion, fixing costs far less and preserves your existing rankings. Rebuilding makes sense when the platform is genuinely unmaintainable or the structure leaves no room to grow. We will say which applies after looking at it.'],
  ['q'=>'WordPress or Shopify?','a'=>'WordPress for most service businesses, clinics, schools and content-driven sites, because it is flexible and you keep control. Shopify for e-commerce that wants the platform to handle hosting, payments and security in exchange for a monthly fee. WooCommerce sits in between when you need more control over an online store.'],
  ['q'=>'Will a new website hurt my current Google rankings?','a'=>'It can, badly, if old URLs are not redirected to their new equivalents. Redirect mapping is the single most important technical step in any rebuild and it is skipped surprisingly often. Done properly, rankings usually recover within a few weeks and then improve if the new site is faster and better structured.'],
  ['q'=>'Do you provide hosting and ongoing maintenance?','a'=>'We can advise on hosting suited to your traffic and set it up, and we offer maintenance covering updates, backups, security monitoring and small content changes. Maintenance is optional. If you would rather handle it internally we will hand over documentation and access without complication.'],
 ],
],
/* ============================================================
   LOCAL SEO
   ============================================================ */
'local-seo' => [
 'quick' => 'Local SEO is the work of appearing in the three map results that sit above everything else when someone searches near me. For clinics, salons, restaurants, workshops and any business with a physical location, that block decides most of the outcome. It is driven by your Google Business Profile, your reviews and your area pages.',
 'sections' => [

  ['h2' => 'The Map Pack Is a Separate Competition',
   'html' => <<<'H'
<p>When someone in Pakistan searches for a dentist, a salon, a repair service or a restaurant, Google shows three business listings with a map before any website result. Most people call one of those three. Organic position four is close to invisible for these searches.</p>
<p>The important point is that the map pack runs on different signals from organic rankings. A site can rank well organically and be absent from the map entirely, or dominate the map with a mediocre website. They are related but separately won.</p>
<p>Three factors drive placement. Proximity, meaning how close you are to whoever is searching, which you cannot change. Relevance, meaning how well your profile matches the search. Prominence, meaning how established and active your business appears across the web. The second and third are entirely within your control and most Pakistani businesses have barely touched either.</p>
<p>We have moved clinics and service businesses into the top three purely through profile work, before touching the website at all. That is unusual across SEO generally and specific to how heavily local search depends on these signals.</p>
H],

  ['h2' => 'Google Business Profile, Done Properly',
   'html' => <<<'H'
<p>Most Pakistani profiles are claimed, half filled and then abandoned. The gap between that and a properly maintained profile is large.</p>
<ul>
<li><strong>Primary category is the highest-leverage setting on the entire profile.</strong> A practice offering orthodontics but categorised generically as a dental clinic will lose orthodontic searches to a correctly categorised competitor. Secondary categories cover the rest of what you do.</li>
<li><strong>Every service listed individually,</strong> with descriptions. Each service listed creates a match for the corresponding search.</li>
<li><strong>Real photographs, added regularly.</strong> Exterior so people can find you, interior so they can judge the place, your team, your work. Profiles with recent photo activity outperform static ones.</li>
<li><strong>Accurate hours,</strong> including Friday prayer adjustments, Ramadan timings and public holidays. A great deal of searching happens outside working hours and people filter for what is open.</li>
<li><strong>Products, posts and offers</strong> used actively rather than left empty.</li>
<li><strong>Questions and answers seeded</strong> with what customers genuinely ask, answered by you rather than left to strangers.</li>
<li><strong>Correct service area</strong> for businesses that travel to customers rather than receiving them.</li>
</ul>
H],

  ['h2' => 'Reviews: The Signal Most Businesses Get Wrong',
   'html' => <<<'H'
<p>Reviews are the strongest prominence signal available and the most common point of failure. Businesses either never ask, ask once and stop, or take shortcuts that put the profile at risk of suspension.</p>
<p>What works is a repeatable process rather than a campaign. Ask at the moment of satisfaction, which for most businesses is immediately after the service while the customer is still present. Make it frictionless with a short link or a QR code at the counter. Ask consistently every week rather than in bursts, because steady flow signals an active business while a sudden spike looks manufactured and often gets filtered.</p>
<p>Never incentivise reviews, never write them internally and never buy them. Google detects manipulation reliably, and for a business dependent on the map pack a suspension is close to fatal. We have seen Pakistani businesses lose a profile built over years because of a package bought for a few thousand rupees.</p>
<p>Respond to everything. Brief thanks for positive reviews, professional replies to critical ones without becoming defensive and without disclosing customer details. Prospective customers read the responses closely, and a well-handled complaint often builds more confidence than an unbroken row of five stars.</p>
H],

  ['h2' => 'Citations, Consistency and Area Pages',
   'html' => <<<'H'
<p><strong>Citations</strong> are mentions of your business name, address and phone number across the web. Pakistani business directories, chambers of commerce, trade associations, industry listings and relevant local platforms. The count matters less than the consistency. Conflicting phone numbers or addresses across listings actively weaken your local ranking, and we usually find several when auditing an established business.</p>
<p><strong>Area pages</strong> extend your reach beyond your immediate proximity. A clinic in DHA Karachi will naturally rank near DHA and struggle further out, but a substantive page about serving Clifton or Gulshan can pull in organic traffic from those areas.</p>
<p>The word substantive is doing real work in that sentence. A template with the area name swapped in is a doorway page, Google filters them, and they look cheap to human visitors too. A page that genuinely describes serving that area, references real landmarks and access routes, addresses parking and transport, and includes work or reviews from customers there will hold its position.</p>
<p>Multi-location businesses need a separate profile and a separate page per location, each with its own address, phone number and hours. Sharing one page across three branches means competing weakly in three places instead of strongly.</p>
H],

  ['h2' => 'What Local SEO Delivers, and How Fast',
   'html' => <<<'H'
<p>Local work produces results faster than most other SEO because the signals move quickly. A profile that has been neglected can show improvement within two to four weeks of being properly configured. Review flow compounds over two to three months. Area pages follow the normal organic timeline of two to four months.</p>
<p>In less contested cities, Quetta, Peshawar, Multan and smaller markets, basic professional local work frequently reaches the top three within a quarter, because most competitors have unclaimed or half-complete profiles. In Karachi and Lahore the same work takes longer and needs more supporting content, but the fundamentals are identical.</p>
<p>Reporting covers map pack positions tracked from multiple points across your city, profile views, direction requests, calls from the profile, and website clicks. Those are all measurable, which makes local SEO one of the easier channels to hold an agency accountable on.</p>
H],

 ],
 'faqs' => [
  ['q'=>'Why is my business not showing in Google Maps results?','a'=>'The usual causes are an unverified or incomplete profile, the wrong primary category, missing service listings, too few or stale reviews, inconsistent business details across directories, or simply distance from where people are searching. Comparing your profile against the competitors currently ranking usually identifies it within a day.'],
  ['q'=>'How many Google reviews do I need to rank in the map pack?','a'=>'There is no threshold number. Steady recent flow relative to your local competitors matters more than total count. A business adding several genuine reviews each month generally outperforms one with a larger total collected years ago and nothing since.'],
  ['q'=>'Can I rank in areas where I do not have a branch?','a'=>'Organically yes, with genuinely substantive area pages. In the map pack, proximity weighs heavily, so reach into distant areas is limited. If a neighbouring area matters commercially, a second verified location with its own profile is the reliable answer.'],
  ['q'=>'Is it safe to buy Google reviews?','a'=>'No. Google detects review manipulation reliably and the consequences range from filtered reviews to full profile suspension. For a business that depends on the map pack, losing the profile is close to losing the business. We have seen established Pakistani businesses lose years of accumulated standing this way.'],
  ['q'=>'Do I need a physical address to do local SEO?','a'=>'For the map pack you need a verifiable address, or a defined service area with staff who genuinely travel to customers. Virtual offices and shared addresses are routinely flagged and suspended. Without a real presence, organic rankings for local keywords are still achievable but the map pack is not.'],
 ],
],

/* ============================================================
   CONTENT MARKETING
   ============================================================ */
'content' => [
 'quick' => 'Content marketing means publishing material that answers what your customers are already searching for, so they find you before they are ready to buy. In Pakistan the highest-return content is usually the most mundane: honest pricing, process explanations and the questions your sales team answers on the phone every day.',
 'sections' => [

  ['h2' => 'The Content Most Pakistani Businesses Should Write First',
   'html' => <<<'H'
<p>Ask most agencies for a content plan and you get a blog calendar full of industry trends and listicles. Those rank poorly, take months to gain traction and rarely produce enquiries.</p>
<p>The content that actually works is far less exciting. Pricing pages, because cost is among the most searched aspects of almost every service in Pakistan and almost nobody publishes it. Process explanations, because buyers want to know what happens and how long it takes before they commit. Comparison pages, because people are choosing between options and want help doing it. And the twenty questions your sales team answers on the phone every single week, which are by definition the questions your market is asking.</p>
<p>Publishing honest price ranges is the single change we recommend most often and the one clients resist most. The objection is that it removes negotiating room. In practice it removes unqualified enquiries, wins featured snippets that competitors have left unclaimed, and gets you onto shortlists you were previously invisible for.</p>
H],

  ['h2' => 'Writing for Search and for Answer Engines',
   'html' => <<<'H'
<p>Search results have changed. Alongside the traditional ten links there are featured snippets, people also ask boxes, and AI-generated summaries that answer the question without anyone clicking. Content written only for the old format increasingly loses out.</p>
<p>What gets extracted into those formats has a recognisable shape. A short, self-contained answer near the top of the page, usually under sixty words. Clear question-format headings. Structured lists and tables where the information suits them. FAQs present in the page HTML rather than injected by JavaScript, which answer engines frequently cannot read.</p>
<p>None of this means writing shallow content. The pages that get pulled into AI answers are usually thorough ones that happen to open with a clear summary. The summary earns the extraction, the depth earns the trust that keeps you being cited.</p>
<p>For any topic touching health, money or safety, named authors with real credentials, visible review dates and accurate information matter more than any structural technique. Google assesses those categories more strictly and anonymous content struggles regardless of quality.</p>
H],

  ['h2' => 'Language: English, Urdu or Both',
   'html' => <<<'H'
<p>This gets decided by data rather than preference. We look at your Search Console queries before recommending anything, because the answer varies more than people expect.</p>
<p>English remains the default for commercial search in professional services, B2B, exports, technology and the premium urban consumer market. A software house in Lahore selling to overseas clients has no reason to publish Urdu.</p>
<p>Roman Urdu carries genuine volume in consumer categories including health, education, home services, food and retail, and it is systematically underreported by keyword tools. That means competitors are usually not optimising for it. The right approach is normally weaving these phrases naturally into English pages rather than building separate ones.</p>
<p>Full Urdu pages make sense selectively, typically for consumer explainers in healthcare, education and government-adjacent topics where a broader audience is reading. They also capture voice search, which skews toward first language much more heavily than typed search does.</p>
H],

  ['h2' => 'Publishing Cadence and Seasonality',
   'html' => <<<'H'
<p>Volume is not the goal. One well-researched page that ranks is worth more than eight thin posts that do not, and thin content published at scale can actively drag a site down.</p>
<p>Timing matters more than frequency in seasonal categories, which covers a great deal of Pakistani business. Pages need roughly six to twelve weeks to index and establish position, so content has to be published ahead of demand rather than during it.</p>
<ul>
<li><strong>Education:</strong> admission content published September to November, ahead of the January to April cycle.</li>
<li><strong>Travel:</strong> northern areas content in December and January, Umrah content ahead of Ramadan.</li>
<li><strong>Weddings and beauty:</strong> bridal content in the second quarter, before the October to February season.</li>
<li><strong>Agriculture and export:</strong> mango and crop content in December to February, well before the season opens.</li>
<li><strong>Retail and e-commerce:</strong> Eid and sale content roughly two months before the event.</li>
</ul>
<p>Existing seasonal pages should be updated each year rather than replaced. A page with three years of ranking history that gets refreshed will consistently outperform a new page published from scratch every season.</p>
H],

  ['h2' => 'What You Get and How It Is Measured',
   'html' => <<<'H'
<p>A content engagement typically includes a keyword and question map built from your Search Console data, competitor gaps and what your own sales team hears; a publishing calendar aligned to your seasonality; the writing itself, researched properly and written by someone who understands the sector; on-page optimisation including internal linking, headings and schema; and periodic refreshes of existing pages, which frequently produces better returns than publishing new ones.</p>
<p>Measurement is straightforward. Rankings for the target questions, organic traffic to the pages produced, featured snippet and AI answer capture, time on page and scroll depth as a quality check, and the enquiries attributable to content pages. If a page is not earning its place after six months, we rewrite it or remove it rather than leaving it to dilute the site.</p>
H],

 ],
 'faqs' => [
  ['q'=>'How often should we publish new content?','a'=>'Less often than most agencies suggest and better each time. One well-researched page that ranks is worth more than eight thin posts, and publishing thin content at volume can actively harm a site. For most Pakistani businesses two to four substantial pages a month, timed around their seasonality, works better than a daily blog.'],
  ['q'=>'Should we publish our prices?','a'=>'In most categories, yes. Cost is among the most searched aspects of nearly every service in Pakistan and almost nobody publishes it, which leaves the featured snippet unclaimed. Publishing honest ranges filters out unqualified enquiries and gets you onto shortlists you were previously invisible for.'],
  ['q'=>'Does AI-written content rank?','a'=>'Google judges content on whether it is useful and demonstrates real experience, not on how it was produced. Generic machine-generated material without genuine expertise or first-hand knowledge tends not to rank, because it says nothing the twenty other pages on the topic do not already say. What ranks is content containing information only someone who does the work would know.'],
  ['q'=>'Should our content be in English or Urdu?','a'=>'It depends on your category and your actual search data rather than a general rule. Professional services, B2B and exports skew heavily English. Consumer categories see genuine Roman Urdu volume that keyword tools underreport and competitors ignore. We look at your Search Console queries before recommending anything.'],
  ['q'=>'How long before content starts producing traffic?','a'=>'Six to twelve weeks for a page to index and establish position, longer in competitive categories. This is why seasonal content has to be published well ahead of the season rather than during it. Publishing your summer tour pages in June means they start ranking in August, when the season is closing.'],
 ],
],
    ];
}
