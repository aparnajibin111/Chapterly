import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CourseOverview } from '@/components/CourseOverview';
import { COURSE } from '@/lib/course';

export const metadata: Metadata = { title: COURSE.title };
export const dynamicParams = false;
export const generateStaticParams = () => [{ slug: COURSE.slug }];

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== COURSE.slug) notFound();
  return <CourseOverview />;
}
