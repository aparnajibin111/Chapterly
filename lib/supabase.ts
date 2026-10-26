import { createClient } from '@supabase/supabase-js';
import type { Progress, WeekProgress } from './progress';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
export const supabase = url && key ? createClient(url, key) : null;

export async function loadProgress(course: string): Promise<Progress> {
  if (!supabase) return {};
  const { data, error } = await supabase
    .from('week_progress')
    .select('week_id, data')
    .eq('course', course);
  if (error) throw error;
  return Object.fromEntries(data.map((row) => [row.week_id, row.data as WeekProgress]));
}

export async function saveProgress(course: string, weekId: string, data: WeekProgress) {
  if (!supabase) return;
  const { error } = await supabase
    .from('week_progress')
    .upsert({ course, week_id: weekId, data }, { onConflict: 'user_id,course,week_id' });
  if (error) throw error;
}
