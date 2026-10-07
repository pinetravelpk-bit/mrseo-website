<?php
/**
 * MrSEO.pk - Long-form content renderer
 * Outputs semantic, crawlable, answer-engine friendly article markup.
 *
 * Design notes:
 *  - FAQ answers are always present in the HTML (never JS-injected) so that
 *    search engines and AI answer engines can read them.
 *  - Every section gets a stable id so the table of contents produces
 *    jump links, which supports sitelink and passage-level results.
 *  - A short "quick answer" block sits directly under the H1 area, which is
 *    the pattern featured snippets and AI overviews extract most reliably.
 *
 * @package MrSEO_PK
 */
if(!defined('ABSPATH')) exit;

/**
 * Turn a heading into a stable anchor id.
 */
function mrseo_anchor(string $text): string {
    $slug = sanitize_title($text);
    return $slug !== '' ? 'sec-'.$slug : 'sec-'.substr(md5($text),0,8);
}

/**
 * Direct-answer block. Answer engines pull from short, self-contained
 * paragraphs placed high on the page, so this stays under 60 words.
 */
function mrseo_render_answer_box(string $question, string $answer): void {
    if($answer === '') return;
    ?>
    <div class="answer-box">
        <p class="answer-label"><?php echo esc_html($question); ?></p>
        <p class="answer-text"><?php echo esc_html($answer); ?></p>
    </div>
    <?php
}

/**
 * Table of contents built from the section headings.
 */
function mrseo_render_toc(array $sections, array $faqs = []): void {
    if(count($sections) < 3) return;
    ?>
    <nav class="toc" aria-label="On this page">
        <p class="toc-title">On this page</p>
        <ol class="toc-list">
            <?php foreach($sections as $s): ?>
            <li><a href="#<?php echo esc_attr(mrseo_anchor($s['h2'])); ?>"><?php echo esc_html($s['h2']); ?></a></li>
            <?php endforeach; ?>
            <?php if($faqs): ?>
            <li><a href="#faq">Frequently asked questions</a></li>
            <?php endif; ?>
        </ol>
    </nav>
    <?php
}

/**
 * Article body. Content is trusted theme-authored HTML, so a restricted
 * wp_kses allow-list is applied rather than raw output.
 */
function mrseo_render_sections(array $sections): void {
    $allowed = [
        'p'=>[], 'strong'=>[], 'em'=>[], 'br'=>[],
        'ul'=>[], 'ol'=>[], 'li'=>[],
        'h3'=>['id'=>[]], 'h4'=>['id'=>[]],
        'a'=>['href'=>[], 'title'=>[], 'rel'=>[]],
        'table'=>['class'=>[]], 'thead'=>[], 'tbody'=>[], 'tr'=>[], 'th'=>['scope'=>[]], 'td'=>[],
        'blockquote'=>[],
    ];
    foreach($sections as $s){
        $id = mrseo_anchor($s['h2']);
        echo '<section class="art-block">';
        echo '<h2 id="'.esc_attr($id).'">'.esc_html($s['h2']).'</h2>';
        echo wp_kses($s['html'], $allowed);
        echo '</section>';
    }
}

/**
 * Visible FAQ list. Answers stay in the DOM at all times.
 */
function mrseo_render_faqs(array $faqs, string $heading = 'Frequently Asked Questions'): void {
    if(!$faqs) return;
    ?>
    <section class="art-block" id="faq">
        <h2><?php echo esc_html($heading); ?></h2>
        <div class="faq-list">
            <?php foreach($faqs as $i => $f): ?>
            <div class="faq-item">
                <h3 class="faq-q" role="button" tabindex="0" aria-expanded="false" aria-controls="faq-a-<?php echo (int)$i; ?>">
                    <span class="faq-q-text"><?php echo esc_html($f['q']); ?></span>
                    <span class="faq-arrow" aria-hidden="true">+</span>
                </h3>
                <div class="faq-a" id="faq-a-<?php echo (int)$i; ?>">
                    <p><?php echo esc_html($f['a']); ?></p>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </section>
    <?php
}

/**
 * Author and freshness block. Real, checkable authorship is one of the
 * few signals that genuinely moves the needle on quality assessment.
 */
function mrseo_render_byline(): void {
    $modified = get_the_modified_date('F Y');
    ?>
    <div class="art-byline">
        <span class="ab-av" aria-hidden="true">SMS</span>
        <div class="ab-meta">
            <span class="ab-name">Written by <a href="<?php echo esc_url(home_url('/about')); ?>" rel="author">Syed Mudassir Shah</a></span>
            <span class="ab-role">SEO consultant, MrSEO.pk. Working on Pakistani search since 2010.</span>
            <?php if($modified): ?>
            <span class="ab-date">Last reviewed: <?php echo esc_html($modified); ?></span>
            <?php endif; ?>
        </div>
    </div>
    <?php
}

