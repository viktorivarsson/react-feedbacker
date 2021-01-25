import React from 'react';
import { Button, ButtonGroupContainer } from './Button';
import { feedback } from '../../../';

const ButtonGroup = () => (
  <ButtonGroupContainer>
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

    <Button
      kind="info"
      type="button"
      onClick={() => feedback.info('Without auto close', { closeAfterMs: 0 })}
    >
      Feedback with options
    </Button>
  </ButtonGroupContainer>
);

export default ButtonGroup;
