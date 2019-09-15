/**
 * @jest-environment node
 */
import { createFeedback } from '../feedback';
import { canUseDOM } from '../utils';
import { store } from '../store';

afterEach(store.reset);

test('Detect server', () => {
  expect(canUseDOM).toEqual(false);
});

test('Warns and ignores when adding feedback on server', () => {
  global.console.warn = jest.fn();
  createFeedback()('success')('My message');
  expect(global.console.warn).toHaveBeenCalled();
  expect(store.getState()).toEqual([]);
});
