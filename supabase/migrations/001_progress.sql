-- Run once in the Supabase SQL editor for a new project.
-- One row per learner, course and week. `data` holds the WeekProgress object:
-- { done, built, tut, extra, c: {conceptKey: true}, p: {problemKey: true} }.
begin;
create table public.week_progress (
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  course text not null check (length(course) between 1 and 80),
  week_id text not null check (length(week_id) between 1 and 20),
  data jsonb not null default '{}'::jsonb check (pg_column_size(data) < 200000),
  updated_at timestamptz not null default now(),
  primary key (user_id, course, week_id)
);

alter table public.week_progress enable row level security;

create policy "Learners read their own progress" on public.week_progress
  for select using (user_id = auth.uid());
create policy "Learners add their own progress" on public.week_progress
  for insert with check (user_id = auth.uid());
create policy "Learners change their own progress" on public.week_progress
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Learners remove their own progress" on public.week_progress
  for delete using (user_id = auth.uid());

create function public.touch_week_progress() returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;
create trigger week_progress_touch before update on public.week_progress
  for each row execute function public.touch_week_progress();
commit;
