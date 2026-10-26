'use client';

import Link from 'next/link';
import { useState } from 'react';
import { COURSE } from '@/lib/course';
import { supabase } from '@/lib/supabase';
import { useProgress } from './ProgressProvider';

export function SiteHeader() {
  const { sync, email, cloud } = useProgress();
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="wrap">
        <Link href="/" className="logo">
          <i>C</i>Chapterly
        </Link>
        <nav className="rooms" aria-label="Sections">
          <Link href="/">Discover</Link>
          <Link href={`/learn/${COURSE.slug}`}>My learning</Link>
        </nav>
        <span className={`sync ${sync.tone}`} role="status">
          {sync.text}
        </span>
        {cloud &&
          (email ? (
            <button className="btn small" onClick={() => supabase?.auth.signOut()} title={email}>
              Sign out
            </button>
          ) : (
            <button className="btn small primary" onClick={() => setOpen(true)}>
              Sign in
            </button>
          ))}
      </div>
      {open && <SignInDialog onClose={() => setOpen(false)} />}
    </header>
  );
}

function SignInDialog({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage('');
    const { data, error } =
      mode === 'up'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setMessage(error.message);
    if (mode === 'up' && !data.session)
      return setMessage('Check your email to confirm your account, then sign in.');
    onClose();
  }

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <form
        className="dialog card"
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        aria-label={mode === 'in' ? 'Sign in' : 'Create account'}
      >
        <h2>{mode === 'in' ? 'Sign in' : 'Create your account'}</h2>
        <p className="muted">Your ticks and tutorials follow you to every device.</p>
        <label className="field">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="field">
          Password
          <input
            type="password"
            required
            minLength={8}
            autoComplete={mode === 'in' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {message && <p className="form-message">{message}</p>}
        <button className="btn primary" disabled={busy}>
          {busy ? 'Please wait…' : mode === 'in' ? 'Sign in' : 'Create account'}
        </button>
        <button
          type="button"
          className="linkbtn"
          onClick={() => setMode(mode === 'in' ? 'up' : 'in')}
        >
          {mode === 'in' ? 'New here? Create an account' : 'Already have an account? Sign in'}
        </button>
      </form>
    </div>
  );
}
