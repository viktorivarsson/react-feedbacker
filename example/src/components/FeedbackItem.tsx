import styled, { keyframes } from 'styled-components';
import { FeedbackKind, FeedbackStatus } from '../../../';

const slideFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideToRight = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(60px);
  }
`;

const getBackground = (kind: FeedbackKind) => {
  if (kind === 'error') return '#f83c32';
  if (kind === 'info') return '#f4f4f4';
  if (kind === 'warning') return '#f5a105';
  return '#07c56c';
};

const getColor = (kind: FeedbackKind) => {
  if (kind === 'info') return '#333';
  return '#fff';
};

export const FeedbackItem = styled.div<{
  kind: FeedbackKind;
  status: FeedbackStatus;
}>`
  border-radius: 3px;
  font-size: 14px;
  padding: 10px;
  padding-right: 30px;
  position: relative;
  width: 250px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.12);
  background: ${(props) => getBackground(props.kind)};
  color: ${(props) => getColor(props.kind)};
  opacity: ${(props) => (props.status === 'closing' ? 0 : 1)};
  transform: ${(props) =>
    props.status === 'closing' ? 'translateX(60px)' : 'translateX(0)'};
  animation: ${(props) =>
      props.status === 'closing' ? slideToRight : slideFromRight}
    0.3s ease-out;

  &:not(:last-of-type) {
    margin-bottom: 5px;
  }
`;

export const CloseFeedbackButton = styled.button({
  background: 'transparent',
  border: 0,
  color: 'inherit',
  cursor: 'pointer',
  padding: '0 5px',
  position: 'absolute',
  right: 10,
  top: 10,
});
