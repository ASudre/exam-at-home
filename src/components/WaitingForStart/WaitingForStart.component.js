import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.color.primary};
`;

const Counter = styled.div`
  border: ${(props) => `4px solid ${props.theme.color.primary}`};
  border-radius: 25%;
  border-radius: 50%;
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const WaitingForStart = ({ startsIn = 0, onStart }) => {
  const [countDown, setCountDown] = useState(startsIn);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (countDown < 0) {
      return;
    }
    if (countDown === 0) {
      setStart(true);
    } else {
      setTimeout(() => setCountDown(countDown - 1), 1000);
    }
  }, [countDown, onStart])

  useEffect(() => {
    if (start) {
      onStart().then(() => setStart(false));
    }
  }, [start])
  return <Container><Counter>Starts in {countDown} second{`${countDown > 1 ? 's' : ''}`}</Counter></Container>
}

export default WaitingForStart;
