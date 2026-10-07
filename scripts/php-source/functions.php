<?php
/**
 * MrSEO.pk functions.php v4.0
 * Owner: Syed Mudassir Shah
 * Email: seosyed77@gmail.com | WhatsApp: +923435853835
 *
 * @package MrSEO_PK
 */
if(!defined('ABSPATH')) exit;

define('MRSEO_VERSION','4.3.1');
define('MRSEO_DIR',   get_template_directory());
define('MRSEO_URI',   get_template_directory_uri());
define('MRSEO_OWNER', 'Syed Mudassir Shah');
define('MRSEO_EMAIL', 'seosyed77@gmail.com');
define('MRSEO_WA',    '923435853835');
define('MRSEO_PHONE', '+92 343 5853835');
define('MRSEO_SITES', '50+');

/* Training campus. The consultancy works nationwide, but classes are
   taught here, so every course page, schema block and form uses these. */
define('MRSEO_CAMPUS',      'Scheme 3, Rawalpindi');
define('MRSEO_CAMPUS_CITY', 'Rawalpindi');
define('MRSEO_CAMPUS_AREA', 'Rawalpindi and Islamabad');

/* ============================================================
   MODULE LOADING
   ============================================================ */
foreach(['/inc/content-cities.php','/inc/content-industries.php','/inc/content-services.php','/inc/content-courses.php','/inc/content-render.php','/inc/rankmath-geo.php'] as $mod){
    $path = MRSEO_DIR.$mod;
    if(file_exists($path)) require_once $path;
}

/* ============================================================
   CITIES DATA
   ============================================================ */
function mrseo_get_cities(): array {
    return [
        'karachi'   =>['name'=>'Karachi',   'urdu'=>'کراچی',       'flag'=>'🏙️','note'=>'Commercial capital',   'pop'=>'16M+', 'clients'=>'120+','comp'=>'Very high','slug'=>'karachi'],
        'lahore'    =>['name'=>'Lahore',    'urdu'=>'لاہور',       'flag'=>'🕌','note'=>'Cultural capital',     'pop'=>'13M+', 'clients'=>'95+', 'comp'=>'High',      'slug'=>'lahore'],
        'islamabad' =>['name'=>'Islamabad', 'urdu'=>'اسلام آباد',  'flag'=>'🏛️','note'=>'Federal capital',      'pop'=>'2M+',  'clients'=>'60+', 'comp'=>'Medium',    'slug'=>'islamabad'],
        'rawalpindi'=>['name'=>'Rawalpindi','urdu'=>'راولپنڈی',    'flag'=>'🌆','note'=>'Twin city',            'pop'=>'2.1M+','clients'=>'45+', 'comp'=>'Medium',    'slug'=>'rawalpindi'],
        'peshawar'  =>['name'=>'Peshawar',  'urdu'=>'پشاور',       'flag'=>'🏯','note'=>'KP capital',           'pop'=>'4.3M+','clients'=>'38+', 'comp'=>'Medium',    'slug'=>'peshawar'],
        'quetta'    =>['name'=>'Quetta',    'urdu'=>'کوئٹہ',       'flag'=>'⛰️','note'=>'Balochistan capital',  'pop'=>'1.1M+','clients'=>'22+', 'comp'=>'Low',       'slug'=>'quetta'],
        'faisalabad'=>['name'=>'Faisalabad','urdu'=>'فیصل آباد',   'flag'=>'🏭','note'=>'Textile hub',          'pop'=>'3.6M+','clients'=>'50+', 'comp'=>'High',      'slug'=>'faisalabad'],
        'multan'    =>['name'=>'Multan',    'urdu'=>'ملتان',       'flag'=>'🌹','note'=>'Southern Punjab hub',  'pop'=>'1.9M+','clients'=>'30+', 'comp'=>'Medium',    'slug'=>'multan'],
    ];
}

/* ============================================================
   INDUSTRIES DATA
   ============================================================ */
function mrseo_get_industries(): array {
    return [
        'travel-tourism'=>['name'=>'Travel & Tourism','urdu'=>'سیاحت','icon'=>'✈️','slug'=>'travel-tourism',
            'desc'=>'Hajj and Umrah packages, northern area tours and visa services each need their own content hub.',
            'kws' =>['Umrah packages Pakistan','Hunza tour packages','tour operators Karachi','travel agency Lahore'],
            'stats'=>['Seasonal planning','Religious travel focus','Direct booking growth']],

        'ecommerce'     =>['name'=>'E-Commerce','urdu'=>'ای کامرس','icon'=>'🛒','slug'=>'ecommerce',
            'desc'=>'Category architecture, product schema and technical hygiene decide who ranks around the marketplaces.',
            'kws' =>['online shopping Pakistan','buy online Karachi','ecommerce SEO Pakistan','product page optimisation'],
            'stats'=>['Category-first strategy','Product schema','COD conversion']],

        'cosmetics'     =>['name'=>'Cosmetics & Beauty','urdu'=>'خوبصورتی','icon'=>'💄','slug'=>'cosmetics',
            'desc'=>'Salons compete in the map pack while brands compete nationally on ingredient and concern searches.',
            'kws' =>['beauty salon Lahore','bridal makeup Karachi','skin care Pakistan','dermatologist Islamabad'],
            'stats'=>['Wedding season timing','Local pack focus','Ingredient content']],

        'medical'       =>['name'=>'Medical & Healthcare','urdu'=>'طبی','icon'=>'🏥','slug'=>'medical',
            'desc'=>'Verifiable doctor credentials and named medical authorship matter more here than keyword work.',
            'kws' =>['hospitals in Karachi','best doctors Pakistan','medical centre Islamabad','specialist Lahore'],
            'stats'=>['Credential-led','Doctor profiles','Cost transparency']],

        'schools'       =>['name'=>'Schools & Education','urdu'=>'تعلیم','icon'=>'🎓','slug'=>'schools',
            'desc'=>'Admission season runs January to April, so the content work has to happen the autumn before.',
            'kws' =>['best schools Lahore','private schools Karachi','O level school Islamabad','admission fee structure'],
            'stats'=>['Admission cycle','Campus pages','Fee transparency']],

        'hotels'        =>['name'=>'Hotels & Hospitality','urdu'=>'ہوٹل','icon'=>'🏨','slug'=>'hotels',
            'desc'=>'The goal is cutting platform commission by winning brand searches and direct bookings.',
            'kws' =>['hotels in Lahore','guest house Islamabad','wedding hall Karachi','banquet hall Multan'],
            'stats'=>['Direct booking','Profile-led','Event revenue']],

        'clinics'       =>['name'=>'Clinics & Dental','urdu'=>'کلینک','icon'=>'🦷','slug'=>'clinics',
            'desc'=>'Map pack placement decides most clinic searches, so profile and review work comes first.',
            'kws' =>['dental clinic Karachi','skin clinic Lahore','root canal cost Pakistan','orthodontist Islamabad'],
            'stats'=>['Map pack first','Procedure pricing','Review flow']],

        'real-estate'   =>['name'=>'Real Estate','urdu'=>'رئیل اسٹیٹ','icon'=>'🏠','slug'=>'real-estate',
            'desc'=>'Society and project pages plus overseas buyer content win where the portals are weakest.',
            'kws' =>['property for sale Karachi','DHA plots Islamabad','Bahria Town Lahore','buy property from overseas'],
            'stats'=>['Project pages','Overseas buyers','Documentation content']],
    ];
}

