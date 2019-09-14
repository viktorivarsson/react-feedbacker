import { createFeedback, feedback } from '../feedback';
import store from '../store';

afterEach(store.reset);

test('creates item through feedback', () => {
  feedback.success('test-message');

  expect(store.getState()[0].message).toEqual('test-message');
});

test('create feedback works', () => {
  createFeedback('success')('message');

  expect(store.getState()[0].message).toEqual('message');
});

test('creates success type', () => {
  feedback.success('My message');

  expect(store.getState()[0].kind).toEqual('success');
});

test('creates warning type', () => {
  feedback.warning('My message');

  expect(store.getState()[0].kind).toEqual('warning');
});

test('creates error type', () => {
  feedback.error('My message');

  expect(store.getState()[0].kind).toEqual('error');
});

test('creates info type', () => {
  feedback.info('My message');

  expect(store.getState()[0].kind).toEqual('info');
});
