import type { Field, GlobalConfig } from 'payload';
import {
  cardsField, ctaGroup, faqsField, globalRevalidate, heroFields, HIGHLIGHT_HELP, sectionHead, seoFields, statsField, stepsField, textList,
} from '../fields';

const base = (slug: string, label: string, fields: Field[], description?: string): GlobalConfig => ({
  slug,
  label,
  admin: { group: 'Page settings', description },
  access: { read: () => true },
  hooks: { afterChange: [globalRevalidate] },
  fields,
});

const tabs = (t: { label: string; fields: Field[] }[]): Field => ({ type: 'tabs', tabs: t });

export const Settings = base('settings', 'Site settings', [
  tabs([
    {
      label: 'Business details',
      fields: [
        { type: 'row', fields: [{ name: 'ownerName', type: 'text', required: true, label: 'Owner name' }, { name: 'brandTagline', type: 'text', label: 'Logo tagline' }] },
        {
          type: 'row',
          fields: [
            { name: 'email', type: 'email', required: true },
            { name: 'whatsapp', type: 'text', required: true, label: 'WhatsApp number', admin: { description: 'Digits only with country code, e.g. 923435853835' } },
            { name: 'phone', type: 'text', required: true, label: 'Phone (as displayed)' },
          ],
        },
        { type: 'row', fields: [{ name: 'baseCity', type: 'text', required: true, label: 'Based in (city)' }, { name: 'baseRegion', type: 'text', label: 'Region' }] },
        {
          type: 'row',
          fields: [
            { name: 'campus', type: 'text', required: true, label: 'Training campus', admin: { description: 'e.g. Scheme 3, Rawalpindi' } },
            { name: 'campusCity', type: 'text', required: true, label: 'Campus city' },
            { name: 'campusArea', type: 'text', label: 'Campus serves' },
          ],
        },
        { name: 'officeHours', type: 'text', label: 'Office hours' },
        {
          type: 'row',
          fields: [
            { name: 'yearsExperience', type: 'text', label: 'Years of experience', admin: { description: 'e.g. 14+' } },
            { name: 'websitesRanked', type: 'text', label: 'Websites ranked', admin: { description: 'e.g. 50+' } },
            { name: 'clientsServed', type: 'text', label: 'Clients served', admin: { description: 'e.g. 400+' } },
          ],
        },
      ],
    },
    {
      label: 'Footer and author',
      fields: [
        { name: 'footerText', type: 'textarea', label: 'Footer description' },
        { name: 'authorBio', type: 'textarea', label: 'Author box on blog posts' },
        { name: 'whatsappMessage', type: 'text', label: 'Default WhatsApp message', admin: { description: 'Pre-filled text when visitors tap the WhatsApp buttons.' } },
        {
          name: 'socials', type: 'array', label: 'Social profiles', labels: { singular: 'Profile', plural: 'Profiles' },
          fields: [{
            type: 'row',
            fields: [
              { name: 'platform', type: 'select', required: true, options: ['facebook', 'instagram', 'x', 'linkedin', 'youtube', 'tiktok'].map((v) => ({ label: v, value: v })) },
              { name: 'url', type: 'text', required: true },
            ],
          }],
        },
      ],
    },
    {
      label: 'SEO defaults',
      fields: [
        { name: 'defaultMetaDescription', type: 'textarea', label: 'Default meta description' },
        { name: 'founderSameAs', type: 'array', label: 'Owner profile links for Google', admin: { description: 'LinkedIn and similar profiles that identify the owner in structured data.' }, fields: [{ name: 'url', type: 'text', required: true }] },
      ],
    },
  ]),
], 'Contact details, numbers and links used across the whole site.');

