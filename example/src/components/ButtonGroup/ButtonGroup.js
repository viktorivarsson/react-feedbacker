import React from 'react';
import { notify } from '../../../../lib/module';
import './ButtonGroup.css';

const ButtonGroup = () => (
  <div className="ButtonGroup">
    <button
      className="Button Button--success"
      type="button"
      onClick={() => notify.success('Success message')}
    >
      Add success
    </button>

    <button
      className="Button Button--warning"
      type="button"
      onClick={() => notify.warning('Warning message')}
    >
      Add warning
    </button>

    <button
      className="Button Button--error"
      type="button"
      onClick={() => notify.error('Error message')}
    >
      Add error
    </button>

    <button
      className="Button Button--info"
      type="button"
      onClick={() => notify.info('Info message')}
    >
      Add info
    </button>
  </div>
);

export default ButtonGroup;
