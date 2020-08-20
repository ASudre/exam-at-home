import React, { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import CloseIcon from '../CloseIcon/CloseIcon.component';

let ref;
const Container = styled.div`
  display: fixed;
  background-color: ${(props) => props.theme.color.primary};
  color: white;
  animation: slideout .3s, slidein .3s 6s;
  animation-timing-function: cubic-bezier(.4, 0, .2, 1);
  padding: 5px;
  @keyframes slidein {
    from {
      height: ${`${ref?.current?.clientHeight ?? 18}px`};
    }
    to {
      height: 0;
    }
  }
  @keyframes slideout {
    from {
      height: 0;
    }
    to {
      height: ${`${ref?.current?.clientHeight ?? 18}px`};
    }
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  color: ${(props) => (props.onClick ? props.theme.backgroundColor.primary : props.theme.color.secondary)};
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
`;

const eventName = 'showSnackbar';
window.showSnackbar = (message, action) => {
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
  ref = createRef();

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
    <Content ref={ref}>
      <Info onClick={action}>
        {message}
      </Info>
      <CloseIcon onClick={() => setVisible(false)} />
    </Content>
  </Container>
  );
};

export default Snackbar;
