import * as PropTypes from 'prop-types';
import * as React from 'react';
import { createCloseAction } from './actions';
import { DelayWrapperProps } from './DelayWrapper';
import store, { FeedbackItem } from './store';

interface FeedbackContainerState {
  items: FeedbackItem[];
}

interface RenderProps {
  items: FeedbackItem[];
  closeItem: (item: FeedbackItem) => void;
  getDelayWrapperProps: (options: DelayWrapperProps) => DelayWrapperProps;
}

interface FeedbackContainerProps {
  closeAfterMs?: number;
  delayCloseMs?: number;
  children?: (props: RenderProps) => JSX.Element;
  render?: (props: RenderProps) => JSX.Element;
  pauseOnHover?: boolean;
}

class FeedbackContainer extends React.PureComponent<
  FeedbackContainerProps,
  FeedbackContainerState
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

  constructor(props: FeedbackContainerProps) {
    super(props);

    this.state = {
      items: [],
    };
  }

  public unsubscribe: () => void = () => {};

  public onStoreUpdate = () =>
    this.setState({
      items: store.getState(),
    });

  public componentDidMount() {
    this.unsubscribe = store.subscribe(this.onStoreUpdate);
  }

  public componentWillUnmount() {
    this.unsubscribe();
  }

  public render() {
    const { children, render = children } = this.props;
    const { items } = this.state;

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
        items,
      })
    );
  }
}

export default FeedbackContainer;