/* ============================================================
   SERVICES DATA
   ============================================================ */
function mrseo_get_services(): array {
    return [
        'seo'          =>['name'=>'SEO','icon'=>'🔍','sub'=>'Technical, on-page and off-page',
            'desc'=>'Technical fixes, page architecture, content and links, planned around what your buyers actually search.'],
        'ppc'          =>['name'=>'PPC and Google Ads','icon'=>'💰','sub'=>'Tracked paid campaigns',
            'desc'=>'Search and social campaigns with proper conversion tracking, so cost per enquiry is a number and not a guess.'],
        'social-media' =>['name'=>'Social Media','icon'=>'📱','sub'=>'Facebook, Instagram, TikTok',
            'desc'=>'Content and paid distribution built for Pakistani audiences rather than recycled international playbooks.'],
        'web-design'   =>['name'=>'Web Design and Development','icon'=>'🖥️','sub'=>'WordPress, Shopify, custom',
            'desc'=>'Fast, crawlable sites that load properly on mobile connections and are built to be optimised later.'],
        'local-seo'    =>['name'=>'Local SEO','icon'=>'📍','sub'=>'Google Business Profile and map pack',
            'desc'=>'Profile setup, categories, service listings, citations and a review process your team can sustain.'],
        'content'      =>['name'=>'Content Marketing','icon'=>'✍️','sub'=>'English and Urdu',
            'desc'=>'Service pages, comparison content, pricing guides and FAQs written to be read and to answer questions.'],
    ];
}

/* ============================================================
   COURSES DATA
   ------------------------------------------------------------
   EDIT HERE. Fee, duration, seats, batch date, internship length
   and timings are placeholders. Fees are set low deliberately: short courses PKR 2,000 to 4,000, professional courses PKR 6,000 to 15,000.
   Change them once in this array and every page, menu, schema
   block and form updates automatically.
   ============================================================ */
