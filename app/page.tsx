import Link from 'next/link';
import { COURSE } from '@/lib/course';

export default function Discover() {
  const hours = COURSE.stages.reduce((a, s) => a + s.hours, 0);
  return (
    <>
      <section className="wrap hero">
        <div className="label">Courses written by people who learned it</div>
        <h1>Learn from real notes, not slide decks.</h1>
        <p>
          Every concept as a checklist, a tutorial written for each week, and progress that follows
          you from device to device.
        </p>
      </section>
      <section className="wrap grid">
        <Link href={`/learn/${COURSE.slug}`} className="course-card">
          <div className="cover">
            <span>{COURSE.title}</span>
          </div>
          <div className="card-body">
            <div className="card-meta">
              <span>{COURSE.subtitle}</span>
            </div>
            <p>{COURSE.summary}</p>
            <div className="card-meta">
              <span>{COURSE.mainWeeks.length} weeks</span>
              <span>·</span>
              <span>{COURSE.totalConcepts} concepts</span>
              <span>·</span>
              <span>{COURSE.totalProblems} problems</span>
              <span>·</span>
              <span>{hours} hours</span>
            </div>
            <span className="btn primary">Open course</span>
          </div>
        </Link>
        <div className="course-card soon">
          <div className="card-body">
            <div className="label">Coming soon</div>
            <h2>Write and sell your own course</h2>
            <p>
              A studio for writing lessons, setting a price and publishing. Your NVIDIA course will
              be the first one listed.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
