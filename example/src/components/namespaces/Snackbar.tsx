import React, { FC } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import {
  DelayWrapper,
  useFeedbackContainer,
  createFeedback,
  FeedbackStatus,
} from '../../../../';

const SNACKBAR_NAMESPACE = 'snacks';

export const snack = createFeedback(SNACKBAR_NAMESPACE)('info');

const slideIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(30px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const slideOut = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(30px)',
  },
});

const Container = styled.div({
  position: 'fixed',
  left: 0,
  bottom: 0,
  right: 0,
  padding: 20,

  '> div:not(:last-of-type)': {
    marginBottom: 10,
  },
});

const SnackbarItem = styled.div<{ status: FeedbackStatus }>(
  {
    borderRadius: 3,
    fontSize: 14,
    padding: 10,
    paddingRight: 30,
    position: 'relative',
    boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.12)',
    background: 'linear-gradient(45deg, #33b6ff, #ff88fb)',
    color: '#333',

    ':not(:last-of-type)': {
      marginBottom: 5,
    },
  },
  ({ status }) => ({
    opacity: status === 'closing' ? 0 : 1,
    transform: status === 'closing' ? 'translateX(30px)' : 'translateX(0)',
    animation: `${status === 'closing' ? slideOut : slideIn} .3s ease-out`,
  }),
);

const CloseButton = styled.button({
  background: 'transparent',
  border: 0,
  color: 'inherit',
  cursor: 'pointer',
  padding: '0 5px',
  position: 'absolute',
  right: 10,
  top: 10,
});

export const SnackbarContainer: FC = () => {
  const { items, closeItem, getDelayWrapperProps } = useFeedbackContainer({
    delayCloseMs: 400,
    namespace: SNACKBAR_NAMESPACE,
  });

  return (
    <Container>
      {items.length > 0 &&
        items.map(item => (
          <DelayWrapper key={item.id} {...getDelayWrapperProps({ item })}>
            <SnackbarItem>
              {item.message}

              <CloseButton type="button" onClick={() => closeItem(item)}>
                x
              </CloseButton>
            </SnackbarItem>
          </DelayWrapper>
        ))}
    </Container>
  );
};
