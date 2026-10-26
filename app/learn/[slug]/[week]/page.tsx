import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WeekView } from '@/components/WeekView';
import { COURSE, findWeek } from '@/lib/course';

type Params = Promise<{ slug: string; week: string }>;

export const dynamicParams = false;
export const generateStaticParams = () =>
  COURSE.weeks.map((w) => ({ slug: COURSE.slug, week: w.id }));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const week = findWeek((await params).week);
  return { title: week ? `${week.heading}: ${week.title}` : 'Week not found' };
}

export default async function WeekPage({ params }: { params: Params }) {
  const { slug, week } = await params;
  if (slug !== COURSE.slug || !findWeek(week)) notFound();
  return <WeekView weekId={week} />;
}
