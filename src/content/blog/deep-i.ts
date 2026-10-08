import type { Deep } from "./deep";

export const DEEP_I: Record<string, Deep> = {
  /* ------------------------------------------------------------------ 37 salary */
  "seo-expert-salary-pakistan": {
    blocks: [
      { type: "h2", text: "How salaries differ by city and employer type" },
      { type: "p", text: "SEO salaries vary between cities and between types of employer. Karachi, Lahore and Islamabad have the most SEO roles, with software houses, agencies serving international clients and larger in-house teams often paying more than small local agencies. Rawalpindi, Faisalabad, Multan and other cities have fewer roles, but remote work has narrowed the gap, because skilled professionals can now work for employers anywhere." },
      { type: "table", caption: "How employer type tends to affect pay", head: ["Employer type", "Typical pay level", "Notes"], rows: [
        ["Small local agency", "Lower to moderate", "Broad exposure, many clients, fast learning"],
        ["Agency serving international clients", "Moderate to higher", "English communication and reporting skills valued"],
        ["Software house or SaaS company", "Moderate to higher", "Technical SEO and content strategy valued"],
        ["Large in-house team", "Moderate to higher", "Deep focus on one brand, clear career ladder"],
        ["Remote role for overseas company", "Often highest", "Requires reliability and strong communication"],
      ] },
      { type: "callout", tone: "note", title: "Indicative patterns", text: "These are general patterns we observe, not survey data. Individual offers depend heavily on skills, results and negotiation." },
      { type: "h2", text: "Negotiating an SEO salary" },
      { type: "p", text: "Many SEO professionals in Pakistan undervalue their work in negotiations. The strongest position comes from evidence: a portfolio showing measurable results, examples of reports you have produced, and clear explanations of problems you have solved. Research typical ranges for similar roles, consider the whole package including flexibility and learning opportunities, and be ready to explain how your work will contribute to the employer’s revenue or growth." },
      { type: "list", items: [
        "Bring a results log with dated examples.",
        "Know the typical range for the role and city.",
        "Explain your value in terms of business outcomes.",
        "Consider training, flexibility and growth, not only salary.",
        "Ask how performance will be reviewed and when.",
      ] },
      { type: "h2", text: "Building income through freelancing alongside a job" },
      { type: "p", text: "Some SEO professionals add freelance work alongside a full-time job. This can raise income and broaden experience, but it requires care: check your employment contract for restrictions, avoid conflicts of interest with your employer’s clients, and keep freelance work to a manageable level so your main job does not suffer. Over time, a few reliable long-term freelance clients can grow into an independent consulting practice if that is the direction you want." },
      { type: "h2", text: "How AI is affecting SEO salaries" },
      { type: "p", text: "AI tools have automated some routine SEO tasks, such as drafting basic content or summarising data. At the same time, demand has grown for professionals who understand AI search, can use AI tools productively and can judge quality. In practice, SEO professionals who combine solid fundamentals with AI skills are positioned for higher pay, while those offering only routine tasks face more price pressure." },
      { type: "compare", title: "Skills under pressure versus skills in demand", left: { label: "Under price pressure", items: [
        "Basic article writing without expertise",
        "Bulk directory submissions",
        "Simple keyword lists",
        "Template reports with no analysis",
      ] }, right: { label: "In growing demand", items: [
        "Strategy and prioritisation",
        "Technical SEO and site architecture",
        "Optimising for AI search and answer engines",
        "Analysis tied to revenue and leads",
      ] } },
      { type: "h2", text: "Career progression timeline" },
      { type: "process", title: "A typical SEO career path", steps: [
        { title: "Trainee", text: "Learning tools and fundamentals" },
        { title: "Executive", text: "Delivering tasks under supervision" },
        { title: "Specialist", text: "Owning client accounts or a site" },
        { title: "Lead", text: "Managing a team and strategy" },
        { title: "Head or consultant", text: "Setting direction, advising businesses" },
      ] },
      { type: "p", text: "Progress depends more on results and responsibility than on years. Some professionals move from executive to specialist within two years by owning results and communicating well; others stay at the same level longer because they focus only on tasks. Seek responsibility early, document what you achieve and keep learning, and progression tends to follow." },
    ],
    faqs: [
      { q: "Which Pakistani cities pay the most for SEO jobs?", a: "Karachi, Lahore and Islamabad have the most roles and often higher pay, but remote work for international employers has reduced the gap for skilled professionals in other cities." },
      { q: "How do I negotiate a higher SEO salary?", a: "Bring evidence of measurable results, know the typical range for the role and city, explain your value in business terms and consider the whole package including training and flexibility." },
    ],
  },

  /* ------------------------------------------------------------------ 38 AI SEO */
  "ai-seo-expert": {
    blocks: [
      { type: "h2", text: "Practical AI workflows for SEO" },
      { type: "p", text: "Used well, AI tools save hours on repetitive SEO work while leaving judgement to people. A few workflows have proved especially useful in day-to-day practice. Keyword clustering groups thousands of search terms into topics, making content planning faster. Summarising Search Console exports highlights pages and queries that have changed. Drafting outlines and FAQ ideas speeds up content briefs. Writing structured data and regular expressions reduces technical busywork. Reviewing crawl exports helps spot patterns in large sites." },
      { type: "table", caption: "AI-assisted SEO workflows", head: ["Task", "How AI helps", "Human role"], rows: [
        ["Keyword clustering", "Groups terms by topic and intent", "Checks groupings and assigns pages"],
        ["Data summaries", "Highlights changes in exports", "Interprets causes and decides actions"],
        ["Content briefs", "Suggests outlines and questions", "Adds expertise and business context"],
        ["Schema markup", "Drafts JSON-LD from page content", "Validates and matches visible content"],
        ["Crawl analysis", "Spots patterns in large exports", "Prioritises fixes by impact"],
      ] },
      { type: "h2", text: "Quality control for AI-assisted content" },
      { type: "p", text: "AI can help produce content faster, but quality control is essential, especially in Pakistan where many AI tools have limited knowledge of local prices, regulations, places and customs. Every AI-assisted draft should be checked by someone who knows the subject, with facts verified against reliable sources, local details added from real experience, and generic filler removed. Content that reads like every other page on the topic adds little value, regardless of how it was produced." },
      { type: "checklist", title: "AI content review checklist", items: [
        "Every fact, figure and claim verified",
        "Local details checked: prices, places, regulations",
        "First-hand experience and examples added",
        "Generic filler and repetition removed",
        "Tone matched to the brand and audience",
        "A named expert reviewed the final version",
      ] },
      { type: "h2", text: "Entities and how AI understands your business" },
      { type: "p", text: "AI systems understand the web partly in terms of entities: businesses, people, places, products and the relationships between them. A business that is described consistently across its website, Business Profile, social profiles, directories and news mentions is easier for AI to understand and represent accurately. Inconsistent names, addresses, services or descriptions create confusion, which can lead to incorrect or missing information in AI-generated answers." },
      { type: "list", items: [
        "Use the same business name, address and phone number everywhere.",
        "Describe your services consistently across your website and profiles.",
        "Publish an About page with founders, history and credentials.",
        "Add Organisation or LocalBusiness structured data that matches visible content.",
        "Correct inaccurate information on third-party sites when you find it.",
      ] },
      { type: "h2", text: "Measuring the impact of AI search" },
      { type: "p", text: "AI search changes what you should measure. Some searches now end with an AI answer and no click, so traffic alone may understate your visibility. Track impressions in Search Console alongside clicks, monitor referral traffic from AI assistants in Analytics, check regularly how AI tools describe your business, and keep measuring enquiries and revenue. If enquiries hold steady or grow while clicks change, your visibility may simply be shifting to new formats." },
      { type: "stats", title: "AI-era SEO metrics", items: [
        { value: "Impressions", label: "Visibility in search, including AI features" },
        { value: "Referrals", label: "Visits from AI assistants" },
        { value: "Mentions", label: "How AI tools describe and cite you" },
        { value: "Leads", label: "Enquiries and revenue, the final measure" },
      ] },
      { type: "h2", text: "Choosing an AI SEO expert" },
      { type: "p", text: "Look for someone with strong SEO fundamentals who also understands how AI search works and uses AI tools responsibly. Ask how they use AI in their own workflow, how they check quality, how they would improve your visibility in AI answers and how they would measure it. Be cautious of anyone promising guaranteed placement in ChatGPT or AI Overviews, or proposing to publish large volumes of unedited AI content." },
    ],
    faqs: [
      { q: "How do SEO experts use AI tools?", a: "For keyword clustering, summarising data, drafting outlines and FAQs, writing schema and analysing crawls, with people checking quality, adding expertise and making decisions." },
      { q: "Can AI-written content rank in Pakistan?", a: "It can when it is checked and improved by a subject expert, with verified facts, local details and first-hand experience. Unedited generic AI content usually adds little value." },
    ],
  },

  /* ------------------------------------------------------------------ 39 GEO */
  "seo-for-chatgpt-and-google-ai-search": {
    blocks: [
      { type: "h2", text: "How AI assistants choose which sources to cite" },
      { type: "p", text: "AI assistants that browse the web generally follow a similar pattern: they interpret the question, search an index or the live web for relevant pages, read passages from those pages, and compose an answer, often with citations. Pages are more likely to be used when they are accessible to the assistant’s crawler, clearly relevant to the question, easy to extract information from, and consistent with other trustworthy sources. Exact methods differ between products and change often, so focus on qualities that help across all of them." },
      { type: "checklist", title: "Qualities that make a page citable", items: [
        "Accessible to the relevant crawlers and indexed in major search engines",
        "A direct answer to the question near the top",
        "Specific, verifiable facts rather than vague claims",
        "Clear structure with headings, lists and tables",
        "Consistency with what other trusted sources say",
        "Clear authorship and up-to-date information",
      ] },
      { type: "h2", text: "Writing for both people and AI" },
      { type: "p", text: "The good news is that content written well for people is usually good for AI too. Start each important page with a short, direct answer. Use headings that match the questions people ask. Put key facts, such as prices, timelines, locations and steps, in plain text, lists or tables rather than images. Explain terms the first time you use them. Keep each section focused on one idea, so a passage can be understood on its own if an AI system quotes it." },
      { type: "compare", title: "Passages AI struggles with versus passages it can use", left: { label: "Hard to use", items: [
        "Long introductions before any answer",
        "Key facts hidden in images",
        "Sections that depend on earlier context",
        "Vague marketing language",
      ] }, right: { label: "Easy to use", items: [
        "A clear answer in the first sentences",
        "Facts in text, lists and tables",
        "Self-contained sections",
        "Specific, factual language",
      ] } },
      { type: "h2", text: "GEO for local businesses" },
      { type: "p", text: "Local businesses are increasingly recommended by AI assistants when people ask questions like “good physiotherapist in Islamabad” or “where can I get my AC repaired in Bahria Town”. These answers draw on business profiles, reviews, directories and websites. Local GEO therefore looks a lot like strong local SEO: a complete Business Profile, consistent details across the web, detailed reviews that mention services and areas, and clear website pages for each service and location." },
      { type: "p", text: "Ask AI assistants the questions your customers would ask, and see whether and how your business appears. If you are missing or described inaccurately, check your profile, directory listings and website for gaps or inconsistencies, and strengthen the signals that describe what you do and where." },
      { type: "h2", text: "GEO for B2B and SaaS companies" },
      { type: "p", text: "Business buyers increasingly ask AI assistants to compare vendors, explain categories or recommend tools. Clear product pages, honest comparison pages, transparent pricing, documentation and reviews on independent platforms all help AI systems understand and recommend a B2B or SaaS company accurately. Mentions in industry publications and analyst-style content also matter, because AI answers often reflect the consensus across sources." },
      { type: "h2", text: "Tracking AI visibility month to month" },
      { type: "p", text: "There is no single report for AI visibility yet, so build a simple routine. Each month, ask a fixed set of questions in the main assistants, record whether you are mentioned and which sources are cited, and note any inaccuracies. Watch Analytics for referral traffic from AI tools and the pages they land on. Compare these trends with enquiries and revenue. Over a few months, this routine shows whether your GEO efforts are working and where to focus next." },
      { type: "table", caption: "A simple monthly AI visibility log", head: ["Question asked", "Assistant", "Mentioned?", "Sources cited", "Action"], rows: [
        ["Best SEO consultant in Islamabad", "Assistant A", "Yes / No", "Pages or sites cited", "Improve the relevant page or listing"],
        ["SEO course in Rawalpindi with internship", "Assistant B", "Yes / No", "Pages or sites cited", "Strengthen course page facts"],
        ["How much does local SEO cost in Pakistan", "Assistant C", "Yes / No", "Pages or sites cited", "Update pricing guide"],
      ] },
    ],
    faqs: [
      { q: "How do AI assistants decide which websites to cite?", a: "Generally they search for relevant pages, read passages and compose answers. Pages that are accessible, relevant, clearly structured, factual and consistent with other trusted sources are more likely to be used." },
      { q: "Can local businesses appear in ChatGPT answers?", a: "Yes. AI assistants draw on profiles, reviews, directories and websites. A complete Business Profile, consistent details, detailed reviews and clear service pages help local businesses appear." },
    ],
  },
};