function mrseo_get_courses(): array {
    return [

        'digital-marketing' => [
            'name'=>'Complete Digital Marketing','icon'=>'&#128640;','slug'=>'digital-marketing','tier'=>'pro',
            'sub'=>'The full stack, 16 weeks',
            'short'=>'Digital Marketing Course',
            'desc'=>'SEO, Google and Meta ads, social media, content and AI tools taught as one connected system, then applied on live client accounts.',
            'duration'=>'16 weeks','hours'=>'96 hours','level'=>'Beginner to job ready',
            'mode'=>'On-site in Scheme 3, Rawalpindi, and live online',
            'fee'=>'15,000','fee_note'=>'Payable in 2 instalments',
            'seats'=>'15','intern'=>'8 weeks',
            'schedule'=>'Mon, Wed, Fri &bull; 7pm to 9pm',
            'tools'=>['Search Console','Google Analytics 4','Google Ads','Meta Ads Manager','Semrush','Canva','ChatGPT and Claude'],
            'outcomes'=>[
                'Audit a website and produce a prioritised fix list',
                'Build and manage Google and Meta ad campaigns end to end',
                'Write content that ranks and converts in English and Roman Urdu',
                'Report on enquiries and cost per lead rather than vanity metrics',
                'Run marketing for a business or apply for junior agency roles',
            ],
        ],

        'seo' => [
            'name'=>'SEO Course','icon'=>'&#128269;','slug'=>'seo','tier'=>'pro',
            'sub'=>'Technical, on-page, local and links',
            'short'=>'SEO Course',
            'desc'=>'Audit, keyword research, on-page, technical fixes, local search and link building, taught on live Pakistani websites.',
            'duration'=>'8 weeks','hours'=>'48 hours','level'=>'Beginner to intermediate',
            'mode'=>'On-site in Scheme 3, Rawalpindi, and live online',
            'fee'=>'9,000','fee_note'=>'One payment or 2 instalments',
            'seats'=>'15','intern'=>'8 weeks',
            'schedule'=>'Tue and Thu &bull; 7pm to 9pm',
            'tools'=>['Search Console','Google Analytics 4','Screaming Frog','Ahrefs or Semrush','PageSpeed Insights','Google Business Profile'],
            'outcomes'=>[
                'Run a full technical audit on a site you have never seen',
                'Build a keyword map from real search data, not tool guesses',
                'Fix on-page issues and brief a developer on the rest',
                'Set up and rank a Google Business Profile in the map pack',
                'Build links that survive algorithm updates',
            ],
        ],

        'social-media-marketing' => [
            'name'=>'Social Media Marketing','icon'=>'&#128241;','slug'=>'social-media-marketing','tier'=>'pro',
            'sub'=>'Facebook, Instagram and TikTok',
            'short'=>'Social Media Course',
            'desc'=>'Organic content and paid campaigns built for Pakistani audiences, taught on live brand accounts rather than imported playbooks.',
            'duration'=>'6 weeks','hours'=>'36 hours','level'=>'Beginner friendly',
            'mode'=>'On-site in Scheme 3, Rawalpindi, and live online',
            'fee'=>'7,000','fee_note'=>'One payment or 2 instalments',
            'seats'=>'18','intern'=>'6 weeks',
            'schedule'=>'Sat and Sun &bull; 11am to 1pm',
            'tools'=>['Meta Business Suite','Meta Ads Manager','TikTok Ads','Canva','CapCut','Metricool'],
            'outcomes'=>[
                'Plan a month of content you can actually sustain',
                'Shoot and edit short-form video on a phone',
                'Build and test Meta ad campaigns with proper tracking',
                'Handle community management including public complaints',
                'Report on saves, messages and cost per result',
            ],
        ],

        'ai-marketing' => [
            'name'=>'AI for Marketing','icon'=>'&#129302;','slug'=>'ai-marketing','tier'=>'pro',
            'sub'=>'Practical AI workflows and automation',
            'short'=>'AI Course',
            'desc'=>'Where AI genuinely saves hours in marketing work and where it produces output that search engines and customers ignore.',
            'duration'=>'6 weeks','hours'=>'36 hours','level'=>'Some marketing context helps',
            'mode'=>'On-site in Scheme 3, Rawalpindi, and live online',
            'fee'=>'7,000','fee_note'=>'One payment or 2 instalments',
            'seats'=>'18','intern'=>'6 weeks',
            'schedule'=>'Sat and Sun &bull; 3pm to 5pm',
            'tools'=>['ChatGPT','Claude','Gemini','Midjourney or equivalent','n8n or Make','Google Sheets'],
            'outcomes'=>[
                'Write prompts that produce usable output first time',
                'Build reusable workflows for the tasks you repeat weekly',
                'Verify AI research before it reaches a client',
                'Structure content so AI answer engines can quote it',
                'Automate reporting and lead handling without code',
            ],
        ],

        'graphic-design' => [
            'name'=>'Graphic Designing','icon'=>'&#127912;','slug'=>'graphic-design','tier'=>'pro',
            'sub'=>'Social, brand and print',
            'short'=>'Graphic Design Course',
            'desc'=>'Commercial design for real clients: ad creative, social sets, brand basics and print files that come back from the press correctly.',
            'duration'=>'8 weeks','hours'=>'48 hours','level'=>'No drawing ability required',
            'mode'=>'On-site in Scheme 3, Rawalpindi, and live online',
            'fee'=>'9,000','fee_note'=>'One payment or 2 instalments',
            'seats'=>'15','intern'=>'8 weeks',
            'schedule'=>'Mon and Wed &bull; 5pm to 7pm',
            'tools'=>['Photoshop','Illustrator','Figma','Canva','Photopea'],
            'outcomes'=>[
                'Design social and ad creative at volume using template systems',
                'Build a simple brand identity and usage sheet',
                'Handle Urdu and English typography in one layout',
                'Prepare print files that survive a local press',
                'Leave with a portfolio of published client work',
            ],
        ],

        'content-writing' => [
            'name'=>'Content Writing','icon'=>'&#9997;','slug'=>'content-writing','tier'=>'pro',
            'sub'=>'English and Roman Urdu',
            'short'=>'Content Writing Course',
            'desc'=>'Service pages, blogs, ad copy and email written to be found and to convert, with every assignment edited and returned.',
            'duration'=>'6 weeks','hours'=>'36 hours','level'=>'Working English required',
            'mode'=>'On-site in Scheme 3, Rawalpindi, and live online',
            'fee'=>'6,000','fee_note'=>'One payment or 2 instalments',
            'seats'=>'18','intern'=>'6 weeks',
            'schedule'=>'Tue and Thu &bull; 5pm to 7pm',
            'tools'=>['Search Console','Google Docs','Grammarly','Surfer or equivalent','ChatGPT or Claude'],
            'outcomes'=>[
                'Research a business before writing a word for it',
                'Write service pages that answer and then ask for action',
                'Structure content for featured snippets and AI answers',
                'Mix English and Roman Urdu without sounding forced',
                'Price writing work so it is worth doing',
            ],
        ],


        /* ---------- SHORT COURSES ----------
           Two to three weeks, cheap, weekend or evening slots.
           Built for students and first-time freelancers who want one
           employable skill quickly rather than a full programme.
           These include the certificate but NOT the internship, which
           stays with the professional courses. Say so plainly. */

        'canva-design' => [
            'name'=>'Canva for Social Media','icon'=>'&#127752;','slug'=>'canva-design','tier'=>'short',
            'sub'=>'Design without Photoshop, 2 weeks',
            'short'=>'Canva Course',
            'desc'=>'Build a full month of posts, stories and reels covers in Canva using template systems instead of starting from a blank page every time.',
            'duration'=>'2 weeks','hours'=>'8 hours','level'=>'Absolute beginner',
            'mode'=>'On-site in Scheme 3, Rawalpindi, and live online',
            'fee'=>'2,000','fee_note'=>'One payment',
            'seats'=>'20','intern'=>'',
            'schedule'=>'Sat and Sun &bull; 12pm to 2pm',
            'tools'=>['Canva','Canva Magic Studio','Google Fonts','Pexels and Unsplash'],
            'outcomes'=>[
                'Build a reusable brand kit and template set',
                'Design posts, stories, reels covers and menus that look consistent',
                'Resize one design across every platform in minutes',
                'Use Canva AI tools without the output looking generic',
                'Take small design jobs for local shops and pages',
            ],
        ],

        'ai-basics' => [
            'name'=>'AI Basics','icon'=>'&#10024;','slug'=>'ai-basics','tier'=>'short',
            'sub'=>'ChatGPT for study and work, 2 weeks',
            'short'=>'AI Basics Course',
            'desc'=>'A plain-language start with ChatGPT, Claude and Gemini: writing, research, study help and small automations, plus where these tools are confidently wrong.',
            'duration'=>'2 weeks','hours'=>'8 hours','level'=>'Absolute beginner',
            'mode'=>'On-site in Scheme 3, Rawalpindi, and live online',
            'fee'=>'2,000','fee_note'=>'One payment',
            'seats'=>'20','intern'=>'',
            'schedule'=>'Sat and Sun &bull; 4pm to 6pm',
            'tools'=>['ChatGPT','Claude','Gemini','Google Docs and Sheets'],
            'outcomes'=>[
                'Write prompts that get a usable answer first time',
                'Use AI for assignments and research without submitting nonsense',
                'Spot a hallucinated fact before it embarrasses you',
                'Build small time-savers for repetitive work',
                'Understand what these tools cannot do, which is most of the value',
            ],
        ],

        'wordpress' => [
            'name'=>'WordPress Development','icon'=>'&#128187;','slug'=>'wordpress','tier'=>'short',
            'sub'=>'Build a real site, 3 weeks',
            'short'=>'WordPress Course',
            'desc'=>'Build and launch a working business website on WordPress: hosting, theme, pages, forms, speed and the basic SEO setup, with no coding required.',
            'duration'=>'3 weeks','hours'=>'18 hours','level'=>'Beginner, no coding needed',
            'mode'=>'On-site in Scheme 3, Rawalpindi, and live online',
            'fee'=>'4,000','fee_note'=>'One payment',
            'seats'=>'18','intern'=>'',
            'schedule'=>'Mon, Wed, Fri &bull; 5pm to 7pm',
            'tools'=>['WordPress','Elementor','WooCommerce basics','Rank Math','cPanel hosting'],
            'outcomes'=>[
                'Register a domain, set up hosting and install WordPress',
                'Build a five-page business site that works on mobile',
                'Add contact forms, WhatsApp buttons and Google Maps',
                'Set up basic on-page SEO and a sitemap',
                'Hand a client a site they can update themselves',
            ],
        ],

        'video-editing' => [
            'name'=>'Video Editing for Reels','icon'=>'&#127916;','slug'=>'video-editing','tier'=>'short',
            'sub'=>'CapCut on phone and laptop, 2 weeks',
            'short'=>'Video Editing Course',
            'desc'=>'Shoot and cut short-form video that holds attention: hooks, pacing, captions, transitions and sound, all achievable on a phone.',
            'duration'=>'2 weeks','hours'=>'10 hours','level'=>'Beginner friendly',
            'mode'=>'On-site in Scheme 3, Rawalpindi, and live online',
            'fee'=>'2,500','fee_note'=>'One payment',
            'seats'=>'18','intern'=>'',
            'schedule'=>'Tue and Thu &bull; 6pm to 8pm',
            'tools'=>['CapCut','InShot','Canva','Phone camera and basic lighting'],
            'outcomes'=>[
                'Write and shoot a hook that survives the first two seconds',
                'Cut, caption and export for Reels, TikTok and Shorts',
                'Fix bad audio and uneven lighting after the fact',
                'Build a repeatable editing template so one video takes an hour',
                'Charge for edits instead of doing them free for friends',
            ],
        ],

        'freelancing' => [
            'name'=>'Freelancing Starter','icon'=>'&#128640;','slug'=>'freelancing','tier'=>'short',
            'sub'=>'Fiverr and Upwork, 3 weeks',
            'short'=>'Freelancing Course',
            'desc'=>'Set up a profile that gets seen, write proposals that get replies, price your work, and get paid in Pakistan without losing a third of it to fees.',
            'duration'=>'3 weeks','hours'=>'12 hours','level'=>'Needs one sellable skill',
            'mode'=>'On-site in Scheme 3, Rawalpindi, and live online',
            'fee'=>'3,000','fee_note'=>'One payment',
            'seats'=>'18','intern'=>'',
            'schedule'=>'Sat and Sun &bull; 6pm to 8pm',
            'tools'=>['Fiverr','Upwork','LinkedIn','Payoneer and Wise','Trello'],
            'outcomes'=>[
                'Build a gig or profile around one clear service',
                'Write proposals that answer the brief instead of begging',
                'Price by project and handle scope creep',
                'Receive international payments legally from Pakistan',
                'Handle a difficult client without losing the review',
            ],
        ],

        'meta-ads-basics' => [
            'name'=>'Facebook and Instagram Ads','icon'=>'&#128200;','slug'=>'meta-ads-basics','tier'=>'short',
            'sub'=>'Boost properly, 2 weeks',
            'short'=>'Meta Ads Course',
            'desc'=>'Stop boosting posts blindly. Set up Business Manager, build a real campaign, target the right people and read the numbers that decide whether to keep spending.',
            'duration'=>'2 weeks','hours'=>'10 hours','level'=>'Beginner friendly',
            'mode'=>'On-site in Scheme 3, Rawalpindi, and live online',
            'fee'=>'3,000','fee_note'=>'One payment',
            'seats'=>'18','intern'=>'',
            'schedule'=>'Mon and Wed &bull; 7pm to 9pm',
            'tools'=>['Meta Business Suite','Meta Ads Manager','Meta Pixel','WhatsApp Business'],
            'outcomes'=>[
                'Set up Business Manager, pixel and payment properly',
                'Build a campaign with the right objective for the goal',
                'Target by location, interest and lookalike audiences',
                'Test creatives and kill the ones losing money',
                'Report cost per message and cost per order to a client or boss',
            ],
        ],

    ];
}

