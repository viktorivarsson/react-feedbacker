import { deleteAction } from '../actions';
import store, { closeItem } from '../store';

afterEach(store.reset);

const dispatchInsert = (message = 'My message') =>
  store.dispatch({
    payload: {
      id: 'fake',
      kind: 'success',
      message,
      status: 'open',
    },
    type: 'INSERT',
  });

test('state should start as empty array', () => {
  expect(store.getState()).toEqual([]);
});

test('can insert through dispatch', () => {
  store.dispatch({
    payload: {
      id: 'fake',
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'INSERT',
  });

  const inserted = store.getState()[0];

  expect(inserted.id).toEqual('fake');
  expect(inserted.kind).toEqual('success');
  expect(inserted.message).toEqual('My message');
});

test('close item changes status', () => {
  dispatchInsert('My message');

  const inserted = store.getState()[0];

  expect(closeItem(inserted).status).toEqual('closing');
});

test('throws on invalid dispatched type', () => {
  dispatchInsert('testing');

  const stateBefore = store.getState();

  store.dispatch({
    payload: {
      id: 'test',
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'INVALID',
  });

  expect(store.getState()).toEqual(stateBefore);
});

test('can reset store', () => {
  dispatchInsert('firs');
  dispatchInsert('second');

  expect(store.getState()).toHaveLength(2);

  store.reset();

  expect(store.getState()).toEqual([]);
});

test('store notifies subscribers on insert', () => {
  const spy = jest.fn();

  store.subscribe(spy);

  dispatchInsert('trying subscribers');

  expect(spy).toHaveBeenCalledTimes(1);
});

test('store notifies subscribers on delete', () => {
  const spy = jest.fn();

  dispatchInsert('trying subscribers');
  const inserted = store.getState()[0];

  store.subscribe(spy);

  deleteAction(inserted);

  expect(spy).toHaveBeenCalledTimes(1);
});

test('store can unsubscribe', () => {
  const spy = jest.fn();

  const unsubscribe = store.subscribe(spy);

  dispatchInsert('insert while subscribing');
  expect(spy).toHaveBeenCalledTimes(1);

  unsubscribe();

  dispatchInsert('insert after unsubscribe');
  expect(spy).toHaveBeenCalledTimes(1);
});
