import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { FeedbackKind, FeedbackStatus } from '../../../';

const slideFromRight = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(60px)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

const slideToRight = keyframes({
  from: {
    opacity: 1,
    transform: 'translateX(0)',
  },
  to: {
    opacity: 0,
    transform: 'translateX(60px)',
  },
});

const getBackground = (kind: FeedbackKind) => {
  if (kind === 'error') return '#f83c32';
  if (kind === 'info') return '#f4f4f4';
  if (kind === 'warning') return '#f5a105';
  return '#07c56c';
};

const getColor = (kind: FeedbackKind) => {
  if (kind === 'info') return '#333';
  return '#fff';
};

export const FeedbackItem = styled.div<{
  kind: FeedbackKind;
  status: FeedbackStatus;
}>(
  {
    borderRadius: 3,
    fontSize: 14,
    padding: 10,
    paddingRight: 30,
    position: 'relative',
    width: 250,
    boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.12)',

    ':not(:last-of-type)': {
      marginBottom: 5,
    },
  },
  ({ kind, status }) => ({
    background: getBackground(kind),
    color: getColor(kind),
    opacity: status === 'closing' ? 0 : 1,
    transform: status === 'closing' ? 'translateX(60px)' : 'translateX(0)',
    animation: `${
      status === 'closing' ? slideToRight : slideFromRight
    } .3s ease-out`,
  }),
);

export const CloseFeedbackButton = styled.button({
  background: 'transparent',
  border: 0,
  color: 'inherit',
  cursor: 'pointer',
  padding: '0 5px',
  position: 'absolute',
  right: 10,
  top: 10,
});
