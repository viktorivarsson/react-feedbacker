import React from 'react';
import './BasicCss.css';
import classNames from 'classnames';
import { FeedbackContainer, DelayWrapper } from '../../../';

const FeedbackBasic = () => (
  <FeedbackContainer closeAfterMs={4000} delayCloseMs={400}>
    {({ items, closeItem, getDelayWrapperProps }) => (
      <div className="BasicCss__Container">
        {items.length > 0 &&
          items.map(item => (
            <DelayWrapper key={item.id} {...getDelayWrapperProps({ item })}>
              <div
                className={classNames(
                  'BasicCss__Item',
                  `BasicCss__Item--${item.kind}`,
                  {
                    'BasicCss__Item--closing': item.status === 'closing',
                  },
                )}
              >
                {item.message}

                <button
                  type="button"
                  className="BasicCss__CloseButton"
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
