import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import BasicCss from '../components/BasicCss';
import { Button, ButtonGroupContainer } from '../components/Button';
import { feedback } from '../../../';

const ElementMessagePage: FC<RouteComponentProps> = () => (
  <>
    <BasicCss />
    <ButtonGroupContainer>
      <Button
        type="button"
        kind="info"
        onClick={() =>
          feedback.info(
            <div>
              This is some <strong>JSX stuff</strong>
            </div>,
          )
        }
      >
        With markup
      </Button>
    </ButtonGroupContainer>
  </>
);

export default ElementMessagePage;
