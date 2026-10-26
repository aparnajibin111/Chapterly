'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { COURSE } from '@/lib/course';
import type { Progress, WeekProgress } from '@/lib/progress';
import { loadProgress, saveProgress, supabase } from '@/lib/supabase';

type Tone = 'idle' | 'busy' | 'ok' | 'error';
interface Sync {
  text: string;
  tone: Tone;
}
interface ProgressContext {
  progress: Progress;
  ready: boolean;
  sync: Sync;
  email: string | null;
  cloud: boolean;
  update: (weekId: string, patch: WeekProgress, delayMs?: number) => void;
}

const LOCAL_KEY = `chapterly:progress:${COURSE.slug}`;
const Context = createContext<ProgressContext | null>(null);

function readLocal(): Progress {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '{}') as Progress;
  } catch {
    return {};
  }
}
function writeLocal(progress: Progress) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(progress));
  } catch {
    // Private windows can refuse storage; progress then lasts for this visit only.
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>({});
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [sync, setSync] = useState<Sync>({ text: 'Loading…', tone: 'idle' });
  const latest = useRef<Progress>({});
  const signedIn = useRef(false);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const chains = useRef<Record<string, Promise<void>>>({});

  const replace = useCallback((next: Progress) => {
    latest.current = next;
    setProgress(next);
  }, []);

  useEffect(() => {
    if (!supabase) {
      // Browser storage only exists after hydration, so read it once mounted.
      queueMicrotask(() => {
        replace(readLocal());
        setSync({ text: 'Saved in this browser', tone: 'idle' });
        setReady(true);
      });
      return;
    }
    const client = supabase;
    const load = async (userEmail: string | null) => {
      signedIn.current = !!userEmail;
      setEmail(userEmail);
      if (!userEmail) {
        replace(readLocal());
        setSync({ text: 'Saved in this browser · sign in to keep it everywhere', tone: 'idle' });
        setReady(true);
        return;
      }
      setSync({ text: 'Loading your progress…', tone: 'busy' });
      try {
        const remote = await loadProgress(COURSE.slug);
        // First sign-in on this device: carry over what was saved in the browser.
        const local = readLocal();
        const missing = Object.keys(local).filter((id) => !remote[id]);
        await Promise.all(missing.map((id) => saveProgress(COURSE.slug, id, local[id])));
        for (const id of missing) remote[id] = local[id];
        replace(remote);
        setSync({ text: 'Saved to your account', tone: 'ok' });
      } catch {
        setSync({ text: 'Couldn’t load your progress. Refresh to try again.', tone: 'error' });
      }
      setReady(true);
    };
    client.auth.getSession().then(({ data }) => load(data.session?.user.email ?? null));
    const { data } = client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') load(session?.user.email ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, [replace]);

  const flush = useCallback((weekId: string) => {
    if (!signedIn.current) {
      writeLocal(latest.current);
      setSync({ text: 'Saved in this browser', tone: 'idle' });
      return;
    }
    setSync({ text: 'Saving…', tone: 'busy' });
    const data = latest.current[weekId] ?? {};
    chains.current[weekId] = (chains.current[weekId] ?? Promise.resolve())
      .then(() => saveProgress(COURSE.slug, weekId, data))
      .then(() => setSync({ text: 'Saved to your account', tone: 'ok' }))
      .catch(() =>
        setSync({ text: 'Couldn’t save. Check your connection and try again.', tone: 'error' }),
      );
  }, []);

  const update = useCallback(
    (weekId: string, patch: WeekProgress, delayMs = 0) => {
      replace({ ...latest.current, [weekId]: { ...latest.current[weekId], ...patch } });
      clearTimeout(timers.current[weekId]);
      timers.current[weekId] = setTimeout(() => flush(weekId), delayMs);
    },
    [flush, replace],
  );

  return (
    <Context.Provider value={{ progress, ready, sync, email, cloud: !!supabase, update }}>
      {children}
    </Context.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
