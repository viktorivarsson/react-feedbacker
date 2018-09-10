import { Router } from '@reach/router';
import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Basic from './pages/Basic';
import Emotion from './pages/Emotion';

const App = () => (
  <div>
    <h1>React Feedbacker</h1>

    <Nav />

    <Router>
      <Basic path="/" />
      <Emotion path="emotion" />
    </Router>
  </div>
);

export default App;
