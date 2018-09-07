import * as PropTypes from 'prop-types';
import * as React from 'react';
import { createCloseAction } from './actions';
import { DelayWrapperProps } from './DelayWrapper';
import store, { NotifyItem } from './store';

interface NotifyContainerState {
  notifications: NotifyItem[];
}

interface RenderProps {
  items: NotifyItem[];
  closeItem: (item: NotifyItem) => void;
  getDelayWrapperProps: (options: DelayWrapperProps) => DelayWrapperProps;
}

interface NotifyContainerProps {
  closeAfterMs?: number;
  delayCloseMs?: number;
  children?: (props: RenderProps) => JSX.Element;
  render?: (props: RenderProps) => JSX.Element;
  pauseOnHover?: boolean;
}

class NotifyContainer extends React.PureComponent<
  NotifyContainerProps,
  NotifyContainerState
> {
  public static propTypes = {
    children: PropTypes.func,
    closeAfterMs: PropTypes.number,
    delayCloseMs: PropTypes.number,
    pauseOnHover: PropTypes.bool,
    render: PropTypes.func,
  };

  public static defaultProps = {
    closeAfterMs: 5000,
    delayCloseMs: 0,
    pauseOnHover: true,
  };

  constructor(props: NotifyContainerProps) {
    super(props);

    this.state = {
      notifications: [],
    };
  }

  public unsubscribe: () => void = () => {};

  public onStoreUpdate = () =>
    this.setState({
      notifications: store.getState(),
    });

  public componentDidMount() {
    this.unsubscribe = store.subscribe(this.onStoreUpdate);
  }

  public componentWillUnmount() {
    this.unsubscribe();
  }

  public render() {
    const { children, render = children } = this.props;
    const { notifications } = this.state;

    const closeAction = createCloseAction(this.props.delayCloseMs);

    const getDelayWrapperProps = (
      inputProps: DelayWrapperProps,
    ): DelayWrapperProps =>
      Object.assign(
        {
          close: closeAction,
          closeAfterMs: this.props.closeAfterMs,
          pauseOnHover: this.props.pauseOnHover,
        },
        inputProps,
      );

    return (
      render &&
      render({
        closeItem: closeAction,
        getDelayWrapperProps,
        items: notifications,
      })
    );
  }
}

export default NotifyContainer;
