import 'jest-dom/extend-expect';
import * as React from 'react';
import { cleanup, fireEvent, render } from 'react-testing-library';
import NotifyContainer from '../NotifyContainer';
import store from '../store';
import { NotifyItem } from '../store';

afterEach(() => {
  store.reset();
  cleanup();
});

const fakeItem: NotifyItem = {
  id: 'test',
  kind: 'success',
  message: 'My message',
  status: 'open',
};

test('renders children as a function without crashing', () => {
  const { getByText } = render(
    <NotifyContainer>{() => <div>Child</div>}</NotifyContainer>,
  );
  getByText('Child');
});

test('renders render as prop without crashing', () => {
  const { getByText } = render(
    <NotifyContainer render={() => <div>Child</div>} />,
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
    <NotifyContainer delayCloseMs={200}>
      {({ closeItem }) => (
        <button onClick={() => closeItem(item)}>Remove</button>
      )}
    </NotifyContainer>,
  );
  fireEvent.click(getByText('Remove'));

  expect(store.getState()[0].status).toEqual('closing');
});

test('provides getDelayWrapperProps based on props', () => {
  render(
    <NotifyContainer closeAfterMs={5000} pauseOnHover={false}>
      {({ getDelayWrapperProps }) => {
        const dp = getDelayWrapperProps({ item: fakeItem });

        expect(dp.closeAfterMs).toEqual(5000);
        expect(dp.pauseOnHover).toEqual(false);

        return <div>Children</div>;
      }}
    </NotifyContainer>,
  );

  render(
    <NotifyContainer closeAfterMs={2500} pauseOnHover={true}>
      {({ getDelayWrapperProps }) => {
        const dp = getDelayWrapperProps({ item: fakeItem });

        expect(dp.closeAfterMs).toEqual(2500);
        expect(dp.pauseOnHover).toEqual(true);

        return <div>Children</div>;
      }}
    </NotifyContainer>,
  );
});

test('unmounts correctly', () => {
  expect(store.getListeners()).toHaveLength(0);
  const { unmount } = render(
    <NotifyContainer>{() => <div>Child</div>}</NotifyContainer>,
  );
  expect(store.getListeners()).toHaveLength(1);
  unmount();
  expect(store.getListeners()).toHaveLength(0);
});