/**
 * Courses filtered by tier: 'pro' for the full programmes with the
 * internship, 'short' for the cheap two to three week courses.
 */
function mrseo_get_courses_by_tier(string $tier): array {
    return array_filter(mrseo_get_courses(), fn($c)=>($c['tier'] ?? 'pro') === $tier);
}

/**
 * Things every course includes. Kept in one place so the free
 * internship and certificate messaging stays consistent sitewide.
 */
function mrseo_course_includes(string $tier='pro'): array {
    if($tier === 'short'){
        return [
            ['icon'=>'&#128176;','t'=>'Low fee, one payment','d'=>'Between PKR 2,000 and PKR 4,000 for the whole course. No registration fee, no material charge, nothing added later.'],
            ['icon'=>'&#128220;','t'=>'Free certificate','d'=>'A certificate of completion issued by MrSEO.pk, verifiable on request. Not a government accreditation, and we will not pretend it is one.'],
            ['icon'=>'&#9201;','t'=>'Two to three weeks','d'=>'Short by design. Evening and weekend slots so it fits around university, college or a job.'],
            ['icon'=>'&#128241;','t'=>'Work on your own project','d'=>'You bring your page, your side business or your portfolio idea and build it during class rather than following a dummy exercise.'],
            ['icon'=>'&#127909;','t'=>'Session recordings','d'=>'Every class is recorded and you keep access, so a missed evening does not cost you the course.'],
            ['icon'=>'&#127891;','t'=>'Credit towards a full course','d'=>'The internship belongs to the professional courses, not these. If you upgrade within three months, your short course fee comes off the bigger one.'],
        ];
    }
    return [
        ['icon'=>'&#127891;','t'=>'Free internship','d'=>'Supervised work on live client accounts after the coursework ends. Included at no extra cost, unpaid, around 12 to 15 hours a week.'],
        ['icon'=>'&#128220;','t'=>'Free certificate','d'=>'A certificate of completion issued by MrSEO.pk, verifiable on request. Not a government accreditation, and we do not pretend otherwise.'],
        ['icon'=>'&#128188;','t'=>'Portfolio you keep','d'=>'Every module ends in a finished piece of work. By the last week that folder is the portfolio an interviewer will ask to see.'],
        ['icon'=>'&#128172;','t'=>'Written reference','d'=>'Complete the internship and you get a reference describing the accounts you worked on and the tasks you handled.'],
        ['icon'=>'&#127909;','t'=>'Session recordings','d'=>'Every class is recorded and you keep access, so a missed evening does not put you behind.'],
        ['icon'=>'&#128101;','t'=>'Small batches','d'=>'Between 15 and 18 seats per intake, so your work actually gets reviewed rather than collected.'],
    ];
}

/* ============================================================
   URL HELPERS
   Resolves the real permalink whether the post slug uses the old
   prefixed pattern (seo-expert-karachi) or a clean one (karachi).
   ============================================================ */
function mrseo_resolve_url(string $post_type, string $prefix, string $slug, string $fallback_base): string {
    $cache_key = 'mrseo_url_'.$post_type.'_'.$slug;
    $cached    = wp_cache_get($cache_key, 'mrseo');
    if($cached !== false) return (string)$cached;

    $url = '';
    foreach([$prefix.$slug, $slug] as $candidate){
        $found = get_page_by_path($candidate, OBJECT, $post_type);
        if($found){ $url = (string)get_permalink($found); break; }
    }
    if($url === '') $url = home_url('/'.trim($fallback_base,'/').'/'.$prefix.$slug.'/');

    wp_cache_set($cache_key, $url, 'mrseo', HOUR_IN_SECONDS);
    return $url;
}
function mrseo_city_url(string $slug): string {
    return mrseo_resolve_url('city-page','seo-expert-',$slug,'seo-expert');
}
function mrseo_industry_url(string $slug): string {
    return mrseo_resolve_url('industry-page','seo-for-',$slug,'seo-for');
}
function mrseo_service_url(string $slug): string {
    return mrseo_resolve_url('service','',$slug,'services');
}
function mrseo_course_url(string $slug): string {
    return mrseo_resolve_url('course','',$slug,'courses');
}

/* ============================================================
   THEME SETUP
   ============================================================ */
function mrseo_setup(): void {
    load_theme_textdomain('mrseo-pk', MRSEO_DIR.'/languages');
    add_theme_support('automatic-feed-links');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5',['search-form','comment-form','comment-list','gallery','caption','style','script']);
    add_theme_support('custom-logo',['height'=>60,'width'=>240,'flex-height'=>true,'flex-width'=>true]);
    add_theme_support('customize-selective-refresh-widgets');
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
    register_nav_menus(['primary'=>'Primary Navigation']);
    add_image_size('mrseo-hero',1200,600,true);
    add_image_size('mrseo-card',600,400,true);
    add_image_size('mrseo-thumb',400,280,true);
}
add_action('after_setup_theme','mrseo_setup');
function mrseo_content_width(): void { $GLOBALS['content_width']=1200; }
add_action('after_setup_theme','mrseo_content_width',0);

/* ============================================================
   RESOURCE HINTS
   ============================================================ */