/**
 * Full article render for city and industry pages.
 */
function mrseo_render_article(array $content, string $answer_question): void {
    if(!$content) return;
    echo '<div class="mrseo-article">';
    mrseo_render_byline();
    if(!empty($content['quick'])) mrseo_render_answer_box($answer_question, $content['quick']);
    mrseo_render_toc($content['sections'] ?? [], $content['faqs'] ?? []);
    mrseo_render_sections($content['sections'] ?? []);
    mrseo_render_faqs($content['faqs'] ?? []);
    echo '</div>';
}

/**
 * Build FAQPage schema from a content array.
 * Only ever called for FAQs that are visibly rendered on the same page,
 * which is what Google's structured data policy requires.
 */
function mrseo_faq_schema(array $faqs): array {
    $entities = [];
    foreach($faqs as $f){
        $entities[] = [
            '@type' => 'Question',
            'name'  => wp_strip_all_tags($f['q']),
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text'  => wp_strip_all_tags($f['a']),
            ],
        ];
    }
    return $entities ? ['@type'=>'FAQPage','mainEntity'=>$entities] : [];
}

/**
 * Return the FAQ set for the current singular view, if any.
 */
function mrseo_home_faqs(): array {
    return [
        ['q'=>'How long does SEO take to show results in Pakistan?',
         'a'=>'Local service businesses usually see ranking movement within 30 to 60 days and meaningful enquiry growth by month three. Competitive categories such as property, healthcare groups and finance take six to twelve months because Google assesses those results more strictly. Anyone promising first page in 30 days for a competitive keyword is either misinformed or planning to use tactics that will eventually cost you the site.'],
        ['q'=>'What does SEO cost in Pakistan?',
         'a'=>'It depends on how many services and areas you need covered, how much content already exists and how competitive your category is. A single-location clinic needs far less work than a multi-campus school or a property developer with twenty projects. We quote after the audit rather than selling fixed packages, because a package price is a guess made before anyone has looked at your site.'],
        ['q'=>'Which cities does MrSEO.pk work in?',
         'a'=>'Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Quetta, Faisalabad and Multan have their own dedicated strategy pages, and we work with businesses in smaller cities and towns across Pakistan as well. We also work with Pakistani exporters and software firms targeting buyers overseas.'],
        ['q'=>'What is included in the free SEO audit?',
         'a'=>'A written breakdown of your current visibility, the technical problems holding the site back, how you compare against the competitors actually ranking above you, the keyword opportunities you are missing, and a prioritised list of what to fix first. It arrives within 24 hours and there is no obligation attached to it.'],
        ['q'=>'Do you guarantee first page rankings?',
         'a'=>'No, and nobody honestly can. Google does not sell or guarantee positions, and any agency offering one is either targeting keywords nobody searches or using tactics that risk a penalty. What we do commit to is a clear plan, weekly rank tracking, monthly reporting tied to enquiries rather than vanity metrics, and no long-term lock-in contract.'],
        ['q'=>'Should my website be in English or Urdu?',
         'a'=>'English is usually right for the primary site, since it remains the default for commercial search in most categories. Roman Urdu phrases carry genuine volume in consumer sectors and should be woven into English pages naturally. Full Urdu pages make sense selectively, and we decide that from your own Search Console data rather than applying a blanket rule.'],
    ];
}

function mrseo_contact_faqs(): array {
    return [
        ['q'=>'How quickly will I get a reply?',
         'a'=>'WhatsApp messages usually get a reply within an hour during working hours, which are 9am to 10pm Pakistan time, six days a week. Email replies go out the same day. The contact form lands in the same inbox as email.'],
        ['q'=>'What exactly is in the free SEO audit?',
         'a'=>'A written breakdown covering your current visibility, the technical issues holding the site back, how you compare against the sites currently ranking above you, keyword opportunities you are not covering, and a prioritised list of what to fix first. It arrives within 24 hours.'],
        ['q'=>'Do you work with businesses outside Islamabad?',
         'a'=>'Yes. There are dedicated strategy pages for Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Quetta, Faisalabad and Multan, and we work with businesses in smaller cities too. We also work with Pakistani exporters and software firms selling to buyers overseas.'],
        ['q'=>'How long before I see results?',
         'a'=>'Local service businesses typically see ranking movement within 30 to 60 days and enquiry growth by month three. Competitive categories such as property, healthcare groups and finance take six to twelve months. You get weekly rank tracking either way, so progress is visible rather than promised.'],
        ['q'=>'What does it cost?',
         'a'=>'It depends on how many services and areas need covering, how much content exists already and how competitive your category is. We quote after the audit rather than selling fixed packages, because a package price is a guess made before anyone has looked at the site.'],
        ['q'=>'Is there a contract or minimum commitment?',
         'a'=>'Monthly terms with no long-term lock-in. You can stop at the end of any month. Removing the contract removes a lot of bad incentives on both sides.'],
        ['q'=>'Do you also handle ads, social media and web development?',
         'a'=>'Yes. SEO, Google and Meta ads, social media, content and web development are all in scope. Most clients start with one and add others once it is working, rather than buying everything at once.'],
        ['q'=>'Can you guarantee first page rankings?',
         'a'=>'No, and nobody honestly can. Google does not sell positions. What we commit to is a written plan, weekly tracking, monthly reporting tied to enquiries, and telling you early if something is not working.'],
    ];
}

