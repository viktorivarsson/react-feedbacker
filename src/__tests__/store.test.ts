import { deleteAction } from '../actions';
import store, { closeItem } from '../store';
import { DEFAULT_NAMESPACE } from '../utils';
import { itemFixture } from '../__fixtures__/item';

const namespace = DEFAULT_NAMESPACE;

afterEach(store.reset);

const dispatchAppend = (message = 'My message') =>
  store.dispatch({
    payload: {
      ...itemFixture,
      message,
    },
    type: 'APPEND',
  });

test('state should start as empty array', () => {
  expect(store.getState()).toEqual([]);
});

test('can insert through dispatch', () => {
  store.dispatch({
    payload: itemFixture,
    type: 'APPEND',
  });

  const inserted = store.getState()[0];

  expect(inserted.id).toBe(itemFixture.id);
  expect(inserted.kind).toBe(itemFixture.kind);
  expect(inserted.message).toBe(itemFixture.message);
  expect(inserted.namespace).toBe(itemFixture.namespace);
  expect(inserted.status).toBe(itemFixture.status);
});

test('close item changes status', () => {
  dispatchAppend('My message');

  const inserted = store.getState()[0];

  expect(closeItem(inserted).status).toBe('closing');
});

test('returns previous state on unknown dispatched type', () => {
  dispatchAppend('testing');

  const stateBefore = store.getState();

  store.dispatch({
    payload: itemFixture,
    // @ts-ignore
    type: 'INVALID',
  });

  expect(store.getState()).toEqual(stateBefore);
});

test('can reset store', () => {
  dispatchAppend('firs');
  dispatchAppend('second');

  expect(store.getState()).toHaveLength(2);

  store.reset();

  expect(store.getState()).toEqual([]);
});

test('store trigger subscriber callback on insert', () => {
  const spy = jest.fn();

  store.subscribe(spy);

  dispatchAppend('trying subscribers');

  expect(spy).toHaveBeenCalledTimes(1);
});

test('store trigger subscriber callback on delete', () => {
  const spy = jest.fn();

  dispatchAppend('trying subscribers');
  const inserted = store.getState()[0];

  store.subscribe(spy);

  deleteAction(inserted);

  expect(spy).toHaveBeenCalledTimes(1);
});

test('store can unsubscribe', () => {
  const spy = jest.fn();

  const unsubscribe = store.subscribe(spy);

  dispatchAppend('insert while subscribing');
  expect(spy).toHaveBeenCalledTimes(1);

  unsubscribe();

  dispatchAppend('insert after unsubscribe');
  expect(spy).toHaveBeenCalledTimes(1);
});