function mrseo_resource_hints($hints, $relation_type): array {
    if('preconnect' === $relation_type){
        $hints[] = ['href'=>'https://fonts.googleapis.com','crossorigin'=>''];
        $hints[] = ['href'=>'https://fonts.gstatic.com','crossorigin'=>'anonymous'];
    }
    if('dns-prefetch' === $relation_type){
        $hints[] = 'https://fonts.googleapis.com';
        $hints[] = 'https://fonts.gstatic.com';
    }
    return $hints;
}
add_filter('wp_resource_hints','mrseo_resource_hints',10,2);

/* ============================================================
   FONT PRELOAD + CRITICAL CSS
   ============================================================ */
function mrseo_preload_fonts(): void {
    $font_url = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap';
    echo '<link rel="preload" as="style" href="'.esc_url($font_url).'" onload="this.onload=null;this.rel=\'stylesheet\'">'."\n";
    echo '<noscript><link rel="stylesheet" href="'.esc_url($font_url).'"></noscript>'."\n";
    echo '<style id="mrseo-critical">
body{font-family:"Space Grotesk",system-ui,sans-serif;background:#080E1A;color:#F0F6FF;margin:0}
#top-bar{height:40px;background:#0A1628;border-bottom:1px solid rgba(46,124,246,.3)}
#site-header{height:76px;background:rgba(8,14,26,.97)}
#main-content{padding-top:116px}
.container{max-width:1200px;margin:0 auto;padding:0 28px}
.hero-h1{font-size:clamp(34px,5vw,60px);font-weight:700;line-height:1.05;letter-spacing:-.03em}
.g{color:#3DC43D}
.btn{display:inline-flex;align-items:center;gap:7px;padding:12px 24px;border-radius:8px;font-weight:600;cursor:pointer;text-decoration:none;white-space:nowrap;border:1px solid transparent}
.btn-g{background:#3DC43D;color:#080E1A}
.btn-wa{background:#25D366;color:#fff}
</style>'."\n";
}
add_action('wp_head','mrseo_preload_fonts',1);

/* ============================================================
   ENQUEUE
   ============================================================ */
function mrseo_enqueue(): void {
    wp_enqueue_style('mrseo-main', MRSEO_URI.'/css/main.css', [], MRSEO_VERSION);
    wp_enqueue_script('mrseo-main', MRSEO_URI.'/js/main.js', [], MRSEO_VERSION, true);
    if(is_singular() && comments_open() && get_option('thread_comments')) wp_enqueue_script('comment-reply');
    wp_localize_script('mrseo-main','mrSeoData',[
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('mrseo_nonce'),
        'wa'      => MRSEO_WA,
        'email'   => MRSEO_EMAIL,
        'themeUri'=> MRSEO_URI,
    ]);
}
add_action('wp_enqueue_scripts','mrseo_enqueue');

function mrseo_script_loader_tag(string $tag, string $handle): string {
    if($handle === 'mrseo-main' && !str_contains($tag,'defer')){
        return str_replace(' src=', ' defer src=', $tag);
    }
    return $tag;
}
add_filter('script_loader_tag','mrseo_script_loader_tag',10,2);

/* ============================================================
   HEAD CLEANUP
   Note: version query strings are deliberately kept on theme assets.
   Stripping them breaks cache busting whenever the theme is updated.
   ============================================================ */
remove_action('wp_head','wp_generator');
remove_action('wp_head','wlwmanifest_link');
remove_action('wp_head','rsd_link');
remove_action('wp_head','wp_shortlink_wp_head');
add_filter('the_generator','__return_empty_string');

/* ============================================================
   FAVICON
   ============================================================ */
function mrseo_favicon(): void {
    $uri = MRSEO_URI;
    echo '<link rel="icon" type="image/png" sizes="32x32" href="'.esc_url($uri.'/favicon-32x32.png').'">'."\n";
    echo '<link rel="apple-touch-icon" sizes="180x180" href="'.esc_url($uri.'/apple-touch-icon.png').'">'."\n";
    echo '<link rel="shortcut icon" type="image/png" href="'.esc_url($uri.'/favicon.png').'">'."\n";
    echo '<meta name="msapplication-TileImage" content="'.esc_url($uri.'/favicon.png').'">'."\n";
    echo '<meta name="msapplication-TileColor" content="#080E1A">'."\n";
}
add_action('wp_head','mrseo_favicon',2);
add_action('admin_head','mrseo_favicon',2);

/* ============================================================
   VIEWPORT AND MOBILE META
   header.php deliberately does not output a viewport tag; this is
   the single source so the page never ships two of them.
   ============================================================ */
function mrseo_viewport_meta(): void {
    echo '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'."\n";
    echo '<meta name="theme-color" content="#080E1A">'."\n";
    echo '<meta name="mobile-web-app-capable" content="yes">'."\n";
    echo '<meta name="apple-mobile-web-app-capable" content="yes">'."\n";
    echo '<meta name="format-detection" content="telephone=yes">'."\n";
}
add_action('wp_head','mrseo_viewport_meta',0);

/* ============================================================
   CUSTOM POST TYPES
   ============================================================ */
function mrseo_register_cpts(): void {
    $types=[
        'case-study'   =>['Case Studies','Case Study','case-studies','dashicons-chart-line'],
        'service'      =>['Services','Service','services','dashicons-performance'],
        'course'       =>['Courses','Course','courses','dashicons-welcome-learn-more'],
        'city-page'    =>['City Pages','City Page','seo-expert','dashicons-location-alt'],
        'industry-page'=>['Industry Pages','Industry Page','seo-for','dashicons-building'],
        'testimonial'  =>['Testimonials','Testimonial','testimonials','dashicons-format-quote'],
    ];
    foreach($types as $key=>[$plural,$singular,$slug,$icon]){
        register_post_type($key,[
            'labels'      =>['name'=>$plural,'singular_name'=>$singular,'add_new_item'=>"Add {$singular}",'edit_item'=>"Edit {$singular}",'menu_name'=>$plural],
            'public'      =>true,
            'has_archive' =>true,
            'rewrite'     =>['slug'=>$slug,'with_front'=>false],
            'supports'    =>['title','editor','thumbnail','excerpt','custom-fields','page-attributes'],
            'show_in_rest'=>true,
            'menu_icon'   =>$icon,
        ]);
    }
}
add_action('init','mrseo_register_cpts');

/* ============================================================
   AUTO-GENERATE PAGES
   ============================================================ */
function mrseo_generate_all_pages(): void {
    if(get_option('mrseo_v41_services_done')) return;

    foreach(mrseo_get_cities() as $slug=>$city){
        $post_slug = 'seo-expert-'.$slug;
        if(!get_page_by_path($post_slug,OBJECT,'city-page') && !get_page_by_path($slug,OBJECT,'city-page')){
            wp_insert_post([
                'post_title' =>'SEO Expert in '.$city['name'],
                'post_name'  =>$post_slug,
                'post_type'  =>'city-page',
                'post_status'=>'publish',
                'meta_input' =>[
                    '_city_slug'=>$slug,
                    '_city_name'=>$city['name'],
                    '_seo_title'=>'SEO Expert in '.$city['name'].' | MrSEO.pk',
                    '_seo_desc' =>'How SEO actually works in '.$city['name'].': areas that convert, local competition, realistic timelines and costs. Free audit within 24 hours.',
                ],
            ]);
        }
    }

    foreach(mrseo_get_industries() as $slug=>$ind){
        $post_slug = 'seo-for-'.$slug;
        if(!get_page_by_path($post_slug,OBJECT,'industry-page') && !get_page_by_path($slug,OBJECT,'industry-page')){
            wp_insert_post([
                'post_title' =>'SEO for '.$ind['name'].' in Pakistan',
                'post_name'  =>$post_slug,
                'post_type'  =>'industry-page',
                'post_status'=>'publish',
                'meta_input' =>[
                    '_industry_slug'=>$slug,
                    '_industry_name'=>$ind['name'],
                    '_seo_title'=>'SEO for '.$ind['name'].' in Pakistan | MrSEO.pk',
                    '_seo_desc' =>'What ranks and what does not for '.$ind['name'].' businesses in Pakistan. Seasonality, content, local visibility and realistic timelines.',
                ],
            ]);
        }
    }

    foreach(mrseo_get_services() as $slug=>$svc){
        if(!get_page_by_path($slug,OBJECT,'service')){
            wp_insert_post([
                'post_title' =>$svc['name'].' Services in Pakistan',
                'post_name'  =>$slug,
                'post_type'  =>'service',
                'post_status'=>'publish',
                'meta_input' =>[
                    '_service_slug'=>$slug,
                    '_service_name'=>$svc['name'],
                    '_seo_title'=>$svc['name'].' Services in Pakistan | MrSEO.pk',
                    '_seo_desc' =>'How '.$svc['name'].' is actually done for Pakistani businesses: what the work involves, what it costs to run properly and realistic timelines. Free audit within 24 hours.',
                ],
            ]);
        }
    }

    $pages=[
        'contact'     =>'Contact MrSEO.pk',
        'about'       =>'About Syed Mudassir Shah',
        'case-studies'=>'SEO Case Studies from Pakistan',
        'blog'        =>'SEO Blog',
    ];
    foreach($pages as $slug=>$title){
        if(!get_page_by_path($slug)) wp_insert_post(['post_title'=>$title,'post_name'=>$slug,'post_type'=>'page','post_status'=>'publish']);
    }

    update_option('mrseo_v4_pages_done',true);
    update_option('mrseo_v41_services_done',true);
    flush_rewrite_rules();
}
add_action('after_switch_theme','mrseo_generate_all_pages');
// Theme updates do not fire after_switch_theme, so missing pages are also
// created on the next admin load. The option guard keeps this to one run.
add_action('admin_init', function(): void {
    if(!get_option('mrseo_v41_services_done')) mrseo_generate_all_pages();
});

/* ============================================================
   AUTO-GENERATE COURSE PAGES
   Separate from the v4.1 generator so existing installs pick the
   courses up without re-running everything else.
   ============================================================ */
function mrseo_generate_course_pages(): void {
    if(get_option('mrseo_v431_courses_done')) return;

    foreach(mrseo_get_courses() as $slug=>$course){
        $is_short = ($course['tier'] ?? 'pro') === 'short';
        $title    = $course['name'].' in '.MRSEO_CAMPUS_CITY;
        $seo_t    = $is_short
            ? $course['name'].' Course in '.MRSEO_CAMPUS_CITY.' | PKR '.$course['fee'].' | MrSEO.pk'
            : $course['name'].' in '.MRSEO_CAMPUS_CITY.' with Free Internship | MrSEO.pk';
        $seo_d    = $is_short
            ? $course['duration'].' '.$course['name'].' course in '.MRSEO_CAMPUS.', and live online. PKR '.$course['fee'].' with a free certificate of completion. Evening and weekend batches.'
            : $course['duration'].' '.$course['name'].' course in '.MRSEO_CAMPUS.', and live online. Free internship on live client accounts and a certificate of completion. Taught by Syed Mudassir Shah.';

        $existing = get_page_by_path($slug,OBJECT,'course');
        if($existing){
            // Installs that ran v4.2 have the old Karachi wording. Correct it once.
            wp_update_post(['ID'=>$existing->ID,'post_title'=>$title]);
            update_post_meta($existing->ID,'_seo_title',$seo_t);
            update_post_meta($existing->ID,'_seo_desc', $seo_d);
            continue;
        }

        wp_insert_post([
            'post_title' =>$title,
            'post_name'  =>$slug,
            'post_type'  =>'course',
            'post_status'=>'publish',
            'menu_order' =>$is_short ? 20 : 10,
            'meta_input' =>[
                '_course_slug'=>$slug,
                '_course_name'=>$course['name'],
                '_course_tier'=>$course['tier'] ?? 'pro',
                '_seo_title'  =>$seo_t,
                '_seo_desc'   =>$seo_d,
            ],
        ]);
    }

    update_option('mrseo_v42_courses_done',true);
    update_option('mrseo_v43_courses_done',true);
    update_option('mrseo_v431_courses_done',true);
    flush_rewrite_rules();
}
add_action('after_switch_theme','mrseo_generate_course_pages',11);
add_action('admin_init', function(): void {
    if(!get_option('mrseo_v431_courses_done')) mrseo_generate_course_pages();
});

/* ============================================================
   COURSE ENROLMENT AJAX
   Separate handler from the contact form so enquiries and
   applications do not arrive looking identical.
   ============================================================ */
function mrseo_handle_enroll(): void {
    $nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';
    if(!wp_verify_nonce($nonce,'mrseo_nonce')){ wp_send_json_error('Security check failed. Please refresh the page and try again.'); }

    if(!empty($_POST['en_hp'])){ wp_send_json_error('Spam detected.'); }

    $name    = sanitize_text_field(wp_unslash($_POST['en_name'] ?? ''));
    $email   = sanitize_email(wp_unslash($_POST['en_email'] ?? ''));
    $phone   = sanitize_text_field(wp_unslash($_POST['en_phone'] ?? ''));
    $city    = sanitize_text_field(wp_unslash($_POST['en_city'] ?? ''));
    $course  = sanitize_text_field(wp_unslash($_POST['en_course'] ?? ''));
    $mode    = sanitize_text_field(wp_unslash($_POST['en_mode'] ?? ''));
    $edu     = sanitize_text_field(wp_unslash($_POST['en_edu'] ?? ''));
    $message = sanitize_textarea_field(wp_unslash($_POST['en_message'] ?? ''));

    if(!$name || !$email || !$phone || !$course){ wp_send_json_error('Please fill in your name, email, phone number and the course you want.'); }
    if(!is_email($email)){ wp_send_json_error('That email address does not look right. Please check it.'); }

    $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : 'unknown';

    $subject = 'Course application: '.$course.' from '.$name;
    $body    = "COURSE APPLICATION\n\nCourse: {$course}\nPreferred mode: {$mode}\n\nName: {$name}\nEmail: {$email}\nPhone/WhatsApp: {$phone}\nCity: {$city}\nEducation or background: {$edu}\n\nWhy they want to join:\n{$message}\n\n---\nSubmitted from the MrSEO.pk course page\nIP: {$ip}";
    $headers = ['Content-Type: text/plain; charset=UTF-8','From: MrSEO.pk <'.MRSEO_EMAIL.'>','Reply-To: '.$name.' <'.$email.'>'];

    if(wp_mail(MRSEO_EMAIL,$subject,$body,$headers)){
        wp_send_json_success('Application received. We will WhatsApp you about the next batch, usually within a day.');
    }
    wp_send_json_error('The application could not be sent. Please WhatsApp us on +'.MRSEO_WA.' instead.');
}
add_action('wp_ajax_mrseo_enroll','mrseo_handle_enroll');
add_action('wp_ajax_nopriv_mrseo_enroll','mrseo_handle_enroll');

/* ============================================================
   CONTACT FORM AJAX
   ============================================================ */
function mrseo_handle_contact(): void {
    $nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';
    if(!wp_verify_nonce($nonce,'mrseo_nonce')){ wp_send_json_error('Security check failed. Please refresh the page and try again.'); }

    if(!empty($_POST['cf_hp'])){ wp_send_json_error('Spam detected.'); }

    $name    = sanitize_text_field(wp_unslash($_POST['cf_name'] ?? ''));
    $email   = sanitize_email(wp_unslash($_POST['cf_email'] ?? ''));
    $phone   = sanitize_text_field(wp_unslash($_POST['cf_phone'] ?? ''));
    $city    = sanitize_text_field(wp_unslash($_POST['cf_city'] ?? ''));
    $service = sanitize_text_field(wp_unslash($_POST['cf_service'] ?? ''));
    $website = esc_url_raw(wp_unslash($_POST['cf_website'] ?? ''));
    $message = sanitize_textarea_field(wp_unslash($_POST['cf_message'] ?? ''));

    if(!$name || !$email || !$message){ wp_send_json_error('Please fill in your name, email and message.'); }
    if(!is_email($email)){ wp_send_json_error('That email address does not look right. Please check it.'); }

    $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : 'unknown';

    $subject = 'New enquiry from '.$name.' via MrSEO.pk';
    $body    = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nCity: {$city}\nService: {$service}\nWebsite: {$website}\n\nMessage:\n{$message}\n\n---\nSubmitted from the MrSEO.pk contact form\nIP: {$ip}";
    $headers = ['Content-Type: text/plain; charset=UTF-8','From: MrSEO.pk <'.MRSEO_EMAIL.'>','Reply-To: '.$name.' <'.$email.'>'];

    if(wp_mail(MRSEO_EMAIL,$subject,$body,$headers)){
        wp_send_json_success('Thanks, your message is through. Syed will get back to you within a couple of hours.');
    }
    wp_send_json_error('The message could not be sent. Please WhatsApp us on +'.MRSEO_WA.' instead.');
}
add_action('wp_ajax_mrseo_contact','mrseo_handle_contact');
add_action('wp_ajax_nopriv_mrseo_contact','mrseo_handle_contact');

/* ============================================================
   FALLBACK SEO META
   Only runs when no dedicated SEO plugin is active.
   ============================================================ */
function mrseo_seo_meta(): void {
    if(function_exists('wpseo_init') || class_exists('RankMath')) return;
    global $post;

    $custom_title = $custom_desc = '';
    if(is_singular() && $post){
        $custom_title = (string)get_post_meta($post->ID,'_seo_title',true);
        $custom_desc  = (string)get_post_meta($post->ID,'_seo_desc',true);
    }

    $default_desc = 'Syed Mudassir Shah has worked on Pakistani search since 2010. SEO, local visibility and paid search for businesses in Karachi, Lahore, Islamabad and across the country. Free audit within 24 hours.';
    $title = $custom_title ?: (is_singular() && $post ? get_the_title().' | MrSEO.pk' : 'SEO Expert in Pakistan | MrSEO.pk');
    $desc  = $custom_desc  ?: (is_singular() && $post ? wp_trim_words(wp_strip_all_tags(get_the_excerpt()),28) : $default_desc);
    $url   = is_singular() && $post ? get_permalink() : home_url('/');
    $image = is_singular() && $post && has_post_thumbnail() ? get_the_post_thumbnail_url($post->ID,'large') : MRSEO_URI.'/logo.png';

    echo '<meta name="description" content="'.esc_attr($desc).'">'."\n";
    echo '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">'."\n";
    echo '<link rel="canonical" href="'.esc_url($url).'">'."\n";
    echo '<meta property="og:title" content="'.esc_attr($title).'">'."\n";
    echo '<meta property="og:description" content="'.esc_attr($desc).'">'."\n";
    echo '<meta property="og:url" content="'.esc_url($url).'">'."\n";
    echo '<meta property="og:image" content="'.esc_url($image).'">'."\n";
    echo '<meta property="og:image:width" content="1200">'."\n";
    echo '<meta property="og:image:height" content="630">'."\n";
    echo '<meta property="og:type" content="'.(is_singular()?'article':'website').'">'."\n";
    echo '<meta property="og:site_name" content="MrSEO.pk">'."\n";
    echo '<meta property="og:locale" content="en_PK">'."\n";
    echo '<meta name="twitter:card" content="summary_large_image">'."\n";
    echo '<meta name="twitter:title" content="'.esc_attr($title).'">'."\n";
    echo '<meta name="twitter:description" content="'.esc_attr($desc).'">'."\n";
    echo '<meta name="twitter:image" content="'.esc_url($image).'">'."\n";
}
add_action('wp_head','mrseo_seo_meta',5);

/* ============================================================
   SCHEMA MARKUP
   Fallback graph, used when no SEO plugin is handling schema.
   No aggregateRating or review markup is emitted here. Self-serving
   review markup on your own business breaks Google's structured data
   policy, and inventing ratings risks a manual action. Connect a real
   review source before adding it.
   ============================================================ */
function mrseo_schema(): void {
    if(class_exists('RankMath')) return;

    $graph = [];

    $graph[] = [
        '@type'=>'WebSite','@id'=>home_url('/#website'),
        'url'=>home_url('/'),
        'name'=>'MrSEO.pk',
        'inLanguage'=>'en-PK',
        'description'=>'SEO and digital marketing for Pakistani businesses.',
        'publisher'=>['@id'=>home_url('/#business')],
        'potentialAction'=>['@type'=>'SearchAction','target'=>['@type'=>'EntryPoint','urlTemplate'=>home_url('/?s={search_term_string}')],'query-input'=>'required name=search_term_string'],
    ];

    $graph[] = [
        '@type'=>['LocalBusiness','ProfessionalService'],
        '@id'=>home_url('/#business'),
        'name'=>'MrSEO.pk',
        'url'=>home_url('/'),
        'logo'=>['@type'=>'ImageObject','url'=>MRSEO_URI.'/logo.png','width'=>240,'height'=>60],
        'image'=>MRSEO_URI.'/logo.png',
        'description'=>'SEO, local search and paid media for businesses across Pakistan. Founded by Syed Mudassir Shah in 2010.',
        'telephone'=>MRSEO_PHONE,
        'email'=>MRSEO_EMAIL,
        'address'=>['@type'=>'PostalAddress','addressCountry'=>'PK','addressLocality'=>'Karachi','addressRegion'=>'Sindh'],
        'areaServed'=>array_values(array_map(fn($c)=>['@type'=>'City','name'=>$c['name']], mrseo_get_cities())),
        'knowsLanguage'=>['en','ur'],
        'foundingDate'=>'2010',
        'priceRange'=>'$$',
        'currenciesAccepted'=>'PKR',
        'founder'=>['@id'=>home_url('/#owner')],
        'openingHoursSpecification'=>[['@type'=>'OpeningHoursSpecification','dayOfWeek'=>['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],'opens'=>'09:00','closes'=>'22:00']],
        'department'=>[['@id'=>home_url('/#campus')]],
    ];

    // Training campus. Courses are taught here, so it gets its own entity.
    $graph[] = [
        '@type'=>['EducationalOrganization','LocalBusiness'],
        '@id'=>home_url('/#campus'),
        'name'=>'MrSEO.pk Digital Marketing Institute',
        'url'=>home_url('/courses/'),
        'parentOrganization'=>['@id'=>home_url('/#business')],
        'description'=>'Digital marketing courses in '.MRSEO_CAMPUS.', serving students across '.MRSEO_CAMPUS_AREA.', plus live online batches nationwide.',
        'telephone'=>MRSEO_PHONE,
        'email'=>MRSEO_EMAIL,
        'address'=>['@type'=>'PostalAddress','streetAddress'=>MRSEO_CAMPUS,'addressLocality'=>MRSEO_CAMPUS_CITY,'addressRegion'=>'Punjab','addressCountry'=>'PK'],
        'areaServed'=>[['@type'=>'City','name'=>'Rawalpindi'],['@type'=>'City','name'=>'Islamabad'],['@type'=>'Country','name'=>'Pakistan']],
        'knowsLanguage'=>['en','ur'],
    ];

    $graph[] = [
        '@type'=>'Person',
        '@id'=>home_url('/#owner'),
        'name'=>MRSEO_OWNER,
        'jobTitle'=>'SEO consultant',
        'worksFor'=>['@id'=>home_url('/#business')],
        'url'=>home_url('/about'),
        'knowsAbout'=>['Search engine optimisation','Technical SEO','Local SEO','Google Ads','Content marketing','Web development','Digital marketing training'],
        'description'=>'SEO consultant working on Pakistani search since 2010. Founder of MrSEO.pk.',
    ];

    if(is_singular('course')){
        $course_schema = function_exists('mrseo_course_schema') ? mrseo_course_schema(get_queried_object_id()) : [];
        if($course_schema) $graph[] = $course_schema;
    }

    $breadcrumb = function_exists('mrseo_breadcrumb_schema') ? mrseo_breadcrumb_schema() : [];
    if($breadcrumb) $graph[] = $breadcrumb;

    $faqs = function_exists('mrseo_current_faqs') ? mrseo_current_faqs() : [];
    if($faqs){
        $faq_schema = mrseo_faq_schema($faqs);
        if($faq_schema) $graph[] = $faq_schema;
    }

    echo '<script type="application/ld+json">'.wp_json_encode(['@context'=>'https://schema.org','@graph'=>$graph], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE).'</script>'."\n";
}
add_action('wp_head','mrseo_schema',10);

/* ============================================================
   LAZY LOADING
   ============================================================ */
function mrseo_add_lazy_loading(string $content): string {
    return preg_replace('/<img(?![^>]*loading=)([^>]+)>/', '<img loading="lazy" decoding="async"$1>', $content);
}
add_filter('the_content','mrseo_add_lazy_loading');

/* ============================================================
   CUSTOMIZER
   ============================================================ */
function mrseo_customizer($wp_customize): void {
    $wp_customize->add_panel('mrseo_panel',['title'=>'MrSEO.pk Settings','priority'=>25]);
    $wp_customize->add_section('mrseo_hero',['title'=>'Hero Section','panel'=>'mrseo_panel','priority'=>10]);
    $fields = [
        'hero_eyebrow'=>['SEO consultant, Pakistan','Eyebrow'],
        'hero_title_1'=>['Get found on Google','Title line 1'],
        'hero_title_2'=>['across Pakistan','Title line 2 (green)'],
        'hero_desc'   =>['Syed Mudassir Shah has been ranking Pakistani businesses since 2010. Straight answers, honest timelines and reporting that connects rankings to enquiries.','Description'],
        'hero_cta'    =>['Get a free SEO audit','CTA text'],
    ];
    foreach($fields as $k=>[$default,$label]){
        $wp_customize->add_setting("mrseo_{$k}",['default'=>$default,'sanitize_callback'=>'sanitize_text_field']);
        $wp_customize->add_control("mrseo_{$k}",['label'=>$label,'section'=>'mrseo_hero','type'=>str_contains($k,'desc')?'textarea':'text']);
    }
}
add_action('customize_register','mrseo_customizer');

/* ============================================================
   HELPERS
   ============================================================ */
function mrseo_opt(string $key, string $default=''): string { return (string)get_theme_mod("mrseo_{$key}",$default); }

function mrseo_logo(): void {
    if(has_custom_logo()){ the_custom_logo(); return; }
    echo '<a href="'.esc_url(home_url('/')).'" class="site-logo" rel="home"><img src="'.esc_url(MRSEO_URI.'/logo.png').'" alt="MrSEO.pk" width="180" height="58" loading="eager" fetchpriority="high" style="height:58px;width:auto;max-width:190px"></a>';
}

function mrseo_contact_form_sc(): string { ob_start(); get_template_part('template-parts/contact-form'); return (string)ob_get_clean(); }
add_shortcode('mrseo_contact','mrseo_contact_form_sc');

add_filter('excerpt_length',fn()=>28,999);
add_filter('excerpt_more', fn()=>'&hellip;');

function mrseo_body_classes(array $c): array {
    if(is_singular())   $c[]='singular';
    if(is_front_page()) $c[]='home-page';
    return $c;
}
add_filter('body_class','mrseo_body_classes');

/* ============================================================
   SIDEBARS
   ============================================================ */
function mrseo_sidebars(): void {
    register_sidebar([
        'name'=>'Blog Sidebar','id'=>'sidebar-blog',
        'before_widget'=>'<div id="%1$s" class="widget %2$s">','after_widget'=>'</div>',
        'before_title'=>'<h3 class="widget-title">','after_title'=>'</h3>',
    ]);
}
add_action('widgets_init','mrseo_sidebars');

/* ============================================================
   TAXONOMIES
   ============================================================ */
function mrseo_register_taxes(): void {
    register_taxonomy('service-type',['service','case-study'],['labels'=>['name'=>'Service Types','singular_name'=>'Service Type'],'hierarchical'=>true,'show_in_rest'=>true,'rewrite'=>['slug'=>'service-type']]);
    register_taxonomy('city-tax',['city-page','case-study'],['labels'=>['name'=>'Cities','singular_name'=>'City'],'hierarchical'=>false,'show_in_rest'=>true,'rewrite'=>['slug'=>'city']]);
    register_taxonomy('industry-tax',['industry-page','case-study'],['labels'=>['name'=>'Industries','singular_name'=>'Industry'],'hierarchical'=>false,'show_in_rest'=>true,'rewrite'=>['slug'=>'industry']]);
}
add_action('init','mrseo_register_taxes');
