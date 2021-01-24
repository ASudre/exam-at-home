import styled from 'styled-components';

const backgroundColor = (props) => (props.secondary
  ? props.theme.backgroundColor.secondary
  : props.theme.backgroundColor.primary);

export default styled.button`
  background-color: ${backgroundColor};
  color: ${(props) => props.theme.color.primary};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  font-size: 1em;
  border: 0;
  padding: 0.8em 1em;
  border-radius: 2px;
  margin: 0;

  & > a {
    color: ${(props) => props.theme.color.primary};
    text-decoration: none;
  }

  &:focus {
    outline:0;
  }

  &:hover {
    opacity: ${(props) => (!props.disabled && 0.8)};
  }

`;
