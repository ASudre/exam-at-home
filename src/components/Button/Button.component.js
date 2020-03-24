import styled from 'styled-components';

const backgroundColor = (props) => (props.primary ? props.theme.color.primary : '#282b33');

export default styled.button`
  background-color: ${backgroundColor};
  color: ${(props) => (props.primary ? 'white' : props.theme.color.primary)};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  font-weight: 700;
  font-size: 1em;
  padding: 0.25em 1em;
  border: ${(props) => `2px solid ${props.theme.color.primary}`};
  border-radius: 3px;
  height: 1.8em;

  & > a {
    color: ${(props) => (props.primary ? 'white' : props.theme.color.primary)};
    text-decoration: none;
  }

  &:hover {
    background-color: ${(props) => (props.disabled ? backgroundColor(props) : props.theme.color.secondary)};
    color: ${(props) => (!props.disabled && props.primary && props.theme.color.primary)};
  }
`;