function mrseo_current_faqs(): array {
    if(is_front_page()) return mrseo_home_faqs();
    if(is_page('contact')) return mrseo_contact_faqs();
    if(is_post_type_archive('course')) return mrseo_courses_faqs();
    if(!is_singular()) return [];
    $post_id = get_queried_object_id();
    if(!$post_id) return [];

    if(get_post_type($post_id) === 'city-page'){
        $slug = get_post_meta($post_id,'_city_slug',true);
        $c = mrseo_city_content((string)$slug);
        return $c['faqs'] ?? [];
    }
    if(get_post_type($post_id) === 'industry-page'){
        $slug = get_post_meta($post_id,'_industry_slug',true);
        $c = mrseo_industry_content((string)$slug);
        return $c['faqs'] ?? [];
    }
    if(get_post_type($post_id) === 'course'){
        $slug = get_post_meta($post_id,'_course_slug',true);
        $c = function_exists('mrseo_course_content') ? mrseo_course_content((string)$slug) : [];
        return $c['faqs'] ?? [];
    }
    if(get_post_type($post_id) === 'service'){
        $slug = get_post_meta($post_id,'_service_slug',true);
        $c = function_exists('mrseo_service_content') ? mrseo_service_content((string)$slug) : [];
        return $c['faqs'] ?? [];
    }
    return [];
}

/**
 * Breadcrumb schema. Helps Google render the site hierarchy in results
 * instead of guessing from the URL.
 */
function mrseo_breadcrumb_schema(): array {
    if(is_front_page()) return [];
    $items = [[
        '@type'=>'ListItem','position'=>1,'name'=>'Home','item'=>home_url('/'),
    ]];
    $pos = 2;

    if(is_singular('city-page')){
        $items[] = ['@type'=>'ListItem','position'=>$pos++,'name'=>'SEO by City','item'=>home_url('/seo-expert/')];
    } elseif(is_singular('industry-page')){
        $items[] = ['@type'=>'ListItem','position'=>$pos++,'name'=>'SEO by Industry','item'=>home_url('/seo-for/')];
    } elseif(is_singular('service')){
        $items[] = ['@type'=>'ListItem','position'=>$pos++,'name'=>'Services','item'=>home_url('/services/')];
    } elseif(is_singular('course')){
        $items[] = ['@type'=>'ListItem','position'=>$pos++,'name'=>'Courses','item'=>home_url('/courses/')];
    }

    if(is_singular()){
        $items[] = ['@type'=>'ListItem','position'=>$pos,'name'=>wp_strip_all_tags(get_the_title()),'item'=>get_permalink()];
    }

    return count($items) > 1 ? ['@type'=>'BreadcrumbList','itemListElement'=>$items] : [];
}

/**
 * FAQ set for the courses landing page. These answer the questions
 * prospective students actually send on WhatsApp before enrolling.
 */
