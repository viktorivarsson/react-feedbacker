import * as React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import FeedbackContainer from '../FeedbackContainer';
import store from '../store';
import { FeedbackItem } from '../store';

afterEach(() => {
  store.reset();
  cleanup();
});

const fakeItem: FeedbackItem = {
  id: 'test',
  kind: 'success',
  message: 'My message',
  status: 'open',
};

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

test('closes item from function prop', () => {
  store.dispatch({
    payload: {
      id: 'id',
      kind: 'success',
      message: 'Message',
      status: 'open',
    },
    type: 'INSERT',
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
  fireEvent.click(getByText('Remove'));

  expect(store.getState()[0].status).toEqual('closing');
});

test('provides getDelayWrapperProps based on props', () => {
  render(
    <FeedbackContainer closeAfterMs={5000} pauseOnHover={false}>
      {({ getDelayWrapperProps }) => {
        const dp = getDelayWrapperProps({ item: fakeItem });

        expect(dp.closeAfterMs).toEqual(5000);
        expect(dp.pauseOnHover).toEqual(false);

        return <div>Children</div>;
      }}
    </FeedbackContainer>,
  );

  render(
    <FeedbackContainer closeAfterMs={2500} pauseOnHover={true}>
      {({ getDelayWrapperProps }) => {
        const dp = getDelayWrapperProps({ item: fakeItem });

        expect(dp.closeAfterMs).toEqual(2500);
        expect(dp.pauseOnHover).toEqual(true);

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
