import { createNotify, notify } from '../notify';
import store from '../store';

afterEach(store.reset);

test('creates notification through notify', () => {
  notify.success('test-message');

  expect(store.getState()[0].message).toEqual('test-message');
});

test('create notify works', () => {
  createNotify('success')('message');

  expect(store.getState()[0].message).toEqual('message');
});

test('creates success type', () => {
  notify.success('My message');

  expect(store.getState()[0].kind).toEqual('success');
});

test('creates warning type', () => {
  notify.warning('My message');

  expect(store.getState()[0].kind).toEqual('warning');
});

test('creates error type', () => {
  notify.error('My message');

  expect(store.getState()[0].kind).toEqual('error');
});

test('creates info type', () => {
  notify.info('My message');

  expect(store.getState()[0].kind).toEqual('info');
});
