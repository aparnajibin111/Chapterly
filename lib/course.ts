import { STAGES, TRACK, type RawStage, type TrackKey } from './syllabus-data';

export interface ConceptGroup {
  name: string;
  added: boolean;
  items: string[];
}
export interface Stage {
  key: string;
  label: string;
  title: string;
  track: TrackKey;
  trackName: string;
  color: string;
  hours: number;
  deliverable: string;
  added: boolean;
  weekIds: string[];
}
export interface Week {
  id: string;
  label: string;
  heading: string;
  title: string;
  build: string;
  stage: Stage;
  groups: ConceptGroup[];
  problems: string[];
  total: number;
}

// Stable key for a concept or problem. Progress is stored by this key, so ticks
// survive reordering the syllabus; renaming an item resets its tick.
export function itemKey(text: string): string {
  let h = 5381;
  for (const ch of text) h = ((h << 5) + h + ch.codePointAt(0)!) | 0;
  return 'k' + (h >>> 0).toString(36);
}

function parseGroups(src: string): ConceptGroup[] {
  return src
    .trim()
    .split('\n')
    .map((line) => {
      const [name, rest = ''] = line.split('|');
      const trimmed = name.trim();
      return {
        name: trimmed,
        added: /\(added\)$/.test(trimmed),
        items: rest
          .split(';')
          .map((x) => x.trim())
          .filter(Boolean),
      };
    });
}

function buildStage(raw: RawStage): Stage {
  return {
    key: String(raw.n),
    label: raw.added ? 'Added track' : `Stage ${raw.n}`,
    title: raw.t,
    track: raw.track,
    trackName: TRACK[raw.track][0],
    color: `var(${TRACK[raw.track][1]})`,
    hours: raw.hrs,
    deliverable: raw.deliv,
    added: !!raw.added,
    weekIds: raw.weeks.map((w) => 'w' + w.no),
  };
}

const stages = STAGES.map(buildStage);
const weeks: Week[] = STAGES.flatMap((raw, i) =>
  raw.weeks.map((w) => {
    const groups = parseGroups(w.c);
    const numbered = typeof w.no === 'number';
    return {
      id: 'w' + w.no,
      label: numbered ? `W${w.no}` : String(w.no),
      heading: numbered ? `Week ${w.no}` : String(w.no),
      title: w.t,
      build: w.build,
      stage: stages[i],
      groups,
      problems: (w.p ?? '')
        .split(';')
        .map((x) => x.trim())
        .filter(Boolean),
      total: groups.reduce((a, g) => a + g.items.length, 0),
    };
  }),
);

export const COURSE = {
  slug: 'nvidia-engineering-mastery',
  title: 'NVIDIA Engineering Mastery',
  subtitle: 'C++ · Algorithms · Python · OpenUSD · Omniverse · Robotics simulation',
  summary:
    'A 36-week path from beginner C++ to a tested Omniverse and simulation portfolio, built on Unity XR experience and aimed at an engineering role at NVIDIA in India.',
  standard:
    'Graduation standard: write non-trivial C++ and Python without copying tutorials, solve unfamiliar algorithm problems, build a tested Omniverse application, and explain every engineering decision.',
  stages,
  weeks,
  mainWeeks: weeks.filter((w) => !w.stage.added),
  totalConcepts: weeks.reduce((a, w) => a + w.total, 0),
  totalProblems: weeks.reduce((a, w) => a + w.problems.length, 0),
};

export const findWeek = (id: string) => weeks.find((w) => w.id === id);
export const weeksOf = (stage: Stage) => weeks.filter((w) => w.stage === stage);
