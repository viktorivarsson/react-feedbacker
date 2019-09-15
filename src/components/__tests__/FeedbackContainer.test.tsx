import React from 'react';
import { cleanup, fireEvent, render, act } from '@testing-library/react';
import { FeedbackContainer } from '../FeedbackContainer';
import { store } from '../../store';
import { DEFAULT_NAMESPACE } from '../../utils';
import { itemFixture } from '../../__fixtures__/item';

afterEach(() => {
  store.reset();
  cleanup();
});

test('renders children as a function without crashing', () => {
  const { getByText } = render(
    <FeedbackContainer>{() => <div>Child</div>}</FeedbackContainer>,
  );
  getByText('Child');
});

test('renders render as prop without crashing', () => {
  const { getByText } = render(
    <FeedbackContainer render={() => <div>Child</div>} />,
  );
  getByText('Child');
});

test('closes item from function prop', async () => {
  store.dispatch({
    payload: {
      id: 'id',
      namespace: DEFAULT_NAMESPACE,
      kind: 'success',
      message: 'Message',
      status: 'open',
    },
    type: 'APPEND',
  });

  const item = store.getState()[0];

  expect(store.getState()).toHaveLength(1);

  const { getByText } = render(
    <FeedbackContainer delayCloseMs={200}>
      {({ closeItem }) => (
        <button onClick={() => closeItem(item)}>Remove</button>
      )}
    </FeedbackContainer>,
  );

  act(() => {
    fireEvent.click(getByText('Remove'));
  });

  expect(store.getState()[0].status).toBe('closing');
});

test('provides getDelayWrapperProps based on props', () => {
  render(
    <FeedbackContainer closeAfterMs={5000} pauseOnHover={false}>
      {({ getDelayWrapperProps }) => {
        const dp = getDelayWrapperProps({ item: itemFixture });

        expect(dp.closeAfterMs).toBe(5000);
        expect(dp.pauseOnHover).toBe(false);

        return <div>Children</div>;
      }}
    </FeedbackContainer>,
  );

  render(
    <FeedbackContainer closeAfterMs={2500} pauseOnHover={true}>
      {({ getDelayWrapperProps }) => {
        const dp = getDelayWrapperProps({ item: itemFixture });

        expect(dp.closeAfterMs).toBe(2500);
        expect(dp.pauseOnHover).toBe(true);

        return <div>Children</div>;
      }}
    </FeedbackContainer>,
  );
});

test('unmounts correctly', () => {
  expect(store.getListeners()).toHaveLength(0);
  const { unmount } = render(
    <FeedbackContainer>{() => <div>Child</div>}</FeedbackContainer>,
  );
  expect(store.getListeners()).toHaveLength(1);
  unmount();
  expect(store.getListeners()).toHaveLength(0);
});
