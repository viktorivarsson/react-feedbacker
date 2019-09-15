import React, { FC, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import {
  NotificationContainer,
  notify,
} from '../components/namespaces/Notification';
import { SnackbarContainer, snack } from '../components/namespaces/Snackbar';
import { Button, ButtonGroupContainer } from '../components/Button';

const NamespacePage: FC<RouteComponentProps> = () => {
  const [c, ic] = useState(0);

  return (
    <>
      <NotificationContainer />
      <SnackbarContainer />

      <ButtonGroupContainer>
        <Button
          type="button"
          kind="info"
          onClick={() => notify('Notification')}
        >
          Notify
        </Button>
        <Button
          type="button"
          kind="info"
          onClick={() => {
            snack(`Snack ${c}`);
            ic(c + 1);
          }}
        >
          Snack
        </Button>
      </ButtonGroupContainer>
    </>
  );
};

export default NamespacePage;
