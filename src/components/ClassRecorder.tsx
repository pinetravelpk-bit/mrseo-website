'use client';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

/* One-click class recording for the teacher. Records the screen (with computer sound,
   so students' voices are included) plus the teacher's microphone, and downloads the
   video when stopped. Everything stays on the teacher's computer. */

export type RecorderHandle = { stop: () => Promise<void>; recording: () => boolean };

type Phase = 'idle' | 'starting' | 'recording' | 'saving';

const pickType = () => {
  const types = ['video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
  return types.find((t) => typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)) || '';
};
const clock = (s: number) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return `${h ? `${h}:` : ''}${String(m).padStart(h ? 2 : 1, '0')}:${String(sec).padStart(2, '0')}`;
};
const safeName = (s: string) => s.replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80);

const ClassRecorder = forwardRef<RecorderHandle, { title: string }>(function ClassRecorder({ title }, ref) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [secs, setSecs] = useState(0);
  const [error, setError] = useState('');
  const [supported, setSupported] = useState(false);
  const rec = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const streams = useRef<MediaStream[]>([]);
  const audio = useRef<AudioContext | null>(null);
  const done = useRef<(() => void) | null>(null);

  useEffect(() => {
    setSupported(Boolean(navigator.mediaDevices?.getDisplayMedia) && typeof MediaRecorder !== 'undefined');
  }, []);

  useEffect(() => {
    if (phase !== 'recording') return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => { clearInterval(t); window.removeEventListener('beforeunload', warn); };
  }, [phase]);

  const cleanup = () => {
    streams.current.forEach((s) => s.getTracks().forEach((t) => t.stop()));
    streams.current = [];
    audio.current?.close().catch(() => {});
    audio.current = null;
  };

  const save = useCallback((type: string) => {
    const blob = new Blob(chunks.current, { type: type || 'video/webm' });
    chunks.current = [];
    const ext = type.startsWith('video/mp4') ? 'mp4' : 'webm';
    const date = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `MrSEO class - ${safeName(title)} - ${date}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 60_000);
  }, [title]);

  const start = async () => {
    setError('');
    setPhase('starting');
    try {
      const screen = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 15 },
        audio: true,
        // Chrome: offer "share system audio" so students' voices are recorded too.
        systemAudio: 'include',
        selfBrowserSurface: 'include',
        surfaceSwitching: 'include',
      } as DisplayMediaStreamOptions);
      streams.current.push(screen);
      const mic = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }).catch(() => null);
      if (mic) streams.current.push(mic);

      // Mix computer sound and microphone into one audio track.
      const ctx = new AudioContext();
      audio.current = ctx;
      const mix = ctx.createMediaStreamDestination();
      [screen, mic].forEach((s) => { if (s && s.getAudioTracks().length) ctx.createMediaStreamSource(s).connect(mix); });

      const type = pickType();
      const out = new MediaStream([...screen.getVideoTracks(), ...mix.stream.getAudioTracks()]);
      const r = new MediaRecorder(out, { mimeType: type || undefined, videoBitsPerSecond: 900_000, audioBitsPerSecond: 96_000 });
      chunks.current = [];
      r.ondataavailable = (e) => { if (e.data.size) chunks.current.push(e.data); };
      r.onstop = () => {
        setPhase('saving');
        save(r.mimeType || type);
        cleanup();
        setPhase('idle');
        setSecs(0);
        done.current?.();
        done.current = null;
      };
      // Stopping the share from Chrome's own bar also ends the recording.
      screen.getVideoTracks()[0]?.addEventListener('ended', () => { if (r.state !== 'inactive') r.stop(); });
      r.start(10_000);
      rec.current = r;
      setSecs(0);
      setPhase('recording');
      if (!screen.getAudioTracks().length) setError('Recording without computer sound, so students’ voices will not be in it. Next time tick “Also share system audio”.');
    } catch {
      cleanup();
      setPhase('idle');
      setError('Recording did not start. Click Record again and choose what to share.');
    }
  };

  const stop = useCallback(
    () =>
      new Promise<void>((resolve) => {
        const r = rec.current;
        if (!r || r.state === 'inactive') return resolve();
        done.current = resolve;
        r.stop();
        rec.current = null;
      }),
    [],
  );

  useImperativeHandle(ref, () => ({ stop, recording: () => rec.current?.state === 'recording' }), [stop]);

  useEffect(() => () => { if (rec.current && rec.current.state !== 'inactive') rec.current.stop(); }, []);

  if (!supported) return null;

  return (
    <div className="rec-ctl">
      {phase === 'recording' ? (
        <button type="button" className="rec-btn is-on" onClick={() => stop()} title="Stop and download the recording">
          <span className="rec-dot" aria-hidden="true" /> REC {clock(secs)} <span className="rec-stop">Stop</span>
        </button>
      ) : (
        <button type="button" className="rec-btn" onClick={start} disabled={phase !== 'idle'} title="Record this class to your computer">
          <span className="rec-dot" aria-hidden="true" /> {phase === 'starting' ? 'Choose what to record…' : phase === 'saving' ? 'Saving…' : 'Record'}
        </button>
      )}
      {error ? <span className="rec-err" role="status">{error}</span> : null}
    </div>
  );
});

export default ClassRecorder;
