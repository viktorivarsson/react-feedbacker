import 'modern-normalize';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import styled from 'styled-components';
import Nav from './components/Nav';
import BasicStyledComponentsPage from './pages/BasicStyledComponentsPage';
import PortalPage from './pages/PortalPage';
import BasicPage from './pages/BasicPage';
import RenderPropPage from './pages/RenderPropPage';
import ElementMessagePage from './pages/ElementMessagePage';
import NamespacePage from './pages/NamespacePage';

const Container = styled.div`
  padding: 20;
`;

const App = () => {
  return (
    <Container>
      <h1>React Feedbacker</h1>

      <Nav />

      <Router>
        <BasicPage path="/" />
        <RenderPropPage path="render-prop" />
        <BasicStyledComponentsPage path="styled-components" />
        <PortalPage path="portal" />
        <ElementMessagePage path="elements" />
        <NamespacePage path="namespaces" />
      </Router>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
