import { canUseDOM, generateId, getTimeDifferenceInMs, warn } from '../utils';

test('id should be random', () => {
  const numberOfIds = 20;
  const set = new Set();

  Array.from(Array(numberOfIds)).forEach(() => set.add(generateId()));

  expect(Array.from(set)).toHaveLength(numberOfIds);
});

test('returns milliseconds between two dates', () => {
  const difference = getTimeDifferenceInMs(
    new Date(2018, 9, 1, 12, 0, 0, 700),
    new Date(2018, 9, 1, 12, 0, 0, 600),
  );
  expect(difference).toEqual(100);
});

test('returns can use DOM', () => {
  expect(canUseDOM).toEqual(true);
});

test('warn outputs to console', () => {
  global.console.warn = jest.fn();
  const message = 'Please do not';
  warn(message);
  expect(global.console.warn).toHaveBeenLastCalledWith(`Warning: ${message}`);
});