export const HomePage = base('home', 'Homepage', [
  tabs([
    {
      label: 'Hero',
      fields: [
        ...seoFields,
        { name: 'heroEyebrow', type: 'text', label: 'Eyebrow' },
        { name: 'heroTitle', type: 'text', label: 'Headline', admin: { description: HIGHLIGHT_HELP } },
        { name: 'heroDesc', type: 'textarea', label: 'Intro' },
        textList('heroPoints', 'Tick points'),
        statsField('heroStats', 'Hero stats'),
        { name: 'cardRole', type: 'text', label: 'Profile card: role' },
        { name: 'cardLocation', type: 'text', label: 'Profile card: location line' },
        { name: 'cardLabel', type: 'text', label: 'Profile card: list heading' },
        textList('cardPoints', 'Profile card: points'),
        { name: 'answerLabel', type: 'text', label: 'Answer box: question' },
        { name: 'answerText', type: 'textarea', label: 'Answer box: answer' },
      ],
    },
    {
      label: 'Sections',
      fields: [
        sectionHead('servicesHead', 'Services section'),
        sectionHead('coursesHead', 'Courses section'),
        { name: 'shortTitle', type: 'text', label: 'Short courses strip: title', admin: { description: HIGHLIGHT_HELP } },
        { name: 'shortText', type: 'textarea', label: 'Short courses strip: text' },
        sectionHead('citiesHead', 'Locations section'),
        sectionHead('industriesHead', 'Industries section'),
        sectionHead('processHead', 'Process section', false),
        stepsField('steps', 'Process steps'),
        sectionHead('whyHead', 'Why us section', false),
        cardsField('whys', 'Why us cards'),
        sectionHead('testimonialsHead', 'Testimonials section', false),
      ],
    },
    {
      label: 'FAQs and contact',
      fields: [
        sectionHead('faqHead', 'FAQ section', false),
        faqsField(),
        sectionHead('contactHead', 'Contact form section'),
        ctaGroup(),
      ],
    },
  ]),
]);

export const AboutPage = base('about', 'About page', [
  ...seoFields,
  { name: 'eyebrow', type: 'text' },
  { name: 'title', type: 'text', admin: { description: HIGHLIGHT_HELP } },
  { name: 'lead', type: 'richText', label: 'Opening paragraphs' },
  { name: 'cardRole', type: 'text', label: 'Profile card: role' },
  { name: 'cardLocation', type: 'text', label: 'Profile card: location' },
  { name: 'cardSkills', type: 'text', label: 'Profile card: skills line' },
  statsField('stats', 'Profile card stats'),
  { name: 'answer', type: 'textarea', label: 'In short' },
  {
    name: 'sections', type: 'array', labels: { singular: 'Section', plural: 'Sections' },
    fields: [{ name: 'heading', type: 'text', required: true }, { name: 'content', type: 'richText' }],
  },
  sectionHead('industriesHead', 'Industries section', false),
  ctaGroup(),
]);

export const ContactPage = base('contact-page', 'Contact page', [
  ...heroFields(),
  sectionHead('faqHead', 'FAQ section', false),
  faqsField(),
]);

export const CoursesPage = base('courses-page', 'Courses page', [
  tabs([
    {
      label: 'Top of page',
      fields: [
        ...heroFields(),
        textList('badges', 'Badges'),
        { name: 'answerQuestion', type: 'text', label: 'Answer box: question' },
        { name: 'answer', type: 'textarea', label: 'Answer box: answer' },
      ],
    },
    {
      label: 'Sections',
      fields: [
        sectionHead('proHead', 'Professional courses section'),
        sectionHead('shortHead', 'Short courses section'),
        { name: 'shortNote', type: 'textarea', label: 'Note under short courses' },
        sectionHead('includesHead', 'What is included section'),
        cardsField('includesPro', 'Included with professional courses'),
        cardsField('includesShort', 'Included with short courses'),
        sectionHead('howHead', 'How it runs section', false),
        stepsField('howItRuns', 'How it runs steps'),
        {
          name: 'campusFacts', type: 'array', label: 'Campus facts strip',
          fields: [{ type: 'row', fields: [{ name: 'label', type: 'text', required: true }, { name: 'value', type: 'text', required: true }] }],
        },
        sectionHead('applyHead', 'Apply section'),
      ],
    },
    { label: 'FAQs', fields: [sectionHead('faqHead', 'FAQ section', false), faqsField()] },
  ]),
]);

const hub = (name: string, label: string): Field => ({ name, type: 'group', label, fields: heroFields() });

export const HubPages = base('hub-pages', 'Listing pages', [
  hub('services', 'Services page (/services/)'),
  hub('locations', 'Locations page (/seo-expert/)'),
  hub('industries', 'Industries page (/seo-for/)'),
  hub('blog', 'Blog page (/blog/)'),
  hub('caseStudies', 'Case studies page (/case-studies/)'),
  sectionHead('auditHead', 'Free audit section (shared by listing pages)'),
], 'Headings and intros for the pages that list services, locations, industries, blog posts and case studies.');

export const GLOBALS = [Settings, HomePage, AboutPage, ContactPage, CoursesPage, HubPages];
