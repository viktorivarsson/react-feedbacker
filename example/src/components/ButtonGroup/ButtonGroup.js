import React from 'react';
import { feedback } from '../../../../lib/module';
import './ButtonGroup.css';

const ButtonGroup = () => (
  <div className="ButtonGroup">
    <button
      className="Button Button--success"
      type="button"
      onClick={() => feedback.success('Success message')}
    >
      Add success
    </button>

    <button
      className="Button Button--warning"
      type="button"
      onClick={() => feedback.warning('Warning message')}
    >
      Add warning
    </button>

    <button
      className="Button Button--error"
      type="button"
      onClick={() => feedback.error('Error message')}
    >
      Add error
    </button>

    <button
      className="Button Button--info"
      type="button"
      onClick={() => feedback.info('Info message')}
    >
      Add info
    </button>
  </div>
);

export default ButtonGroup;
