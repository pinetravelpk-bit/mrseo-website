'use client';
import { CAMPUS, cities, courses, coursesByTier, PHONE, waLink } from '@/lib/site';
import { FormMessage, useFormSubmit } from './ContactForm';
import Icon, { WhatsAppIcon } from './Icon';

/* Course application form. Posts to its own endpoint so applications
   do not arrive looking like SEO enquiries. Pass a course slug to preselect it. */
export default function EnrollForm({ selected = '' }: { selected?: string }) {
  const { busy, msg, onSubmit } = useFormSubmit('/api/enroll');
  const pro = coursesByTier('pro');
  const short = coursesByTier('short');
  const selectedName = courses[selected]?.name ?? '';

  return (
    <div className="enroll-wrap" id="enroll">
      <div className="cf-box">
        <h2 className="cf-title">Apply for the <span className="g">next batch</span></h2>
        <p className="cf-sub">Seats are limited and filled in order of application. We reply on WhatsApp with the batch date, the fee breakdown and what to bring.</p>

        <form id="mrseo-enroll-form" noValidate onSubmit={onSubmit}>
          <div className="cf-grid">
            <div className="cf-group">
              <label className="cf-label" htmlFor="en_name">Your name <span className="req">*</span></label>
              <input className="cf-input" type="text" id="en_name" name="en_name" placeholder="Muhammad Ali" autoComplete="name" required />
            </div>
            <div className="cf-group">
              <label className="cf-label" htmlFor="en_phone">WhatsApp number <span className="req">*</span></label>
              <input className="cf-input" type="tel" id="en_phone" name="en_phone" placeholder="+92 300 1234567" autoComplete="tel" inputMode="tel" required />
            </div>
            <div className="cf-group">
              <label className="cf-label" htmlFor="en_email">Email address <span className="req">*</span></label>
              <input className="cf-input" type="email" id="en_email" name="en_email" placeholder="you@email.com" autoComplete="email" required />
            </div>
            <div className="cf-group">
              <label className="cf-label" htmlFor="en_city">Your city</label>
              <select className="cf-select" id="en_city" name="en_city" defaultValue="Rawalpindi">
                <option value="">Select a city</option>
                {Object.values(cities).map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="cf-group">
              <label className="cf-label" htmlFor="en_course">Which course <span className="req">*</span></label>
              <select className="cf-select" id="en_course" name="en_course" required defaultValue={selectedName}>
                <option value="">Select a course</option>
                <optgroup label="Professional courses, internship included">
                  {pro.map(([slug, c]) => <option key={slug} value={c.name}>{c.name} — {c.duration}, PKR {c.fee}</option>)}
                </optgroup>
                <optgroup label="Short courses, from PKR 2,000">
                  {short.map(([slug, c]) => <option key={slug} value={c.name}>{c.name} — {c.duration}, PKR {c.fee}</option>)}
                </optgroup>
                <option value="Not sure yet">Not sure yet, please advise</option>
              </select>
            </div>
            <div className="cf-group">
              <label className="cf-label" htmlFor="en_mode">Preferred mode</label>
              <select className="cf-select" id="en_mode" name="en_mode" defaultValue="On-site Rawalpindi">
                <option value="On-site Rawalpindi">On-site, Scheme 3 Rawalpindi</option>
                <option value="Live online">Live online</option>
                <option value="Either">Either works</option>
              </select>
            </div>
            <div className="cf-group cf-full">
              <label className="cf-label" htmlFor="en_edu">Your education or current work <span className="opt">(optional)</span></label>
              <input className="cf-input" type="text" id="en_edu" name="en_edu" placeholder="For example: BS final year at Arid, or running a clothing page on Instagram" />
            </div>
            <div className="cf-group cf-full">
              <label className="cf-label" htmlFor="en_message">Why do you want to take this course <span className="opt">(optional)</span></label>
              <textarea className="cf-textarea" id="en_message" name="en_message" placeholder="For example: I graduate in June and want a job in an agency, or I want to run my own ads instead of paying someone."></textarea>
            </div>
          </div>

          {/* Honeypot spam protection */}
          <input type="text" name="en_hp" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <button type="submit" className="btn btn-g btn-lg btn-block" disabled={busy}>
            {busy ? 'Sending…' : 'Apply for the next batch'}
          </button>
          <FormMessage msg={msg} id="en-message" />
          <p className="cf-note">Applying costs nothing and commits you to nothing. Your details are only used to contact you about the course.</p>
        </form>
      </div>

      <aside className="side-stack">
        <div className="side-card">
          <span className="ico-badge blue"><Icon name="pin" /></span>
          <div>
            <div className="side-t">Where classes are held</div>
            <div className="side-v">{CAMPUS}<small>Easy from Satellite Town, Saddar, Chaklala and most of Islamabad. Online batches open to every city.</small></div>
          </div>
        </div>
        <div className="side-card">
          <span className="ico-badge"><WhatsAppIcon /></span>
          <div>
            <div className="side-t">Ask before you apply</div>
            <div className="side-v"><a href={waLink('Hi, I want to ask about the digital marketing courses.')} target="_blank" rel="noopener">{PHONE}</a><small>Usually replies within an hour, 9am to 10pm</small></div>
          </div>
        </div>
        <div className="side-card">
          <span className="ico-badge"><Icon name="grad" /></span>
          <div>
            <div className="side-t">What every course includes</div>
            <div className="side-p">Free certificate of completion. Session recordings you keep. Small batches, 15 to 20 seats. Professional courses only: free internship on live accounts and a written reference.</div>
          </div>
        </div>
        <div className="side-card">
          <span className="ico-badge blue"><Icon name="alert" /></span>
          <div>
            <div className="side-t">What we do not claim</div>
            <div className="side-p">The certificate is issued by MrSEO.pk. It is not HEC or NAVTTC accredited, the internship is unpaid, and short courses do not include it. We would rather say that now than have you find out later.</div>
          </div>
        </div>
      </aside>
    </div>
  );
}
