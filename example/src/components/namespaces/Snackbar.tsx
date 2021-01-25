import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  DelayWrapper,
  useFeedbackContainer,
  createFeedback,
  FeedbackStatus,
} from '../../../../';

const SNACKBAR_NAMESPACE = 'snacks';

export const snack = createFeedback({
  namespace: SNACKBAR_NAMESPACE,
  behavior: 'prepend',
})('info');

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1,
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(30px);
  }
`;

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

const SnackbarItem = styled.div<{ status: FeedbackStatus }>`
  border-radius: 3px;
  font-size: 14px;
  padding: 10px;
  padding-right: 30px;
  position: relative;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.12);
  background: linear-gradient(45deg, #33b6ff, #ff88fb);
  color: #333;
  opacity: ${(props) => (props.status === 'closing' ? 0 : 1)};
  transform: ${(props) =>
    props.status === 'closing' ? 'translateX(30px)' : 'translateX(0)'};
  animation: ${(props) => (props.status === 'closing' ? slideOut : slideIn)}
    0.3s ease-out;

  :not(:last-of-type) {
    margin-bottom: 5px;
  }
`;

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
        items.map((item) => (
          <DelayWrapper key={item.id} {...getDelayWrapperProps({ item })}>
            <SnackbarItem status={item.status}>
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
