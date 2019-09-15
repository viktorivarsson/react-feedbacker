import React, { FC } from 'react';
import styled from '@emotion/styled';
import { DelayWrapper, useFeedbackContainer } from '../../../';

import { FeedbackItem, CloseFeedbackButton } from './FeedbackItem';

const Container = styled.div({
  position: 'fixed',
  right: 20,
  top: 20,

  '> div:not(:last-of-type)': {
    marginBottom: 10,
  },
});

const BasicEmotion: FC = () => {
  const { items, closeItem, getDelayWrapperProps } = useFeedbackContainer({
    delayCloseMs: 400,
  });

  return (
    <Container>
      {items.length > 0 &&
        items.map(item => (
          <DelayWrapper key={item.id} {...getDelayWrapperProps({ item })}>
            <FeedbackItem kind={item.kind} status={item.status}>
              {item.message}

              <CloseFeedbackButton
                type="button"
                onClick={() => closeItem(item)}
              >
                x
              </CloseFeedbackButton>
            </FeedbackItem>
          </DelayWrapper>
        ))}
    </Container>
  );
};

export default BasicEmotion;