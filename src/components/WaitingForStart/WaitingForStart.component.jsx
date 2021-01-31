import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { I18n } from 'aws-amplify';

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

const getCountDown = (startTime) => Math.floor((new Date(startTime) - new Date()) / 1000);

const WaitingForStart = ({ onStart, startTime }) => {
  const [countDown, setCountDown] = useState(getCountDown(startTime));

  useEffect(() => {
    let timeout = null;
    if (countDown <= 0) {
      onStart();
    } else {
      timeout = setTimeout(() => setCountDown(getCountDown(startTime)), 1000);
    }
    return () => clearTimeout(timeout);
  }, [countDown, onStart, startTime]);
  return <Container><Counter>{I18n.get('Starts in')} {countDown} {I18n.get('Second').toLowerCase()}{`${countDown > 1 ? 's' : ''}`}</Counter></Container>;
};

export default WaitingForStart;
