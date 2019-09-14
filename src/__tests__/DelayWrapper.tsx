import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import DelayWrapper from '../DelayWrapper';
import { FeedbackItem } from '../store';

afterEach(cleanup);
jest.useFakeTimers();

const item: FeedbackItem = {
  id: '123',
  kind: 'error',
  message: 'My message',
  status: 'open',
};

test('renders children without crashing', () => {
  const { getByText } = render(
    <DelayWrapper item={item}>
      <div>Child</div>
    </DelayWrapper>,
  );
  getByText('Child');
});

test('calls close function', () => {
  const spy = jest.fn();

  render(
    <DelayWrapper item={item} close={spy} closeAfterMs={100}>
      <div>Child</div>
    </DelayWrapper>,
  );

  expect(spy).toHaveBeenCalledTimes(0);
  jest.advanceTimersByTime(200);
  expect(spy).toHaveBeenCalledTimes(1);
});
