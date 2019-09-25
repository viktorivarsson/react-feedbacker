// @ts-ignore
import 'react-app-polyfill/ie11';
import 'modern-normalize';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import Nav from './components/Nav';
import BasicEmotionPage from './pages/BasicEmotionPage';
import PortalPage from './pages/PortalPage';
import BasicPage from './pages/BasicPage';
import RenderPropPage from './pages/RenderPropPage';
import ElementMessagePage from './pages/ElementMessagePage';
import NamespacePage from './pages/NamespacePage';

const Container = styled.div({
  padding: 20,
});

const App = () => {
  return (
    <Container>
      <Global
        styles={{
          html: {
            fontFamily: 'Arial, Helvetica, sans-serif',
          },
          h1: {
            fontSize: 32,
          },
          h2: {
            fontSize: 20,
          },
        }}
      />

      <h1>React Feedbacker</h1>

      <Nav />

      <Router>
        <BasicPage path="/" />
        <RenderPropPage path="render-prop" />
        <BasicEmotionPage path="emotion" />
        <PortalPage path="portal" />
        <ElementMessagePage path="elements" />
        <NamespacePage path="namespaces" />
      </Router>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
