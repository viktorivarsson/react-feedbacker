import React, { FC } from 'react';
import { RouteComponentProps } from '@reach/router';
import BasicEmotion from '../components/BasicEmotion';
import ButtonGroup from '../components/ButtonGroup';

const EmotionBasicPage: FC<RouteComponentProps> = () => (
  <>
    <BasicEmotion />
    <ButtonGroup />
  </>
);

export default EmotionBasicPage;
