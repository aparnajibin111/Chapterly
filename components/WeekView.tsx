'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { COURSE, itemKey, type Week } from '@/lib/course';
import { renderMarkdown } from '@/lib/markdown';
import {
  conceptsDone,
  problemsDone,
  STATUS_LABEL,
  toggleItem,
  tutorialTemplate,
  weekStatus,
  type WeekProgress,
} from '@/lib/progress';
import { useProgress } from './ProgressProvider';

type Mode = 'concepts' | 'write' | 'read';

export function WeekView({ weekId }: { weekId: string }) {
  const { progress, update } = useProgress();
  const [mode, setMode] = useState<Mode>('concepts');
  const index = COURSE.weeks.findIndex((w) => w.id === weekId);
  const week = COURSE.weeks[index];
  const prev = COURSE.weeks[index - 1];
  const next = COURSE.weeks[index + 1];
  const wp = progress[week.id] ?? {};
  const status = weekStatus(week, wp);
  const cDone = conceptsDone(week, wp);
  const pDone = problemsDone(week, wp);
  const tut = wp.tut ?? '';
  const set = (patch: WeekProgress, delay?: number) => update(week.id, patch, delay);

  return (
    <div className="wrap lesson">
      <section className="card">
        <Link href={`/learn/${COURSE.slug}`} className="back">
          ← Back to syllabus
        </Link>
        <div className="ls-head">
          <span className="label" style={{ color: week.stage.color }}>
            {week.stage.added ? 'NVIDIA essentials' : `${week.stage.label} · ${week.stage.title}`}
          </span>
          <h1>
            {week.heading}: {week.title}
          </h1>
          <div className="ls-meta">
            <span className={`pill ${status}`}>{STATUS_LABEL[status]}</span>
            <span>
              {week.total} concepts
              {week.problems.length > 0 && ` · ${week.problems.length} problems`} · ~14 hours
            </span>
          </div>
        </div>
        <div className="mode" role="group" aria-label="View">
          {(
            [
              ['concepts', 'Concepts'],
              ['write', 'Write tutorial'],
              ['read', 'Read tutorial'],
            ] as [Mode, string][]
          ).map(([key, label]) => (
            <button key={key} aria-pressed={mode === key} onClick={() => setMode(key)}>
              {label}
            </button>
          ))}
        </div>

        {mode === 'concepts' && <Concepts week={week} wp={wp} set={set} />}
        {mode === 'write' && <Editor week={week} value={tut} set={set} />}
        {mode === 'read' &&
          (tut.trim() ? (
            <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(tut) }} />
          ) : (
            <div className="empty">
              <b>No tutorial yet</b>
              Switch to Write and explain this week in your own words.
              <button className="btn primary" onClick={() => setMode('write')}>
                Start writing
              </button>
            </div>
          ))}

        <div className="pager">
          {prev ? (
            <Link className="btn" href={`/learn/${COURSE.slug}/${prev.id}`}>
              ← {prev.label}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link className="btn" href={`/learn/${COURSE.slug}/${next.id}`}>
              {next.label} →
            </Link>
          )}
        </div>
      </section>

      <aside className="side">
        <div className="card">
          <div className="label">Progress this week</div>
          <Meter text={`${cDone}/${week.total} concepts`} value={cDone / week.total} />
          {week.problems.length > 0 && (
            <Meter
              text={`${pDone}/${week.problems.length} must-solve problems`}
              value={pDone / week.problems.length}
            />
          )}
        </div>
        <div className="card">
          <div className="label">Finish line</div>
          <label className="chk">
            <input
              type="checkbox"
              checked={!!wp.built}
              onChange={(e) => set({ built: e.target.checked })}
            />
            <span>
              <b>Build done:</b> {week.build}
            </span>
          </label>
          <label className="chk">
            <input type="checkbox" disabled readOnly checked={tut.trim().length > 200} />
            <span>Tutorial written (200+ characters)</span>
          </label>
          <div className="num">
            <label htmlFor="extra">Other problems solved</label>
            <input
              id="extra"
              type="number"
              min={0}
              value={wp.extra ?? 0}
              onChange={(e) => set({ extra: Math.max(0, Number(e.target.value) || 0) }, 600)}
            />
          </div>
          <button
            className={`btn ${wp.done ? 'done' : 'primary'}`}
            onClick={() => set({ done: !wp.done })}
          >
            {wp.done ? '✓ Completed · undo' : 'Mark week completed'}
          </button>
          {!wp.done && cDone < week.total && (
            <span className="saved">{week.total - cDone} concepts still unticked.</span>
          )}
        </div>
      </aside>
    </div>
  );
}

function Meter({ text, value }: { text: string; value: number }) {
  return (
    <div className="meter">
      <span>{text}</span>
      <span className="mini" style={{ '--c': 'var(--ok)' } as React.CSSProperties}>
        <i style={{ width: `${value * 100}%` }} />
      </span>
    </div>
  );
}

