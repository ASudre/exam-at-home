import React from 'react';
import styled from 'styled-components';
import { IoIosAdd } from 'react-icons/io';

const AddIconContainer = styled.div`
  font-size: 80px;
  @media (max-width: 768px) {
    font-size: 60px;
  }
  width: 100%;
  display: flex;
  justify-content: center;
  > svg {
    cursor: pointer;
    background-color: ${(props) => props.theme.color.primary};
    :hover {
      background-color: ${(props) => props.theme.color.secondary};
      color: ${(props) => props.theme.color.primary};
    }
    border-radius: 50%;
  }
`;

const AddIcon = ({ onClick }) => (
  <AddIconContainer>
    <IoIosAdd onClick={onClick} />
  </AddIconContainer>
);

export default AddIcon;
