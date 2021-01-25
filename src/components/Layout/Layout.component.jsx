import React from 'react';
import styled from 'styled-components';

import Snackbar from '../Snackbar/Snackbar.component.jsx';

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
  padding: 1.6em 1em;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    align-items: initial;
  }
`;

const Layout = ({ header, children }) => (
  <Container>
    {header}
    <Content>
      {children}
    </Content>
    <Snackbar />
  </Container>
);

export default Layout;
