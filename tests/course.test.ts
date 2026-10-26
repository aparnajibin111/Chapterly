import assert from 'node:assert/strict';
import { test } from 'node:test';
import { COURSE, findWeek, itemKey } from '../lib/course';
import { renderMarkdown } from '../lib/markdown';
import { summary, toggleItem, weekStatus } from '../lib/progress';

test('the course has 36 main weeks plus the added essentials track', () => {
  assert.equal(COURSE.mainWeeks.length, 36);
  assert.equal(COURSE.weeks.length - COURSE.mainWeeks.length, 7);
  assert.ok(COURSE.totalConcepts > 700);
  assert.ok(COURSE.totalProblems > 100);
});

test('week ids are unique and every week has concepts', () => {
  const ids = COURSE.weeks.map((w) => w.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const w of COURSE.weeks) {
    assert.ok(w.total > 0, `${w.id} has no concepts`);
    for (const g of w.groups) assert.ok(g.items.length > 0, `${w.id} / ${g.name} is empty`);
  }
});

test('concept keys are unique within each week, so ticks never collide', () => {
  for (const w of COURSE.weeks) {
    const keys = [...w.groups.flatMap((g) => g.items), ...w.problems].map(itemKey);
    assert.equal(new Set(keys).size, keys.length, `${w.id} has a duplicate concept`);
  }
});

test('progress status and summary follow ticks', () => {
  const week = findWeek('w5')!;
  const first = itemKey(week.groups[0].items[0]);
  assert.equal(weekStatus(week, {}), 'todo');
  const c = toggleItem(undefined, first, true);
  assert.equal(weekStatus(week, { c }), 'wip');
  assert.equal(weekStatus(week, { c, done: true }), 'ok');
  assert.deepEqual(toggleItem(c, first, false), {});
  const s = summary({ w5: { c, extra: 3, done: true } });
  assert.equal(s.concepts, 1);
  assert.equal(s.problems, 3);
  assert.equal(s.done, 1);
});

test('markdown escapes HTML before formatting', () => {
  const html = renderMarkdown('## Title\n<script>alert(1)</script> **bold**\n\n```\n<b>x</b>\n```');
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('<strong>bold</strong>'));
  assert.ok(html.includes('<pre><code>&lt;b&gt;x&lt;/b&gt;</code></pre>'));
});
