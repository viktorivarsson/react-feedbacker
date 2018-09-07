import { generateId, getTimeDifferenceInMs } from '../helpers';

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
