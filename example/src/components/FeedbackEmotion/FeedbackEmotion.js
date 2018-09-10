import React from 'react';
import { FeedbackContainer, DelayWrapper } from '../../../../lib/module';
import styled, { keyframes } from 'react-emotion';

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

const Container = styled.div({
  position: 'fixed',
  right: 20,
  top: 20,

  '> div:not(:last-of-type)': {
    marginBottom: 10,
  },
});

const getBackground = kind => {
  if (kind === 'error') return '#f83c32';
  if (kind === 'info') return '#f4f4f4';
  if (kind === 'warning') return '#f5a105';
  return '#07c56c';
};

const getColor = kind => {
  if (kind === 'info') return '#333';
  return '#fff';
};

const FeedbackItem = styled.div(
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

const FeedbackEmotion = () => (
  <FeedbackContainer delayCloseMs={400}>
    {({ items, closeItem, getDelayWrapperProps }) => (
      <Container>
        {items.length > 0 &&
          items.map(item => (
            <DelayWrapper key={item.id} {...getDelayWrapperProps({ item })}>
              <FeedbackItem kind={item.kind} status={item.status}>
                {item.message}

                <CloseButton type="button" onClick={() => closeItem(item)}>
                  x
                </CloseButton>
              </FeedbackItem>
            </DelayWrapper>
          ))}
      </Container>
    )}
  </FeedbackContainer>
);

export default FeedbackEmotion;
