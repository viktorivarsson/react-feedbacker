import { Link } from '@reach/router';
import React from 'react';
import './Nav.css';

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => ({
      className: isCurrent ? 'NavLink NavLink--active' : 'NavLink',
    })}
  />
);

const NavBar = () => (
  <nav className="Nav">
    <NavLink to="/">Basic (CSS)</NavLink>

    <NavLink to="emotion">Emotion (CSS in JS)</NavLink>
  </nav>
);

export default NavBar;
