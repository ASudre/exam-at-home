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
  border: 0;
  padding: 0.8em 1em;
  border-radius: 2px;

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
