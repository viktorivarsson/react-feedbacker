import { createCloseAction, deleteAction } from '../actions';
import { DEFAULT_NAMESPACE } from '../utils';
import store from '../store';

const namespace = DEFAULT_NAMESPACE;

afterEach(store.reset);
jest.useFakeTimers();

test('does not auto close when delay is 0', () => {
  store.dispatch({
    payload: {
      id: 'some id',
      namespace,
      kind: 'success',
      message: 'some message',
      status: 'open',
    },
    type: 'INSERT',
  });

  expect(store.getState()).toHaveLength(1);
  jest.advanceTimersByTime(10000);
  expect(store.getState()).toHaveLength(1);
});

test('closes item and then removes if delay close', () => {
  const id = 'idToClose';

  store.dispatch({
    payload: {
      id,
      namespace,
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'INSERT',
  });

  store.dispatch({
    payload: {
      id: 'idToKeep',
      namespace,
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'INSERT',
  });

  const item = store.getState()[0];

  createCloseAction(100)(item);
  expect(store.getState()).toHaveLength(2);

  expect(store.getState()[0].status).toBe('closing');

  jest.advanceTimersByTime(500);

  expect(store.getState()).toHaveLength(1);
  expect(store.getState()[0].id).not.toBe(item.id);
});

test('removes item if not delay close', () => {
  store.dispatch({
    payload: {
      id: 'firstId',
      namespace,
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'INSERT',
  });

  store.dispatch({
    payload: {
      id: 'secondId',
      namespace,
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'INSERT',
  });

  const firstItem = store.getState()[0];

  createCloseAction()(firstItem);

  expect(store.getState()).toHaveLength(1);
  expect(store.getState()[0].id).not.toBe(firstItem.id);
});

test('can delete item through delete action', () => {
  const id = 'idToBeRemoved';

  store.dispatch({
    payload: {
      id,
      namespace,
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'INSERT',
  });

  const item = store.getState()[0];

  expect(item.id).toBe(id);
  expect(store.getState()).toHaveLength(1);

  deleteAction(item);

  expect(store.getState()).toEqual([]);
});
