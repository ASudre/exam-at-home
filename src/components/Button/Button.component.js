import styled from 'styled-components';

const backgroundColor = (props) => (props.secondary
  ? props.theme.backgroundColor.secondary
  : props.theme.backgroundColor.primary);

const color = (props) => (props.secondary
  ? props.theme.color.secondary
  : props.theme.color.primary);

export default styled.button`
  background-color: ${backgroundColor};
  color: ${color};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  font-size: 1em;
  padding: 0.3em 1em;
  border: ${(props) => `1px solid ${props.theme.color.primary}`};
  border-radius: 7px;

  & > a {
    color: ${color};
    text-decoration: none;
  }

  &:focus {
    outline:0;
  }

  &:hover {
    background-color: ${(props) => (!props.disabled && props.theme.backgroundColor.secondary)};
  }

`;
