import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import Portal from '../components/Portal';
import ButtonGroup from '../components/ButtonGroup';

const PortalPage: FC<RouteComponentProps> = () => (
  <>
    <Portal />
    <ButtonGroup />
  </>
);

export default PortalPage;
