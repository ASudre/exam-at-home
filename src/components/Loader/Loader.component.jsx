import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Loader from 'react-loader-spinner';

const LoaderContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoaderComponent = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <LoaderContainer>
      <Loader
          type="Puff"
          color={themeContext.color.primary}
          height={100}
          width={100}
      />
    </LoaderContainer>
  );
};

export default LoaderComponent;
