import React, { FC } from 'react';
import styled from '@emotion/styled';
import { FeedbackItem, CloseFeedbackButton } from '../FeedbackItem';
import {
  DelayWrapper,
  useFeedbackContainer,
  createFeedback,
} from '../../../../';

const NOTIFICATION_NAMESPACE = 'notifications';

export const notify = createFeedback({ namespace: NOTIFICATION_NAMESPACE })(
  'info',
);

const Container = styled.div({
  position: 'fixed',
  right: 20,
  top: 20,

  '> div:not(:last-of-type)': {
    marginBottom: 10,
  },
});

export const NotificationContainer: FC = () => {
  const { items, closeItem, getDelayWrapperProps } = useFeedbackContainer({
    delayCloseMs: 400,
    namespace: NOTIFICATION_NAMESPACE,
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
