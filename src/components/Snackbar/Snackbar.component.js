import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '../CloseIcon/CloseIcon.component';

const Container = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.color.primary};
  color: white;
  animation: slideout .3s, slidein .3s 6s;
  animation-timing-function: cubic-bezier(.4, 0, .2, 1);
  @keyframes slidein {
    from {
      bottom: 0;
    }
    to {
      bottom: -100px
    }
  }
  @keyframes slideout {
    from {
      bottom: -100px
    }
    to {
      bottom: 0
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  color: ${(props) => (props.onClick ? props.theme.backgroundColor.primary : props.theme.color.secondary)};
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
`;

const eventName = 'showSnackbar';
export const showSnackbar = (message, action) => {
  document.dispatchEvent(new MessageEvent(eventName, {
    data: {
      message,
      action,
    },
  }));
};

const Snackbar = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [action, setAction] = useState();

  useEffect(() => {
    document.addEventListener(eventName, (e) => {
      setVisible(true);
      setMessage(e.data.message);
      setAction(() => e.data.action);
    }, false);

    document.addEventListener('animationend', (e) => {
      if (e.animationName === 'slidein') {
        setVisible(false);
      }
    }, false);
  }, []);

  return visible && (<Container>
      <Info onClick={action}>
        {message}
      </Info>
      <CloseIcon onClick={() => setVisible(false)} />
  </Container>
  );
};

export default Snackbar;
