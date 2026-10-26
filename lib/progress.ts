import { COURSE, itemKey, type Week } from './course';

export interface WeekProgress {
  done?: boolean;
  built?: boolean;
  tut?: string;
  extra?: number;
  c?: Record<string, true>;
  p?: Record<string, true>;
}
export type Progress = Record<string, WeekProgress>;
export type Status = 'todo' | 'wip' | 'ok';

export const STATUS_LABEL: Record<Status, string> = {
  ok: 'Completed',
  wip: 'In progress',
  todo: 'Not started',
};

export const conceptsDone = (week: Week, wp: WeekProgress = {}) =>
  week.groups.reduce((a, g) => a + g.items.filter((i) => wp.c?.[itemKey(i)]).length, 0);

export const problemsDone = (week: Week, wp: WeekProgress = {}) =>
  week.problems.filter((p) => wp.p?.[itemKey(p)]).length;

export function weekStatus(week: Week, wp: WeekProgress = {}): Status {
  if (wp.done) return 'ok';
  if (conceptsDone(week, wp) || problemsDone(week, wp) || wp.tut?.trim()) return 'wip';
  return 'todo';
}

export function summary(progress: Progress) {
  const main = COURSE.mainWeeks;
  return {
    concepts: COURSE.weeks.reduce((a, w) => a + conceptsDone(w, progress[w.id]), 0),
    problems: COURSE.weeks.reduce(
      (a, w) => a + problemsDone(w, progress[w.id]) + (progress[w.id]?.extra ?? 0),
      0,
    ),
    tutorials: COURSE.weeks.filter((w) => progress[w.id]?.tut?.trim()).length,
    done: main.filter((w) => progress[w.id]?.done).length,
    inProgress: main.filter((w) => weekStatus(w, progress[w.id]) === 'wip').length,
  };
}

// Flips one concept or problem tick and returns the new map, leaving the input untouched.
export function toggleItem(
  map: Record<string, true> | undefined,
  key: string,
  on: boolean,
): Record<string, true> {
  const next = { ...map };
  if (on) next[key] = true;
  else delete next[key];
  return next;
}

export function tutorialTemplate(week: Week): string {
  return `## ${week.title}

### What this week covers
${week.groups.map((g) => '- ' + g.name).join('\n')}

### Concepts in my own words


### Code I wrote
\`\`\`
// the key part of this week's build
\`\`\`

### What tripped me up


### Build: ${week.build}
- Repo link:
- Tests passing:

> One-line takeaway`;
}
