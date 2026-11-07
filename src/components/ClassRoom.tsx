'use client';
import { useEffect, useRef, useState } from 'react';
import ClassRecorder, { type RecorderHandle } from './ClassRecorder';

/* Runs a live class inside mrseo.pk using our own classroom server (class.mrseo.pk). */

export type RoomPass = { domain: string; name: string; token: string; displayName: string };

type JitsiApi = { dispose(): void; executeCommand(cmd: string, ...args: unknown[]): void; addListener(ev: string, fn: () => void): void };
declare global {
  interface Window { JitsiMeetExternalAPI?: new (domain: string, opts: Record<string, unknown>) => JitsiApi }
}

// No cameras: voice, screen sharing and chat only (keeps the server light).
const STUDENT_TOOLS = ['microphone', 'chat', 'raisehand', 'reactions', 'participants-pane', 'settings', 'fullscreen', 'hangup'];
const TEACHER_TOOLS = ['microphone', 'desktop', 'shareaudio', 'chat', 'raisehand', 'reactions', 'participants-pane', 'security', 'mute-everyone', 'settings', 'fullscreen', 'hangup'];

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('load failed'));
    document.head.appendChild(s);
  });
}

export default function ClassRoom({ pass, title, teacher = false, onLeave }: { pass: RoomPass; title: string; teacher?: boolean; onLeave?: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const api = useRef<JitsiApi | null>(null);
  const [state, setState] = useState<'loading' | 'live' | 'ended' | 'error'>('loading');
  const recorder = useRef<RecorderHandle>(null);

  useEffect(() => {
    let gone = false;
    document.body.style.overflow = 'hidden';
    loadScript(`https://${pass.domain}/libs/external_api.min.js`)
      .then(() => {
        if (gone || !box.current || !window.JitsiMeetExternalAPI) return;
        const a = new window.JitsiMeetExternalAPI(pass.domain, {
          roomName: pass.name,
          jwt: pass.token,
          parentNode: box.current,
          width: '100%',
          height: '100%',
          lang: 'en',
          userInfo: { displayName: pass.displayName },
          configOverwrite: {
            subject: title,
            prejoinConfig: { enabled: true, hideExtraJoinButtons: ['no-audio', 'by-phone'] },
            readOnlyName: true,
            startWithAudioMuted: !teacher,
            startWithVideoMuted: true,
            // The teacher sees a preview of their own screen share; students keep a clean view.
            disableSelfView: !teacher,
            disableDeepLinking: true,
            disableInviteFunctions: true,
            enableClosePage: false,
            toolbarButtons: teacher ? TEACHER_TOOLS : STUDENT_TOOLS,
            localRecording: { disable: true },
          },
          interfaceConfigOverwrite: {
            APP_NAME: 'MrSEO Classroom',
            SHOW_JITSI_WATERMARK: false,
            SHOW_BRAND_WATERMARK: false,
            SHOW_POWERED_BY: false,
            MOBILE_APP_PROMO: false,
            DEFAULT_REMOTE_DISPLAY_NAME: 'Student',
          },
        });
        a.addListener('videoConferenceJoined', () => setState('live'));
        a.addListener('readyToClose', () => { a.dispose(); api.current = null; setState('ended'); });
        api.current = a;
        setState('live');
      })
      .catch(() => !gone && setState('error'));
    return () => {
      gone = true;
      document.body.style.overflow = '';
      api.current?.dispose();
      api.current = null;
    };
  }, [pass, title, teacher]);

  const leave = async () => {
    // Save any recording before leaving.
    if (recorder.current?.recording()) await recorder.current.stop();
    if (api.current) api.current.executeCommand('hangup');
    else onLeave?.();
  };

  return (
    <div className="classroom" role="dialog" aria-label={`Live class: ${title}`}>
      <div className="classroom-bar">
        <img src="/logo-mark.webp" alt="" width={28} height={28} />
        <div className="classroom-title">
          <strong>MrSEO Classroom</strong>
          <span>{title}{teacher ? ' · You are the teacher' : ''}</span>
        </div>
        {teacher && state === 'live' ? <ClassRecorder ref={recorder} title={title} /> : null}
        {state === 'live' || state === 'loading' ? (
          <button type="button" className="classroom-leave" onClick={leave}>Leave class</button>
        ) : null}
      </div>
      <div className="classroom-stage">
        {state === 'ended' || state === 'error' ? (
          <div className="classroom-msg">
            <h2>{state === 'ended' ? 'You have left the class' : 'The classroom could not load'}</h2>
            <p>
              {state === 'ended'
                ? 'Thank you for joining. You can rejoin while the class is running.'
                : 'Please check your internet connection and try again. If it keeps happening, message us on WhatsApp.'}
            </p>
            <div className="classroom-actions">
              <button type="button" className="btn btn-g" onClick={() => window.location.reload()}>Rejoin</button>
              <a className="btn btn-o" href="/">Back to MrSEO.pk</a>
            </div>
          </div>
        ) : (
          <div ref={box} className="classroom-frame" />
        )}
      </div>
    </div>
  );
}
