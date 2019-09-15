import { createDefaultFeedback, createFeedback, feedback } from '../feedback';
import store from '../store';

afterEach(store.reset);

test('creates item through feedback', () => {
  feedback.success('test-message');

  expect(store.getState()[0].message).toBe('test-message');
});

test('create feedback works', () => {
  createDefaultFeedback('success')('message');

  expect(store.getState()[0].message).toBe('message');
});

test('creates success type', () => {
  feedback.success('My message');

  expect(store.getState()[0].kind).toBe('success');
});

test('creates warning type', () => {
  feedback.warning('My message');

  expect(store.getState()[0].kind).toBe('warning');
});

test('creates error type', () => {
  feedback.error('My message');

  expect(store.getState()[0].kind).toBe('error');
});

test('creates info type', () => {
  feedback.info('My message');

  expect(store.getState()[0].kind).toBe('info');
});

test('can insert into namespace', () => {
  createFeedback('ns1')('info')('ns1 message');
  createFeedback('ns2')('info')('ns2 message');
  createFeedback('ns2')('info')('ns2 message 2');

  const ns1 = store.getState('ns1');
  const ns2 = store.getState('ns2');

  expect(ns1).toHaveLength(1);
  expect(ns2).toHaveLength(2);
  expect(ns1[0].message).toBe('ns1 message');
  expect(ns2[0].message).toBe('ns2 message');
  expect(ns2[1].message).toBe('ns2 message 2');
});
