import { getSite, type Settings } from '@/lib/cms';
import { coursesByTier } from '@/lib/site';
import ContactFormView, { type ContactInfo } from './ContactForm';
import EnrollFormView from './EnrollForm';

/* Server wrappers: load the city, service and course lists from the admin and
   hand them to the interactive (client) forms. */

export const contactInfo = (s: Settings): ContactInfo => ({
  wa: s.whatsapp, phone: s.phone, email: s.email, owner: s.ownerName, years: s.yearsExperience,
  sites: s.websitesRanked, clients: s.clientsServed, baseCity: s.baseCity,
});

export async function ContactForm() {
  const { settings, cities, services } = await getSite();
  return <ContactFormView info={contactInfo(settings)} cities={Object.values(cities).map((c) => c.name)} services={Object.values(services).map((s) => s.name)} />;
}

export async function EnrollForm({ selected }: { selected?: string }) {
  const { settings, cities, courses } = await getSite();
  const opt = (list: ReturnType<typeof coursesByTier>) => list.map(([slug, c]) => ({ slug, name: c.name, duration: c.duration, fee: c.fee }));
  return (
    <EnrollFormView
      info={contactInfo(settings)} campus={settings.campus} campusCity={settings.campusCity}
      cities={Object.values(cities).map((c) => c.name)}
      pro={opt(coursesByTier(courses, 'pro'))} short={opt(coursesByTier(courses, 'short'))} selected={selected}
    />
  );
}
