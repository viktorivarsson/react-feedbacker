import { deleteAction } from '../actions';
import store, { closeItem } from '../store';
import { DEFAULT_NAMESPACE } from '../utils';

const namespace = DEFAULT_NAMESPACE;

afterEach(store.reset);

const dispatchInsert = (message = 'My message') =>
  store.dispatch({
    payload: {
      id: 'fake',
      namespace,
      kind: 'success',
      message,
      status: 'open',
    },
    type: 'APPEND',
  });

test('state should start as empty array', () => {
  expect(store.getState()).toEqual([]);
});

test('can insert through dispatch', () => {
  store.dispatch({
    payload: {
      id: 'fake',
      namespace,
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    type: 'APPEND',
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
      namespace,
      kind: 'success',
      message: 'My message',
      status: 'open',
    },
    // @ts-ignore
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

test('store trigger subscriber callback on insert', () => {
  const spy = jest.fn();

  store.subscribe(spy);

  dispatchInsert('trying subscribers');

  expect(spy).toHaveBeenCalledTimes(1);
});

test('store trigger subscriber callback on delete', () => {
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
