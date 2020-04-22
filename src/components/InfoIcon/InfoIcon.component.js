import React from 'react';
import styled from 'styled-components';
import { IoIosInformationCircleOutline } from 'react-icons/io';

const IconContainer = styled.div`
  font-size: larger;
`;

const InfoIcon = () => (
  <IconContainer>
    <IoIosInformationCircleOutline />
  </IconContainer>
)

export default InfoIcon;
