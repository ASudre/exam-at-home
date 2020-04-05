import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.inputColor || props.theme.color.primary};
  border: ${(props) => `1px solid ${props.theme.color.primary}`};
  border-radius: 3px;
  font-size: small;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const Label = styled.div`
`;

const TextField = ({
  value, label, placeholder, onChange,
}) => (
  <InputContainer>
    <Label>{label}</Label>
    <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
  </InputContainer>
);

export default TextField;