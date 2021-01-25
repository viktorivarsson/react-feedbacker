import { createFeedback, feedback } from '../feedback';
import { store } from '../store';

afterEach(store.reset);

test('creates item through feedback', () => {
  feedback.success('test-message');

  expect(store.getState()[0].message).toBe('test-message');
});

test('create feedback works', () => {
  createFeedback()('success')('message');

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

test('insert behavior appends and prepends', () => {
  const append = createFeedback({ behavior: 'append', namespace: 'ns1' })(
    'info',
  );
  append('First');
  append('Second');
  expect(store.getState('ns1')[0].message).toBe('First');
  expect(store.getState('ns1')[1].message).toBe('Second');

  const prepend = createFeedback({ behavior: 'prepend', namespace: 'ns2' })(
    'info',
  );
  prepend('First');
  prepend('Second');
  expect(store.getState('ns2')[0].message).toBe('Second');
  expect(store.getState('ns2')[1].message).toBe('First');
});

test('can insert into namespace', () => {
  createFeedback({ namespace: 'ns1' })('info')('ns1 message');
  createFeedback({ namespace: 'ns2' })('info')('ns2 message');
  createFeedback({ namespace: 'ns2' })('info')('ns2 message 2');

  const ns1 = store.getState('ns1');
  const ns2 = store.getState('ns2');

  expect(ns1).toHaveLength(1);
  expect(ns2).toHaveLength(2);
  expect(ns1[0].message).toBe('ns1 message');
  expect(ns2[0].message).toBe('ns2 message');
  expect(ns2[1].message).toBe('ns2 message 2');
});

test('given override options overrides defaults', () => {
  createFeedback({ namespace: 'overrideMe' })('info')('first', {
    namespace: 'correct',
    closeAfterMs: 500,
  });

  expect(store.getState()).toHaveLength(0);
  expect(store.getState('overrideMe')).toHaveLength(0);
  expect(store.getState('correct')).toHaveLength(1);
  expect(store.getState('correct')[0]).toMatchObject({
    closeAfterMs: 500,
    message: 'first',
    kind: 'info',
    namespace: 'correct',
  });
});
