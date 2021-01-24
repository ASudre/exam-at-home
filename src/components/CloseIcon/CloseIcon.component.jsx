import React from 'react';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';

const IconContainer = styled.div`
  cursor: ${(props) => (props.isClickable ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
`;

const InfoIcon = ({ onClick }) => (
<IconContainer isClickable={!!onClick} >
  <IoIosClose onClick={onClick} />
</IconContainer>);

export default InfoIcon;
