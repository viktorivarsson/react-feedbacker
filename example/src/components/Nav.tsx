import React, { FC } from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';

const Nav = styled.nav({
  marginBottom: 40,
});

const StyledNavLink = styled(Link)({
  display: 'inline-block',
  marginRight: 20,
  color: '#0084ff',
});

const NavLink: FC<{ to: string }> = props => (
  <StyledNavLink
    {...props}
    getProps={({ isCurrent }) => ({
      style: { color: isCurrent ? '#0084ff' : '#333' },
    })}
  />
);

const NavBar = () => (
  <Nav>
    <NavLink to="/">Basic (CSS)</NavLink>
    <NavLink to="emotion">Emotion (CSS in JS)</NavLink>
    <NavLink to="render-prop">Render props container</NavLink>
    <NavLink to="elements">Render with elements</NavLink>
    <NavLink to="namespaces">Namespaces</NavLink>
  </Nav>
);

export default NavBar;
