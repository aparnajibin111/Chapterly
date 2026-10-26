# Chapterly

A learning platform for turning what you study into a course. The first course is
**NVIDIA Engineering Mastery**: 36 weeks of C++, algorithms, Python, OpenUSD, Omniverse
and robotics simulation, plus an optional NVIDIA essentials track.

- Every concept is a checklist item, grouped by topic inside each week.
- Algorithm weeks list must-solve problems, each linked to its LeetCode search.
- Each week has a tutorial you write in a small Markdown editor and read back.
- Progress is saved in the browser, or to your account when Supabase is configured.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Save progress to accounts (optional)

1. Create a Supabase project.
2. Run `supabase/migrations/001_progress.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local` and fill in the project URL and publishable key.
4. On Vercel, add the same two variables (names must match exactly) and redeploy.

Anything a learner saved in the browser is copied to their account the first time they
sign in on that device.

## Edit the syllabus

The course lives in `lib/syllabus-data.ts`. Each week's `c` field holds one concept group
per line, written as `Group| concept; concept; …`. A group whose name ends in `(added)` is
shown in purple. Ticks are stored by the concept's text, so renaming a concept resets its tick.

## Checks

```bash
npm run lint && npm run typecheck && npm test && npm run build
```
