import React, { FC, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
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

const rootElement = document.getElementById('portal-root');

const Portal: FC = () => {
  const { items, closeItem, getDelayWrapperProps } = useFeedbackContainer({
    delayCloseMs: 400,
  });

  const elementRef = useRef(document.createElement('div'));

  useEffect(() => {
    const element = elementRef.current;

    if (rootElement) {
      rootElement.appendChild(element);
    }

    return () => {
      if (rootElement) {
        rootElement.removeChild(element);
      }
    };
  }, []);

  return createPortal(
    <Container>
      {items.length > 0 &&
        items.map(item => (
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
    </Container>,
    elementRef.current,
  );
};

export default Portal;
