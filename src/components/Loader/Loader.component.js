import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const LoaderContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoaderComponent = () => (
  <LoaderContainer>
    <Loader
        type="Puff"
        color="palevioletred"
        height={100}
        width={100}
    />
  </LoaderContainer>
);

export default LoaderComponent;
