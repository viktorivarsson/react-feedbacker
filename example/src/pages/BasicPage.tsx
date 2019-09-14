import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import BasicCss from '../components/BasicCss';
import ButtonGroup from '../components/ButtonGroup';

const BasicPage: FC<RouteComponentProps> = () => {
  return (
    <>
      <BasicCss />
      <ButtonGroup />
    </>
  );
};

export default BasicPage;
