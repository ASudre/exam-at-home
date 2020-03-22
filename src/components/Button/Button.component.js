import styled from 'styled-components';

export default styled.button`
  background: ${(props) => (props.primary ? props.theme.main : 'white')};
  color: ${(props) => (props.primary ? 'white' : props.theme.main)};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: ${(props) => `2px solid ${props.theme.main}`};
  border-radius: 3px;

  & > a {
    color: ${(props) => (props.primary ? 'white' : props.theme.main)};
    text-decoration: none;
  }

  &:hover {
    background: ${(props) => (props.primary ? '#dd3f5b1f' : '#dd3f5b1f')};
  }
`;
