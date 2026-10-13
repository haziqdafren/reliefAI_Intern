const test = require('node:test');
const assert = require('node:assert/strict');
const { fetchFeedWithRetry } = require('../api/_fetchFeed');

const URL = 'https://example.test/feed.xml';
const FAST = { retryDelayMs: 0, sleep: async () => {} };

const reply = (status, body = '') => ({
  ok: status >= 200 && status < 300,
  status,
  text: async () => body,
});

/** A fetch stub that plays back the given outcomes in order, then repeats the last. */
const scripted = (outcomes) => {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, init });
    const outcome = outcomes[Math.min(calls.length - 1, outcomes.length - 1)];
    if (outcome instanceof Error) throw outcome;
    return outcome;
  };
  return { fetchImpl, calls };
};

test('returns the body on the first successful response without retrying', async () => {
  const { fetchImpl, calls } = scripted([reply(200, '<feed/>')]);

  const body = await fetchFeedWithRetry(URL, { ...FAST, fetchImpl });

  assert.equal(body, '<feed/>');
  assert.equal(calls.length, 1);
});

test('retries 404 and 500 responses until one succeeds', async () => {
  const { fetchImpl, calls } = scripted([reply(404), reply(500), reply(404), reply(200, '<feed/>')]);

  const body = await fetchFeedWithRetry(URL, { ...FAST, fetchImpl });

  assert.equal(body, '<feed/>');
  assert.equal(calls.length, 4);
});

test('retries when the network request itself throws', async () => {
  const { fetchImpl, calls } = scripted([new Error('socket hang up'), reply(200, '<feed/>')]);

  const body = await fetchFeedWithRetry(URL, { ...FAST, fetchImpl });

  assert.equal(body, '<feed/>');
  assert.equal(calls.length, 2);
});

test('throws after maxAttempts and reports the last status', async () => {
  const { fetchImpl, calls } = scripted([reply(404), reply(500)]);

  await assert.rejects(
    fetchFeedWithRetry(URL, { ...FAST, fetchImpl, maxAttempts: 3 }),
    /3 attempts.*500/
  );
  assert.equal(calls.length, 3);
});

test('stops retrying once the time budget is spent', async () => {
  let clock = 0;
  const { fetchImpl, calls } = scripted([reply(404)]);
  const timedFetch = async (...args) => {
    clock += 400;
    return fetchImpl(...args);
  };

  await assert.rejects(
    fetchFeedWithRetry(URL, {
      ...FAST,
      fetchImpl: timedFetch,
      maxAttempts: 100,
      deadlineMs: 1000,
      now: () => clock,
    }),
    /attempts/
  );
  assert.equal(calls.length, 3);
});

test('gives each attempt an abort signal so a hung request cannot eat the budget', async () => {
  const { fetchImpl, calls } = scripted([reply(200, '<feed/>')]);

  await fetchFeedWithRetry(URL, { ...FAST, fetchImpl });

  assert.ok(calls[0].init.signal instanceof AbortSignal);
});
