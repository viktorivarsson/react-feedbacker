import styled from 'styled-components';
import { FeedbackKind } from '../../../';

export const ButtonGroupContainer = styled.div({
  margin: '0 -10px',
});

const getButtonKindStyles = (kind: FeedbackKind) => {
  switch (kind) {
    case 'success':
      return {
        backgroundColor: '#07c56c',
        ':hover,:focus': {
          backgroundColor: '#61d49f',
        },
      };
    case 'warning': {
      return {
        backgroundColor: '#f5a105',
        ':hover,:focus': {
          backgroundColor: '#ffc251',
        },
      };
    }
    case 'error': {
      return {
        backgroundColor: '#f83c32',
        ':hover,:focus': {
          backgroundColor: '#f75f57',
        },
      };
    }
    default: {
      return {
        backgroundColor: '#f4f4f4',
        color: '#333',
        ':hover,:focus': {
          backgroundColor: '#f9f9f9',
        },
      };
    }
  }
};

export const Button = styled.button<{ kind: FeedbackKind }>(
  {
    margin: 10,
    backgroundColor: '#fff',
    padding: '10px 20px',
    textTransform: 'uppercase',
    borderRadius: 3,
    border: 0,
    boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.12)',
    cursor: 'pointer',
  },
  ({ kind }) => getButtonKindStyles(kind),
);
