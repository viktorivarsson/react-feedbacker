import React from 'react';
import './FeedbackBasic.css';
import classNames from 'classnames';
import { FeedbackContainer, DelayWrapper } from '../../../../lib/module';

const FeedbackBasic = () => (
  <FeedbackContainer closeAfterMs={4000} delayCloseMs={400}>
    {({ items, closeItem, getDelayWrapperProps }) => (
      <div className="FeedbackBasic__Container">
        {items.length > 0 &&
          items.map(item => (
            <DelayWrapper key={item.id} {...getDelayWrapperProps({ item })}>
              <div
                className={classNames(
                  'FeedbackBasic__Item',
                  `FeedbackBasic__Item--${item.kind}`,
                  {
                    'FeedbackBasic__Item--closing': item.status === 'closing',
                  },
                )}
              >
                {item.message}

                <button
                  type="button"
                  className="FeedbackBasic__CloseButton"
                  onClick={() => closeItem(item)}
                >
                  x
                </button>
              </div>
            </DelayWrapper>
          ))}
      </div>
    )}
  </FeedbackContainer>
);

export default FeedbackBasic;
