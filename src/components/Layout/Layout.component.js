import React from 'react';
import styled from 'styled-components';

import AppBar from '../AppBar/AppBar.component';

const Container = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  @media (min-width: 768px) {
    font-size: larger;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  padding: 2em 1em;
  flex-direction: column;
  align-items: center;
`;

const Layout = ({ children }) => (
  <Container>
    <AppBar/>
    <Content>
      {children}
    </Content>
  </Container>
);

export default Layout;