function mrseo_courses_faqs(): array {
    return [
        ['q'=>'Is the internship really free, and is it paid work?',
         'a'=>'On the professional courses it is included in the fee, so there is nothing extra to pay for it, and the short courses do not include it at all. It is not paid work: you are not earning a salary during it. You are placed on live client accounts under supervision for six to eight weeks at around twelve to fifteen hours a week, which is what turns coursework into something you can put on a CV.'],
        ['q'=>'Is the certificate government approved or HEC recognised?',
         'a'=>'No. It is a certificate of completion issued by MrSEO.pk and verifiable on request. It is not accredited by HEC, NAVTTC or any government body, and any private institute implying otherwise is misleading you. In this field employers hire on portfolio and practical ability, which is what the course and internship are built to produce.'],
        ['q'=>'Where exactly is the office, and can I attend from Islamabad?',
         'a'=>'Classes are held at our office in Scheme 3, Rawalpindi, which is straightforward to reach from Satellite Town, Saddar, Chaklala, Bahria and most of Islamabad. Every course also runs live online alongside the on-site batch, and all sessions are recorded, so students from other cities take the same course remotely.'],
        ['q'=>'What is the difference between the short courses and the professional ones?',
         'a'=>'The short courses run two to three weeks at PKR 2,000 to PKR 4,000 and teach one skill, such as Canva, AI basics, WordPress, video editing, freelancing or Meta ads. They include the certificate but not the internship. The professional courses run six to sixteen weeks, cost PKR 6,000 to PKR 15,000, and include the supervised internship and a written reference.'],
        ['q'=>'Can I move from a short course to a full one?',
         'a'=>'Yes, and the fee you paid for the short course comes off the professional course if you upgrade within three months. Several students start with Canva or AI basics to see whether they enjoy the work before committing to a longer programme.'],
        ['q'=>'Do I need any background in marketing or IT?',
         'a'=>'For most of the courses, no. You need a laptop, a stable internet connection and working English, since the tools and documentation are in English. The content writing course expects you to already write clear English, and the AI course goes better with some marketing context.'],
        ['q'=>'Will I get a job after finishing?',
         'a'=>'No course can promise that and we do not. What we provide is a real portfolio, supervised experience on client accounts, a written reference and interview preparation. Students who complete the internship generally find junior roles or freelance clients; students who skip it usually do not.'],
        ['q'=>'How much do the courses cost and can I pay in instalments?',
         'a'=>'Short courses are PKR 2,000 to PKR 4,000 in one payment. Professional courses run from PKR 6,000 for the six-week programmes to PKR 15,000 for the complete sixteen-week one, and can be split across two instalments. The fee covers classes, recordings, the certificate, and the internship on the professional courses. Nothing is added later.'],
        ['q'=>'What happens if I miss classes?',
         'a'=>'Every session is recorded and you keep access, so a missed evening is recoverable. Assignments are the part that matters: the internship placement depends on completing the coursework, because we are not putting someone on a client account who has not done the work.'],
        ['q'=>'Who teaches the courses?',
         'a'=>'Syed Mudassir Shah, who has been working on Pakistani search since 2010 and still runs client accounts daily. The material comes out of live work rather than a purchased curriculum, which is also why the examples are Pakistani businesses rather than imported case studies.'],
    ];
}

/**
 * Course schema for a single course page.
 * Uses hasCourseInstance so the schedule, mode and duration are
 * expressed properly, plus the free internship and certificate as
 * part of the credential. No ratings are emitted.
 */
function mrseo_course_schema(int $post_id): array {
    $slug    = (string)get_post_meta($post_id,'_course_slug',true);
    $courses = function_exists('mrseo_get_courses') ? mrseo_get_courses() : [];
    $c       = $courses[$slug] ?? [];
    if(!$c) return [];

    $weeks = (int)filter_var($c['duration'], FILTER_SANITIZE_NUMBER_INT);
    $fee   = (float)str_replace(',','',$c['fee']);

    return [
        '@type'       => 'Course',
        '@id'         => get_permalink($post_id).'#course',
        'name'        => $c['name'].' in '.MRSEO_CAMPUS_CITY,
        'description' => wp_strip_all_tags($c['desc']),
        'url'         => get_permalink($post_id),
        'inLanguage'  => 'en-PK',
        'provider'    => ['@id'=>home_url('/#campus')],
        'educationalLevel' => $c['level'],
        'teaches'     => array_values($c['outcomes'] ?? []),
        'educationalCredentialAwarded' => [
            '@type' => 'EducationalOccupationalCredential',
            'name'  => 'Certificate of completion',
            'credentialCategory' => 'Certificate',
            'recognizedBy' => ['@id'=>home_url('/#business')],
        ],
        'offers' => [
            '@type'         => 'Offer',
            'category'      => 'Paid',
            'price'         => $fee,
            'priceCurrency' => 'PKR',
            'availability'  => 'https://schema.org/InStock',
            'url'           => get_permalink($post_id).'#enroll',
        ],
        'hasCourseInstance' => [
            [
                '@type'        => 'CourseInstance',
                'courseMode'   => 'Onsite',
                'courseWorkload'=> 'P'.max($weeks,1).'W',
                'location'     => ['@type'=>'Place','name'=>'MrSEO.pk, '.MRSEO_CAMPUS,'address'=>['@type'=>'PostalAddress','streetAddress'=>MRSEO_CAMPUS,'addressLocality'=>MRSEO_CAMPUS_CITY,'addressRegion'=>'Punjab','addressCountry'=>'PK']],
                'instructor'   => ['@id'=>home_url('/#owner')],
            ],
            [
                '@type'        => 'CourseInstance',
                'courseMode'   => 'Online',
                'courseWorkload'=> 'P'.max($weeks,1).'W',
                'instructor'   => ['@id'=>home_url('/#owner')],
            ],
        ],
    ];
}
