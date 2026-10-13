const test = require('node:test');
const assert = require('node:assert/strict');
const { trimDescription } = require('../api/_trimDescription');

const STORY = 'Story paragraph one.\n\nKey takeaways:\n- First point.\n- Second point.';

const describeEach = (cases) => cases.forEach(({ name, tail }) => {
  test(`drops the timestamp section and its heading: ${name}`, () => {
    assert.equal(trimDescription(`${STORY}\n\n${tail}`), STORY);
  });
});

// Real heading styles seen on the channel, then ones we expect to meet.
describeEach([
  { name: '"Episode Timestamps:" (episode 7 leaked this)', tail: 'Episode Timestamps:\n00:00 - 01:28 Intro\n01:28 - 03:28 Topic' },
  { name: '"Chapters:"', tail: 'Chapters:\n00:00 - 00:30 Intro\n00:31 - 01:35 Topic' },
  { name: '"Chapters" without a colon', tail: 'Chapters\n00:00 - 00:30 Intro' },
  { name: '"Chapters: " with trailing space', tail: 'Chapters: \n00:00 - 00:30 Intro' },
  { name: 'an unseen heading ("Timeline:")', tail: 'Timeline:\n00:00 Intro\n01:00 Topic' },
  { name: 'an unseen heading ("Topics covered:")', tail: 'Topics covered:\n0:00 Intro\n1:00 Topic' },
  { name: 'a heading separated from the times by a blank line', tail: 'Timestamps:\n\n00:00 Intro' },
  { name: 'hour-long times', tail: 'Timeline:\n00:00:00 Intro\n01:02:03 Topic' },
  { name: 'bracketed times', tail: 'Timeline:\n[00:00] Intro\n(01:00) Topic' },
  { name: 'dashed-bullet times', tail: 'Timeline:\n- 00:00 Intro\n- 01:00 Topic' },
  { name: 'times with no heading at all', tail: '00:00 Intro\n01:00 Topic' },
]);

test('drops the social-link block that follows the chapters', () => {
  const raw = `${STORY}\n\nChapters:\n00:00 Intro\n\nBook recommended by Heide Cheuk:\nFair Play\n\nFollow Heide Cheuk:\nLinkedIn: / heide`;
  assert.equal(trimDescription(raw), STORY);
});

test('drops a named social block when there are no timestamps', () => {
  assert.equal(trimDescription(`${STORY}\n\nFollow Jessie Li:\nInstagram: / jessieli`), STORY);
  assert.equal(trimDescription(`${STORY}\n\nLead With Balance:\nYoutube: / lead`), STORY);
});

test('drops the quiz call-to-action line the page replaces with curated resources', () => {
  assert.equal(trimDescription(`${STORY}\n\nTake the quiz here:\nhttps://bit.ly/x`), STORY);
});

test('keeps a description that has no chapters or links', () => {
  assert.equal(trimDescription(STORY), STORY);
});

test('keeps an intro line ending in a colon when bullets follow, not times', () => {
  const raw = 'Opening line.\n\nJennifer shares actionable insights on:\n- Point one\n- Point two\n\nClosing line.';
  assert.equal(trimDescription(raw), raw);
});

test('keeps bullets that merely contain numbers or colons', () => {
  const raw = 'Intro.\n\n- The "4,000 Weeks" Mindset: a perspective shift\n- 3-Month Mindset: daily habits';
  assert.equal(trimDescription(raw), raw);
});

test('does not cut a story that mentions a time mid-sentence', () => {
  const raw = 'We talk about waking at 5:30 every day.\n\nA second paragraph.';
  assert.equal(trimDescription(raw), raw);
});

test('collapses runs of blank lines and trims the ends', () => {
  assert.equal(trimDescription('\n\nOne.\n\n\n\nTwo.\n\n'), 'One.\n\nTwo.');
});
