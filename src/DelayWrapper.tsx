import * as PropTypes from 'prop-types';
import * as React from 'react';
import { getTimeDifferenceInMs } from './helpers';
import { NotifyItem } from './store';

export interface DelayWrapperProps {
  closeAfterMs?: number;
  close?: (item: NotifyItem) => void;
  item: NotifyItem;
  pauseOnHover?: boolean;
}

const noop = () => {};

class DelayWrapper extends React.PureComponent<DelayWrapperProps> {
  public static propTypes = {
    close: PropTypes.func.isRequired,
    closeAfterMs: PropTypes.number,
    item: PropTypes.object.isRequired,
    pauseOnHover: PropTypes.bool,
  };

  public timerStartedAt?: Date;
  public timer?: any = null;
  public timeRemaining = this.props.closeAfterMs;

  public componentDidMount() {
    if (!this.props.closeAfterMs) {
      return;
    }

    this.timerStartedAt = new Date();
    this.playTimer();
  }

  public close = () => {
    if (typeof this.props.close === 'function') {
      this.props.close(this.props.item);
    }
  };

  public pauseTimer = () => {
    if (!this.timeRemaining || !this.timerStartedAt) {
      return;
    }

    clearTimeout(this.timer);

    const timePassed = getTimeDifferenceInMs(new Date(), this.timerStartedAt);

    this.timeRemaining = this.timeRemaining - timePassed;
  };

  public playTimer = () => {
    this.timer = setTimeout(this.close, this.timeRemaining);
  };

  public render() {
    const { pauseOnHover, closeAfterMs } = this.props;

    return closeAfterMs ? (
      <div
        onMouseEnter={pauseOnHover ? this.pauseTimer : noop}
        onMouseLeave={pauseOnHover ? this.playTimer : noop}
      >
        {this.props.children}
      </div>
    ) : (
      <div>{this.props.children}</div>
    );
  }
}

export default DelayWrapper;
