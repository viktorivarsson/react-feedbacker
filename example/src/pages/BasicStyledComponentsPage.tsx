import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import BasicStyledComponents from '../components/BasicStyledComponents';
import ButtonGroup from '../components/ButtonGroup';

const BasicStyledComponentsPage: FC<RouteComponentProps> = () => (
  <>
    <BasicStyledComponents />
    <ButtonGroup />
  </>
);

export default BasicStyledComponentsPage;
