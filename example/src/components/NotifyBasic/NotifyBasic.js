import React from 'react';
import './NotifyBasic.css';
import classNames from 'classnames';
import { NotifyContainer, DelayWrapper } from '../../../../lib/module';

const NotifyBasic = () => (
  <NotifyContainer closeAfterMs={4000} delayCloseMs={400}>
    {({ items, closeItem, getDelayWrapperProps }) => (
      <div className="NotifyBasic__Container">
        {items.length > 0 &&
          items.map(item => (
            <DelayWrapper key={item.id} {...getDelayWrapperProps({ item })}>
              <div
                className={classNames(
                  'NotifyBasic__Item',
                  `NotifyBasic__Item--${item.kind}`,
                  {
                    'NotifyBasic__Item--closing': item.status === 'closing',
                  },
                )}
              >
                {item.message}

                <button
                  type="button"
                  className="NotifyBasic__CloseButton"
                  onClick={() => closeItem(item)}
                >
                  x
                </button>
              </div>
            </DelayWrapper>
          ))}
      </div>
    )}
  </NotifyContainer>
);

export default NotifyBasic;
