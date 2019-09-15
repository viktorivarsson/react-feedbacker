import React, { FC } from 'react';
import useFeedbackContainer, {
  UseFeedbackContainerOptions,
  UseFeedbackContainerResponse,
} from '../hooks/useFeedbackContainer';

type RenderProps = UseFeedbackContainerResponse;

type FeedbackContainerProps = UseFeedbackContainerOptions & {
  children?: (props: RenderProps) => JSX.Element;
  render?: (props: RenderProps) => JSX.Element;
};

const FeedbackContainer: FC<FeedbackContainerProps> = ({
  children,
  render = children,
  ...rest
}) => {
  const childProps = useFeedbackContainer(rest);

  if (typeof render !== 'function') {
    throw new Error('render is not a function in FeedbackContainer');
  }

  return render(childProps);
};

export default FeedbackContainer;
