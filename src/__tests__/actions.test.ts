import { createCloseAction, deleteAction } from '../actions';
import store, { FeedbackItem } from '../store';
import { itemFixture } from '../__fixtures__/item';

afterEach(store.reset);
jest.useFakeTimers();

const dispatchAppend = (item: FeedbackItem) =>
  store.dispatch({ payload: item, type: 'APPEND' });

test('does not auto close when delay is 0', () => {
  dispatchAppend(itemFixture);

  expect(store.getState()).toHaveLength(1);
  jest.advanceTimersByTime(10000);
  expect(store.getState()).toHaveLength(1);
});

test('closes item and then removes if delay close', () => {
  const id = 'idToClose';

  dispatchAppend({ ...itemFixture, id });
  dispatchAppend(itemFixture);

  const head = store.getState()[0];

  createCloseAction(100)(head);
  expect(store.getState()).toHaveLength(2);

  expect(store.getState()[0].status).toBe('closing');

  jest.advanceTimersByTime(500);

  expect(store.getState()).toHaveLength(1);
  expect(store.getState()[0].id).not.toBe(head.id);
});

test('removes item if not delay close', () => {
  dispatchAppend(itemFixture);

  dispatchAppend({ ...itemFixture, id: 'second' });

  const firstItem = store.getState()[0];

  createCloseAction()(firstItem);

  expect(store.getState()).toHaveLength(1);
  expect(store.getState()[0].id).not.toBe(firstItem.id);
});

test('can delete item through delete action', () => {
  const id = 'idToBeRemoved';

  dispatchAppend({ ...itemFixture, id });

  const item = store.getState()[0];

  expect(item.id).toBe(id);
  expect(store.getState()).toHaveLength(1);

  deleteAction(item);

  expect(store.getState()).toEqual([]);
});
