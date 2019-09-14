import React from 'react';
import styled from '@emotion/styled';
import { feedback, FeedbackKind } from '../../../';

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

const Group = styled.div({
  margin: '0 -10px',
});

const Button = styled.button<{ kind: FeedbackKind }>(
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

const ButtonGroup = () => (
  <Group>
    <Button
      kind="success"
      type="button"
      onClick={() => feedback.success('Success message')}
    >
      Add success
    </Button>

    <Button
      kind="warning"
      type="button"
      onClick={() => feedback.warning('Warning message')}
    >
      Add warning
    </Button>

    <Button
      kind="error"
      type="button"
      onClick={() => feedback.error('Error message')}
    >
      Add error
    </Button>

    <Button
      kind="info"
      type="button"
      onClick={() => feedback.info('Info message')}
    >
      Add info
    </Button>
  </Group>
);

export default ButtonGroup;
