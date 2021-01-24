import React from 'react';
import styled from 'styled-components';

import AppBar from '../AppBar/AppBar.component';
import Snackbar from '../Snackbar/Snackbar.component';

const Container = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: white;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  padding: 2em 1em;
  flex-direction: column;
  align-items: center;
`;

const Layout = ({ username, isAdmin, children }) => (
  <Container>
    <AppBar username={username} isAdmin={isAdmin} />
    <Content>
      {children}
    </Content>
    <Snackbar/>
  </Container>
);

export default Layout;
