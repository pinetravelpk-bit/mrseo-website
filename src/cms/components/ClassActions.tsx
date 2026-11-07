'use client';
import { useState } from 'react';
import { useFormFields } from '@payloadcms/ui';

/* Big, obvious buttons on each online class: start teaching, and copy the WhatsApp message for students. */

const box: React.CSSProperties = { border: '1px solid var(--theme-elevation-150)', borderRadius: 8, padding: 16, marginBottom: 24, background: 'var(--theme-elevation-50)' };
const btn: React.CSSProperties = { display: 'inline-block', padding: '10px 16px', borderRadius: 6, fontWeight: 600, fontSize: 14, textDecoration: 'none', cursor: 'pointer', border: 0, marginRight: 10, marginTop: 8 };

export function ClassActions() {
  const f = useFormFields(([fields]) => ({
    title: fields.title?.value as string | undefined,
    startsAt: fields.startsAt?.value as string | undefined,
    code: fields.accessCode?.value as string | undefined,
    student: fields.studentLink?.value as string | undefined,
    teacher: fields.teacherLink?.value as string | undefined,
    recording: fields.recordingUrl?.value as string | undefined,
  }));
  const [copied, setCopied] = useState<'' | 'class' | 'rec'>('');

  if (!f.student || !f.teacher) {
    return <div style={box}>Save the class first. The teacher button and the student link appear here after saving.</div>;
  }

  const when = f.startsAt
    ? new Date(f.startsAt).toLocaleString('en-GB', { timeZone: 'Asia/Karachi', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' })
    : '';
  const message = `*${f.title ?? 'Online class'}*\n${when} (Pakistan time)\n\nJoin here: ${f.student}\nAccess code: *${f.code ?? ''}*\n\nOpen the link 5 minutes early in Chrome and allow the microphone.`;

  const recMessage = `*Recording: ${f.title ?? 'Online class'}*

Watch here: ${f.student}
Access code: *${f.code ?? ''}*`;
  const copy = async (text: string, which: 'class' | 'rec') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(''), 2500);
    } catch {
      window.prompt('Copy this message:', text);
    }
  };

  return (
    <div style={box}>
      <strong style={{ fontSize: 16 }}>Class links</strong>
      <div>
        <a href={f.teacher} target="_blank" rel="noopener" style={{ ...btn, background: '#3dc43d', color: '#06140a' }}>
          ▶ Start class (teacher)
        </a>
        <button type="button" onClick={() => copy(message, 'class')} style={{ ...btn, background: '#25d366', color: '#06140a' }}>
          {copied === 'class' ? '✓ Copied' : 'Copy WhatsApp message for students'}
        </button>
        {f.recording ? (
          <button type="button" onClick={() => copy(recMessage, 'rec')} style={{ ...btn, background: '#5b9bff', color: '#06101f' }}>
            {copied === 'rec' ? '✓ Copied' : 'Copy recording message'}
          </button>
        ) : null}
      </div>
      <p style={{ margin: '12px 0 0', opacity: 0.8, fontSize: 13 }}>
        Student link: {f.student} · Code: <b>{f.code}</b>
      </p>
      <p style={{ margin: '6px 0 0', opacity: 0.8, fontSize: 13 }}>
        {f.recording
          ? '✓ Recording added. Students can watch it on the same link with the same code after the class ends.'
          : 'Recording: in the class click "How to record" at the top. After the class, upload the file to YouTube as Unlisted and paste the link in "Recording link" below.'}
      </p>
    </div>
  );
}
