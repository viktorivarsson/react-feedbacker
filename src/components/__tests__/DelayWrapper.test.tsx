import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { DelayWrapper } from '../DelayWrapper';
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

test('calls close function based on item prop if available', () => {
  const spy = jest.fn();

  render(
    <DelayWrapper
      item={{ ...itemFixture, closeAfterMs: 100 }}
      close={spy}
      closeAfterMs={0}
    >
      <div>Child</div>
    </DelayWrapper>,
  );

  expect(spy).toHaveBeenCalledTimes(0);
  jest.advanceTimersByTime(200);
  expect(spy).toHaveBeenCalledTimes(1);
});

test('skips close function when item prop is 0', () => {
  const spy = jest.fn();

  render(
    <DelayWrapper
      item={{ ...itemFixture, closeAfterMs: 0 }}
      close={spy}
      closeAfterMs={100}
    >
      <div>Child</div>
    </DelayWrapper>,
  );

  expect(spy).toHaveBeenCalledTimes(0);
  jest.advanceTimersByTime(200);
  expect(spy).toHaveBeenCalledTimes(0);
});
