import React from 'react';
import './BasicCss.css';
import classNames from 'classnames';
import { DelayWrapper, useFeedbackContainer } from '../../../';

const FeedbackBasic = () => {
  const { items, closeItem, getDelayWrapperProps } = useFeedbackContainer({
    closeAfterMs: 4000,
    delayCloseMs: 400,
  });

  return (
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
  );
};

export default FeedbackBasic;
