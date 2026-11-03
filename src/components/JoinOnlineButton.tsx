'use client';
import { useEffect, useState } from 'react';
import { MonitorPlay } from 'lucide-react';

/* "Join course online": goes to the next scheduled online class for this course,
   or to the admission form with "Live online" selected when none is scheduled. */

type Next = { found: boolean; url?: string; startsAt?: string; live?: boolean };

const when = (iso: string) =>
  new Date(iso).toLocaleString('en-GB', { timeZone: 'Asia/Karachi', weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

export default function JoinOnlineButton({ course }: { course: string }) {
  const [next, setNext] = useState<Next | null>(null);

  useEffect(() => {
    fetch(`/api/class-next/?course=${encodeURIComponent(course)}`)
      .then((r) => r.json())
      .then(setNext)
      .catch(() => setNext({ found: false }));
  }, [course]);

  if (next?.found && next.url) {
    return (
      <a href={next.url} className={`btn btn-g${next.live ? ' btn-live' : ''}`}>
        <MonitorPlay size={18} aria-hidden="true" />
        {next.live ? 'Join online class now' : `Join online class · ${when(next.startsAt!)}`}
      </a>
    );
  }

  const chooseOnline = () => {
    const mode = document.getElementById('en_mode') as HTMLSelectElement | null;
    if (mode) mode.value = 'Live online';
  };
  return (
    <a href="#enroll" className="btn btn-o" onClick={chooseOnline}>
      <MonitorPlay size={18} aria-hidden="true" /> Join course online
    </a>
  );
}
