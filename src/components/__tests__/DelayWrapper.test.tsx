import React from 'react';
import { cleanup, render } from '@testing-library/react';
import DelayWrapper from '../DelayWrapper';
import { FeedbackItem } from '../../store';
import { itemFixture } from '../../__fixtures__/item';

afterEach(cleanup);
jest.useFakeTimers();

test('renders children without crashing', () => {
  const { getByText } = render(
    <DelayWrapper item={itemFixture}>
      <div>Child</div>
    </DelayWrapper>,
  );
  getByText('Child');
});

test('calls close function', () => {
  const spy = jest.fn();

  render(
    <DelayWrapper item={itemFixture} close={spy} closeAfterMs={100}>
      <div>Child</div>
    </DelayWrapper>,
  );

  expect(spy).toHaveBeenCalledTimes(0);
  jest.advanceTimersByTime(200);
  expect(spy).toHaveBeenCalledTimes(1);
});
