import React, { FC } from 'react';
import styled from 'styled-components';
import { DelayWrapper, useFeedbackContainer, FeedbackKind } from '../../../';

import { FeedbackItem, CloseFeedbackButton } from './FeedbackItem';

const Container = styled.div({
  position: 'fixed',
  right: 20,
  top: 20,

  '> div:not(:last-of-type)': {
    marginBottom: 10,
  },
});

const BasicStyledComponents: FC = () => {
  const { items, closeItem, getDelayWrapperProps } = useFeedbackContainer({
    delayCloseMs: 400,
  });

  return (
    <Container>
      {items.length > 0 &&
        items.map((item) => (
          <DelayWrapper key={item.id} {...getDelayWrapperProps({ item })}>
            <FeedbackItem kind={item.kind as FeedbackKind} status={item.status}>
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

export default BasicStyledComponents;
