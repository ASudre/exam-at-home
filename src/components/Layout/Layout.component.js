import React from 'react';
import styled from 'styled-components';

import AppBar from '../AppBar/AppBar.component';

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: white;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
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
