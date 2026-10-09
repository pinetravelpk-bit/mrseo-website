import type { Deep } from "./deep";

export const DEEP_H: Record<string, Deep> = {
  /* ------------------------------------------------------------------ 34 SEO vs DM */
  "seo-expert-vs-digital-marketing-expert": {
    blocks: [
      { type: "h2", text: "What a digital marketing expert actually does" },
      { type: "p", text: "A digital marketing expert plans and manages how a business attracts and converts customers online across several channels. In a typical week, they might review Google Ads and Meta campaign performance, plan social media content, check email campaigns, review analytics to see which channels bring customers, coordinate with designers and writers, and adjust budgets between channels. SEO may be part of their work, but often at a strategic level rather than deep technical execution." },
      { type: "p", text: "Their main value is coordination and judgement across channels: deciding where the next rupee of budget should go, making sure messaging is consistent, and connecting marketing activity to sales. In Pakistan, where many small and mid-sized businesses have one marketer handling everything, this broad role is very common." },
      { type: "h2", text: "What an SEO expert actually does" },
      { type: "p", text: "An SEO expert focuses deeply on one channel: organic search. Their week might include technical audits, fixing indexing problems with developers, planning and editing content, optimising Google Business Profiles, earning links and mentions, and analysing Search Console data. They understand the details that decide rankings and visibility, which a generalist may not have time to master." },
      { type: "p", text: "Their main value is depth. In competitive categories, or when a website has technical problems, generalist knowledge is often not enough to make progress, and a specialist can find and fix issues that have quietly limited results for months or years." },
      { type: "table", caption: "Skills compared", head: ["Skill", "SEO expert", "Digital marketing expert"], rows: [
        ["Technical SEO", "Deep", "Basic to moderate"],
        ["Content for search", "Deep", "Moderate"],
        ["Paid ads (Google, Meta)", "Basic awareness", "Deep"],
        ["Social media", "Basic awareness", "Deep"],
        ["Email marketing", "Rarely", "Moderate to deep"],
        ["Analytics across channels", "Search-focused", "Broad"],
        ["Budget allocation", "Within SEO", "Across all channels"],
      ] },
      { type: "h2", text: "Cost differences" },
      { type: "p", text: "Costs depend on experience and scope rather than job title. A digital marketing expert managing several channels may cost more overall because of the breadth of work, but paid channels also need media budgets on top of management fees. An SEO expert’s fee covers work on one channel, with no media spend, but results build more slowly. When comparing, look at total cost, including ad spend, against the enquiries each option is likely to produce over six to twelve months." },
      { type: "compare", title: "How costs behave over time", left: { label: "Paid channels", items: [
        "Results start quickly",
        "Costs continue for as long as you want traffic",
        "Cost per lead depends on competition in auctions",
      ] }, right: { label: "SEO", items: [
        "Results build over months",
        "Pages keep producing leads after the work is done",
        "Cost per lead often falls over time",
      ] } },
      { type: "h2", text: "How they work together in a growing business" },
      { type: "p", text: "Many growing businesses in Islamabad and Rawalpindi eventually use both: a digital marketing lead who owns the overall plan and budget, and an SEO specialist who handles organic search in depth. The digital marketing lead uses SEO data to inform ads and content, while the SEO specialist uses ads data to understand which keywords convert. Shared reporting on enquiries and cost per lead keeps both focused on the same business goals." },
      { type: "process", title: "A combined setup", steps: [
        { title: "Strategy", text: "Digital marketing lead sets goals and budget" },
        { title: "Search", text: "SEO specialist builds organic visibility" },
        { title: "Paid", text: "Ads specialist runs campaigns" },
        { title: "Review", text: "Shared reporting on enquiries and cost per lead" },
      ] },
      { type: "h2", text: "Choosing for your situation" },
      { type: "p", text: "If you are a small business with a limited budget and customers who search for your service, start with SEO and local search, because they build lasting visibility. If you need results quickly, sell visually or plan a launch, a digital marketing expert running paid campaigns may deliver faster returns while SEO builds in the background. If you already run several channels without coordination, a digital marketing expert can bring order and accountability." },
    ],
    faqs: [
      { q: "Is a digital marketing expert more expensive than an SEO expert?", a: "It depends on scope and experience. Digital marketing covers more channels and paid campaigns need media budgets on top of fees, while SEO focuses on one channel with no media spend but slower results." },
      { q: "Can one person be both an SEO and digital marketing expert?", a: "Some experienced marketers are strong in both, but depth usually suffers as breadth increases. For competitive categories, a specialist alongside a generalist often works better." },
    ],
  },

  /* ------------------------------------------------------------------ 35 expert vs freelancer */
  "seo-expert-vs-seo-freelancer": {
    blocks: [
      { type: "h2", text: "How experience shows up in the work" },
      { type: "p", text: "Experience in SEO is less about knowing more techniques and more about judgement: knowing which of many possible actions will matter most for a particular site, recognising patterns from previous projects, and avoiding mistakes that look harmless but cause problems later. An experienced SEO expert has seen redesigns go wrong, penalties applied, algorithm updates shift rankings and businesses grow through steady work. That history shapes better decisions." },
      { type: "p", text: "Less experienced practitioners, whether freelancers or agency staff, often know the techniques but lack that judgement. They may focus on easy tasks rather than important ones, follow checklists rigidly, or miss warning signs. This does not make them bad hires; it means they need clear scope and oversight, especially on high-stakes work." },
      { type: "table", caption: "Experience in practice", head: ["Situation", "Experienced expert", "Less experienced practitioner"], rows: [
        ["Traffic drop", "Diagnoses calmly using data", "May guess or make sweeping changes"],
        ["Large audit list", "Prioritises the few fixes that matter", "Tries to fix everything equally"],
        ["Client request for a risky tactic", "Explains risks and declines", "May agree to keep the client happy"],
        ["Redesign", "Plans redirects and checks before launch", "May only react after rankings fall"],
      ] },
      { type: "h2", text: "Accountability and continuity" },
      { type: "p", text: "Accountability differs between arrangements. A senior expert or consultant usually owns outcomes and builds a long-term relationship with the client. A freelancer hired for tasks is accountable for completing those tasks well, but not necessarily for business results. Neither is wrong; what matters is that you know which arrangement you have and set expectations accordingly." },
      { type: "p", text: "Continuity matters too. SEO benefits from someone who knows your site’s history, past decisions and customers. Freelancers who move between many short projects may not be available when you need follow-up work, so if continuity matters, agree availability and a small ongoing retainer, or use an expert who can provide longer-term oversight." },
      { type: "h2", text: "Costs and value compared" },
      { type: "p", text: "Freelancers usually cost less per hour, which makes them excellent value for clearly defined tasks. Experienced experts cost more but can achieve more per hour on complex or strategic work, and can prevent expensive mistakes. The cheapest option for one task may not be the cheapest over a year of SEO work. Compare total cost against the results each arrangement is likely to deliver for the specific work you need." },
      { type: "bars", title: "Best value by type of work", items: [
        { label: "Defined tasks with clear instructions", value: 5, display: "Freelancer" },
        { label: "Strategy and prioritisation", value: 5, display: "Expert" },
        { label: "High-stakes projects like migrations", value: 5, display: "Expert" },
        { label: "Ongoing routine tasks with oversight", value: 4, display: "Freelancer" },
      ], note: "A general guide; individual skill varies widely in both groups." },
      { type: "h2", text: "A hybrid model many businesses use" },
      { type: "p", text: "A practical arrangement for many Pakistani businesses is a hybrid: an experienced SEO expert sets the strategy, writes clear briefs and reviews quality, while freelancers carry out defined tasks such as content writing, citation building or on-page fixes. This combines expert judgement with affordable execution, and it gives freelancers clear guidance and feedback, which improves the quality of their work over time." },
      { type: "checklist", title: "Making a hybrid model work", items: [
        "The expert owns the plan and priorities",
        "Every freelance task has a clear brief",
        "Work is reviewed before it goes live",
        "Results are reported in one place",
        "Accounts stay in the business’s name",
      ] },
    ],
    faqs: [
      { q: "Is an experienced SEO expert worth the higher cost?", a: "For strategy, prioritisation and high-stakes work such as migrations or recovering from drops, usually yes, because judgement prevents costly mistakes. For defined tasks, a skilled freelancer is often better value." },
      { q: "How do I combine an SEO expert with freelancers?", a: "Let the expert own the plan, write briefs and review quality, while freelancers deliver defined tasks. Keep reporting in one place and accounts in your name." },
    ],
  },

  /* ------------------------------------------------------------------ 36 how to become */
  "how-to-become-seo-expert-pakistan": {
    blocks: [
      { type: "h2", text: "Setting up a practice website" },
      { type: "p", text: "The single most useful thing a beginner can do is build and grow a real website. It does not need to be complicated: a simple WordPress site about a topic you know well, such as a hobby, your city or a skill you have, is enough. What matters is that you control it completely, connect it to Search Console and Analytics, and use it to test what you learn. You will see how Google indexes pages, how titles affect clicks, how speed changes when you compress images, and how content ranks over time." },
      { type: "list", ordered: true, items: [
        "Choose a topic you can write about genuinely and consistently.",
        "Buy a domain and basic hosting, and install WordPress.",
        "Connect Google Search Console and Google Analytics 4.",
        "Publish a few useful pages and track their performance.",
        "Experiment: change titles, improve content, fix speed, and record what happens.",
      ] },
      { type: "h2", text: "Getting your first real experience" },
      { type: "p", text: "After a few months of practice, look for real projects. Local businesses often need help with their Google Business Profile and basic website fixes, and many will let a learner help for a small fee or for free in exchange for a testimonial. Family businesses, friends’ shops and non-profit organisations are good starting points. Internships with agencies or businesses give supervised experience on larger sites and teach how professional SEO work is planned and reported." },
      { type: "p", text: "Treat every project seriously: agree what you will do, record the starting numbers, do the work carefully and report honestly on what changed. These habits matter as much as technical skill, and they turn small projects into strong portfolio pieces." },
      { type: "h2", text: "Building a portfolio employers trust" },
      { type: "p", text: "A strong SEO portfolio shows problems, actions and results. For each project, explain the situation in a few sentences, list what you changed and why, and show the outcome with dated screenshots from Search Console, Analytics or the Business Profile. Be honest about what did not work and what you learned. Employers in Pakistan, and international clients, value candour and clear thinking more than inflated claims." },
      { type: "table", caption: "Portfolio case study structure", head: ["Section", "What to include"], rows: [
        ["Situation", "The business, its goal and the starting point"],
        ["Problems found", "What was limiting results"],
        ["Actions", "What you changed and why"],
        ["Results", "Dated screenshots and numbers"],
        ["Lessons", "What you would do differently"],
      ] },
      { type: "h2", text: "Job hunting and freelancing" },
      { type: "p", text: "In Islamabad, Rawalpindi, Lahore and Karachi, agencies, software houses and in-house marketing teams hire junior SEO staff regularly. Apply with your portfolio rather than just a CV, and be ready to explain your projects clearly in interviews. Many interviewers will ask you to audit a website on the spot or explain how you would approach a problem, so practise talking through your reasoning." },
      { type: "p", text: "Freelancing is another path, especially for international clients. Start with small, well-defined projects where you can deliver excellent results, collect genuine reviews, and gradually raise your rates as your portfolio grows. Avoid offering black-hat services such as bulk backlinks or fake reviews for quick income; they damage your reputation and your clients’ sites." },
      { type: "h2", text: "Continuing to learn" },
      { type: "p", text: "SEO changes constantly as search engines evolve and AI changes how people search. Follow Google Search Central’s documentation and announcements, read reputable industry publications, test ideas on your own site, and discuss work with other practitioners. The professionals who stay in demand are those who keep learning, test claims rather than repeating them, and focus on helping businesses grow rather than chasing tricks." },
    ],
    faqs: [
      { q: "Do I need my own website to learn SEO?", a: "It is the most useful learning tool. A simple site you control lets you see how indexing, titles, speed and content affect results, and gives you material for your portfolio." },
      { q: "How can a beginner get SEO experience in Pakistan?", a: "Practise on your own site, then help local businesses, family businesses or non-profits with their Business Profile and website, and look for internships with agencies or businesses." },
    ],
  },
};
