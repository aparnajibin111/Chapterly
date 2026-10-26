'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { COURSE, itemKey, weeksOf, type Week } from '@/lib/course';
import {
  conceptsDone,
  problemsDone,
  STATUS_LABEL,
  summary,
  weekStatus,
  type Progress,
} from '@/lib/progress';
import { CAPSTONE_LAYERS, MILESTONES, PATTERNS, RESOURCES, TARGETS } from '@/lib/resources';
import { useProgress } from './ProgressProvider';

type Tab = 'syllabus' | 'algos' | 'capstone' | 'res';
const TABS: [Tab, string][] = [
  ['syllabus', 'Syllabus'],
  ['algos', 'Algorithm map'],
  ['capstone', 'Capstone'],
  ['res', 'Resources'],
];
const OPEN_KEY = 'chapterly:open-stages';
const href = (w: Week) => `/learn/${COURSE.slug}/${w.id}`;

export function CourseOverview() {
  const { progress } = useProgress();
  const [tab, setTab] = useState<Tab>('syllabus');
  const s = summary(progress);
  const pct = Math.round((s.concepts / COURSE.totalConcepts) * 100);
  return (
    <>
      <section className="wrap head">
        <div className="label">{COURSE.subtitle}</div>
        <h1>{COURSE.title}</h1>
        <p>
          {COURSE.summary} Every concept is listed. Tick each one only when you can explain it and
          use it without looking it up.
        </p>
        <div className="facts">
          <Fact value={`${s.concepts} / ${COURSE.totalConcepts}`} label="concepts mastered" />
          <Fact value={`${s.done} / ${COURSE.mainWeeks.length}`} label="weeks completed" />
          <Fact
            value={String(s.problems)}
            label={`problems solved (${COURSE.totalProblems} must-solve listed)`}
          />
          <Fact value={String(s.tutorials)} label="tutorials written" />
        </div>
        <div className="overall">
          <div
            className="bar"
            role="progressbar"
            aria-label="Concepts mastered"
            aria-valuenow={pct}
          >
            <i style={{ width: `${pct}%`, background: 'var(--ok)' }} />
          </div>
          <span>
            <b>{pct}%</b> of concepts · <b>{s.done}</b> weeks completed · <b>{s.inProgress}</b> in
            progress
          </span>
        </div>
      </section>
      <div className="wrap">
        <div className="tabs" role="tablist">
          {TABS.map(([key, label]) => (
            <button key={key} role="tab" aria-selected={tab === key} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      {tab === 'syllabus' && <Syllabus progress={progress} />}
      {tab === 'algos' && <AlgorithmMap progress={progress} />}
      {tab === 'capstone' && <Capstone progress={progress} />}
      {tab === 'res' && <Resources />}
    </>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="fact">
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

function Syllabus({ progress }: { progress: Progress }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<Record<string, boolean>>({ '1': true });
  useEffect(() => {
    try {
      const saved = localStorage.getItem(OPEN_KEY);
      // Restoring a per-device preference after hydration is intentional.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setOpen(JSON.parse(saved));
    } catch {}
  }, []);
  const toggleStage = (key: string, isOpen: boolean) => {
    const next = { ...open, [key]: isOpen };
    setOpen(next);
    try {
      localStorage.setItem(OPEN_KEY, JSON.stringify(next));
    } catch {}
  };

  return (
    <div className="wrap stages">
      <p className="standard">{COURSE.standard}</p>
      <div className="find">
        <input
          type="search"
          placeholder="Find any concept, e.g. quaternion, payload, Dijkstra"
          aria-label="Find a concept"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span>
          {COURSE.totalConcepts} concepts · {COURSE.totalProblems} problems
        </span>
      </div>
      <SearchResults query={query} progress={progress} />
      {COURSE.stages.map((stage) => {
        const weeks = weeksOf(stage);
        const total = weeks.reduce((a, w) => a + w.total, 0);
        const done = weeks.reduce((a, w) => a + conceptsDone(w, progress[w.id]), 0);
        return (
          <details
            key={stage.key}
            className="stage"
            style={{ '--c': stage.color } as React.CSSProperties}
            open={!!open[stage.key]}
            onToggle={(e) => {
              const isOpen = (e.currentTarget as HTMLDetailsElement).open;
              if (isOpen !== !!open[stage.key]) toggleStage(stage.key, isOpen);
            }}
          >
            <summary>
              <span className="stripe" />
              <span className="st-title">
                <span className="label" style={{ color: 'var(--c)' }}>
                  {stage.label} · {stage.trackName}
                </span>
                <h2>{stage.title}</h2>
                <span>
                  {stage.added
                    ? 'Optional side lessons'
                    : `Weeks ${weeks[0].label.slice(1)}–${weeks[weeks.length - 1].label.slice(1)}`}{' '}
                  · {stage.hours} hours · {total} concepts
                </span>
              </span>
              <span className="st-prog">
                <span>
                  {weeks.filter((w) => progress[w.id]?.done).length}/{weeks.length} weeks
                </span>
                <span className="mini">
                  <i style={{ width: `${(done / total) * 100}%` }} />
                </span>
                <span>
                  {done}/{total} concepts
                </span>
              </span>
            </summary>
            <div className="st-body">
              <div className="st-deliv">
                <b>Deliverable</b>
                {stage.deliverable}
              </div>
              {weeks.map((w) => (
                <WeekRow key={w.id} week={w} progress={progress} />
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}

function WeekRow({ week, progress }: { week: Week; progress: Progress }) {
  const { update } = useProgress();
  const wp = progress[week.id];
  const status = weekStatus(week, wp);
  const done = conceptsDone(week, wp);
  const added = week.groups.filter((g) => g.added).map((g) => g.name.replace(' (added)', ''));
  return (
    <div className="week" style={{ '--c': week.stage.color } as React.CSSProperties}>
      <Link href={href(week)} className="week-link">
        <span className="wk">{week.label}</span>
        <span className="wk-main">
          <b>{week.title}</b>
          <span>
            {week.groups
              .filter((g) => !g.added)
              .map((g) => g.name)
              .join(' · ')}
          </span>
          <span className="build">Build: {week.build}</span>
          {added.length > 0 && !week.stage.added && (
            <span className="added">Added: {added.join(' · ')}</span>
          )}
        </span>
        <span className="wk-count">
          <span>
            {done}/{week.total} concepts
            {week.problems.length > 0 &&
              ` · ${problemsDone(week, wp)}/${week.problems.length} problems`}
          </span>
          <span className="mini">
            <i style={{ width: `${(done / week.total) * 100}%` }} />
          </span>
          <span className={`pill ${status}`}>{STATUS_LABEL[status]}</span>
        </span>
      </Link>
      <button
        className={`tick ${wp?.done ? 'on' : ''}`}
        role="checkbox"
        aria-checked={!!wp?.done}
        aria-label={`Mark ${week.title} completed`}
        onClick={() => update(week.id, { done: !wp?.done })}
      >
        ✓
      </button>
    </div>
  );
}

function SearchResults({ query, progress }: { query: string; progress: Progress }) {
  const q = query.trim().toLowerCase();
  const hits = useMemo(() => {
    if (!q) return [];
    const out: { week: Week; text: string; where: string; key: 'c' | 'p' | null }[] = [];
    for (const week of COURSE.weeks) {
      if (week.title.toLowerCase().includes(q))
        out.push({ week, text: week.title, where: 'Week', key: null });
      for (const g of week.groups)
        for (const item of g.items)
          if (item.toLowerCase().includes(q) || g.name.toLowerCase().includes(q))
            out.push({ week, text: item, where: g.name, key: 'c' });
      for (const p of week.problems)
        if (p.toLowerCase().includes(q)) out.push({ week, text: p, where: 'Problem', key: 'p' });
    }
    return out;
  }, [q]);
  if (!q) return null;
  return (
    <>
      <div className="results">
        {hits.length === 0 && <p className="empty-hit">No concept matches. Try a shorter word.</p>}
        {hits.slice(0, 60).map((h, i) => (
          <Link
            key={i}
            href={href(h.week)}
            className="hit"
            style={{ '--c': h.week.stage.color } as React.CSSProperties}
          >
            <span className="wk">{h.week.label}</span>
            <span>
              <Highlight text={h.text} query={q} />
              <br />
              <small>
                {h.week.title} · {h.where}
              </small>
            </span>
            <span
              aria-label={
                h.key && progress[h.week.id]?.[h.key]?.[itemKey(h.text)] ? 'Done' : undefined
              }
            >
              {h.key && progress[h.week.id]?.[h.key]?.[itemKey(h.text)] ? '✓' : ''}
            </span>
          </Link>
        ))}
      </div>
      {hits.length > 60 && (
        <p className="note">Showing 60 of {hits.length}. Type more to narrow it down.</p>
      )}
    </>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  const i = text.toLowerCase().indexOf(query);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

function AlgorithmMap({ progress }: { progress: Progress }) {
  const dsa = COURSE.weeks.filter((w) => w.stage.track === 'dsa');
  const solvedIn = (from: number, to: number) =>
    COURSE.mainWeeks
      .filter((w) => {
        const n = Number(w.label.slice(1));
        return n >= from && n <= to;
      })
      .reduce((a, w) => a + problemsDone(w, progress[w.id]) + (progress[w.id]?.extra ?? 0), 0);
  return (
    <div className="wrap panel-grid">
      <section className="card">
        <div className="label">Every algorithm topic, by week</div>
        {dsa.flatMap((w) =>
          w.groups.map((g) => {
            const n = g.items.filter((i) => progress[w.id]?.c?.[itemKey(i)]).length;
            return (
              <div
                key={w.id + g.name}
                className="maprow"
                style={{ '--c': w.stage.color } as React.CSSProperties}
              >
                <Link href={href(w)}>
                  {g.name}{' '}
                  <small>
                    · {w.label} · {g.items.length} concepts
                  </small>
                </Link>
                <span className="mini">
                  <i style={{ width: `${(n / g.items.length) * 100}%` }} />
                </span>
              </div>
            );
          }),
        )}
      </section>
      <section className="card">
        <div className="label">Problem-solving targets</div>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Period</th>
                <th>Target</th>
                <th>Solved</th>
              </tr>
            </thead>
            <tbody>
              {TARGETS.map(([period, target, from, to]) => (
                <tr key={period}>
                  <td className="n">{period}</td>
                  <td>{target}</td>
                  <td className="n">
                    <b>{solvedIn(from, to)}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small muted">
          Counts the must-solve problems you tick plus “other problems solved” on each week page.
          Revisit missed problems a few days later and solve them again without the answer.
        </p>
        <div className="label">Problem patterns to recognise</div>
        <p className="small">{PATTERNS}</p>
      </section>
    </div>
  );
}

function Capstone({ progress }: { progress: Progress }) {
  return (
    <div className="wrap panel-grid">
      <section className="card">
        <div className="label">SENTINEL-X · Simulation Reliability Lab</div>
        <div className="stack">
          {CAPSTONE_LAYERS.map(([color, title, detail], i) => (
            <div key={title} className="stack">
              {i > 0 && <div className="arrow">↓</div>}
              <div className="layer" style={{ '--c': `var(${color})` } as React.CSSProperties}>
                <b>{title}</b>
                <span>{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="card">
        <div className="label">Milestones</div>
        {MILESTONES.map(([week, name, detail]) => (
          <label key={week} className="chk">
            <input type="checkbox" disabled checked={!!progress['w' + week]?.done} readOnly />
            <span>
              <b>
                Week {week} · {name}
              </b>
              <br />
              <span className="small muted">{detail}</span>
            </span>
          </label>
        ))}
        <p className="small muted">
          Ticks follow the weeks. Include real test cases, a benchmark method, an architecture
          diagram, a short demo and an honest limitations section. Never claim a speed-up or
          accuracy you haven’t measured.
        </p>
      </section>
    </div>
  );
}

function Resources() {
  return (
    <div className="wrap panel-grid">
      <section className="card resources">
        <div className="label">Official and practice resources</div>
        {RESOURCES.map(([name, url, note]) => (
          <div key={url} className="res">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {name} ↗
            </a>
            <span>{note}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