function Concepts({
  week,
  wp,
  set,
}: {
  week: Week;
  wp: WeekProgress;
  set: (patch: WeekProgress, delay?: number) => void;
}) {
  return (
    <>
      <p className="small muted">
        {conceptsDone(week, wp)} of {week.total} concepts mastered. Tick one when you can explain it
        and use it without notes.
      </p>
      <div className="groups">
        {week.groups.map((g) => {
          const n = g.items.filter((i) => wp.c?.[itemKey(i)]).length;
          const all = n === g.items.length;
          const tickAll = () => {
            let c = wp.c;
            for (const i of g.items) c = toggleItem(c, itemKey(i), !all);
            set({ c });
          };
          return (
            <div key={g.name} className={`group ${g.added ? 'added' : ''}`}>
              <div className="group-h">
                <h2>{g.name}</h2>
                <span>
                  {n}/{g.items.length} ·{' '}
                  <button className="linkbtn" onClick={tickAll}>
                    {all ? 'Clear' : 'Tick all'}
                  </button>
                </span>
              </div>
              <div className="concepts">
                {g.items.map((item) => {
                  const on = !!wp.c?.[itemKey(item)];
                  return (
                    <label key={item} className={`chk ${on ? 'on' : ''}`}>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={(e) =>
                          set({ c: toggleItem(wp.c, itemKey(item), e.target.checked) }, 400)
                        }
                      />
                      <span>{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
        {week.problems.length > 0 && (
          <div className="group">
            <div className="group-h">
              <h2>Must-solve problems</h2>
              <span>
                {problemsDone(week, wp)}/{week.problems.length}
              </span>
            </div>
            <div className="concepts">
              {week.problems.map((p) => {
                const on = !!wp.p?.[itemKey(p)];
                const search = encodeURIComponent(p.replace(/\s*\(.*\)$/, ''));
                return (
                  <label key={p} className={`chk ${on ? 'on' : ''}`}>
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={(e) =>
                        set({ p: toggleItem(wp.p, itemKey(p), e.target.checked) }, 400)
                      }
                    />
                    <span>
                      {p}
                      <a
                        href={`https://leetcode.com/problemset/?search=${search}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Find ${p} on LeetCode`}
                      >
                        ↗
                      </a>
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="small muted">
              Solve each one without looking at the answer. If you needed help, untick it and redo
              it in a few days.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function Editor({
  week,
  value,
  set,
}: {
  week: Week;
  value: string;
  set: (patch: WeekProgress, delay?: number) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const insert = (fn: (ta: HTMLTextAreaElement) => void) => {
    const ta = ref.current;
    if (!ta) return;
    fn(ta);
    ta.focus();
    set({ tut: ta.value }, 900);
  };
  const atLineStart = (prefix: string) =>
    insert((ta) => {
      const start = ta.value.lastIndexOf('\n', ta.selectionStart - 1) + 1;
      ta.setRangeText(prefix, start, start, 'end');
    });
  const wrap = (marker: string) =>
    insert((ta) => {
      const sel = ta.value.slice(ta.selectionStart, ta.selectionEnd) || 'text';
      ta.setRangeText(marker + sel + marker, ta.selectionStart, ta.selectionEnd, 'end');
    });
  const block = () =>
    insert((ta) => {
      const sel = ta.value.slice(ta.selectionStart, ta.selectionEnd) || 'code here';
      ta.setRangeText('\n```\n' + sel + '\n```\n', ta.selectionStart, ta.selectionEnd, 'end');
    });

  return (
    <>
      <div className="toolbar" role="toolbar" aria-label="Formatting">
        <button onClick={() => atLineStart('## ')} title="Heading">
          H
        </button>
        <button onClick={() => atLineStart('### ')} title="Sub-heading">
          H2
        </button>
        <button onClick={() => wrap('**')} title="Bold">
          B
        </button>
        <button onClick={() => wrap('*')} title="Italic">
          <em>I</em>
        </button>
        <button onClick={() => atLineStart('- ')}>• List</button>
        <button onClick={() => atLineStart('> ')}>❝ Takeaway</button>
        <button onClick={() => wrap('`')} title="Inline code">
          {'</>'}
        </button>
        <button onClick={block}>Code block</button>
        {!value.trim() && (
          <button className="accent" onClick={() => set({ tut: tutorialTemplate(week) })}>
            Insert tutorial template
          </button>
        )}
      </div>
      <textarea
        ref={ref}
        className="tut"
        aria-label="Tutorial"
        spellCheck
        placeholder="Write this week’s tutorial: explain it the way you would teach it to someone else."
        value={value}
        onChange={(e) => set({ tut: e.target.value }, 900)}
      />
      <span className="saved">
        Saves as you type · ## heading, - list, **bold**, `code`, ``` code block, &gt; takeaway
      </span>
    </>
  );
}
