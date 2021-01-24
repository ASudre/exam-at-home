import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  padding: 1em;
  margin: 0.5em 0;
  color: ${(props) => props.inputColor || props.theme.color.primary};
  border: ${(props) => `1px solid ${props.theme.border.primary}`};
  border-radius: 2px;
  font-size: small;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
`;

const Label = styled.div`
`;

const TextField = ({
  value, label, placeholder, onChange, type,
}) => (
  <InputContainer>
    <Label>{label}</Label>
    <Input
      value={value}
      type={type || 'text'}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </InputContainer>
);

export default TextField;
