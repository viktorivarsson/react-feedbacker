import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import RenderProp from '../components/RenderProp';
import ButtonGroup from '../components/ButtonGroup';

const BasicPage: FC<RouteComponentProps> = () => {
  return (
    <>
      <RenderProp />
      <ButtonGroup />
    </>
  );
};

export default BasicPage;
