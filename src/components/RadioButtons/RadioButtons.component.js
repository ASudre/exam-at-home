import React from 'react';
import styled from 'styled-components';

const Radio = styled.input`
  font-size: 1em;
  margin: 1em;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  color: #1d1d1d;
  height: 100%;
  font-weight: 700;
`;

const CorrectAnswerLabel = styled(Label)`
  color: #00923b;
`;

const RadioButton = ({
  values, setValue, checkedValue, correctAnswer, disabled,
}) => (
  <Container>
    {values.map((value) => (
      <RadioContainer key={value}>
        <Radio
          id={`${value}-radio-button`}
          type="radio"
          value={value}
          onChange={() => setValue(value)}
          checked={value === checkedValue}
          disabled={disabled}
        />
        {correctAnswer === value
          ? <CorrectAnswerLabel htmlFor={`${value}-radio-button`}>{value}</CorrectAnswerLabel>
          : <Label htmlFor={`${value}-radio-button`}>{value}</Label>
        }
      </RadioContainer>
    ))}
  </Container>
);

export default RadioButton;
