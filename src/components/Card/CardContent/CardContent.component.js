import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  background-color: ${(props) => props.theme.backgroundColor.ternary};
  border-radius: 7px;
  align-items: center;
  color: ${(props) => props.theme.color.primary};
  @media (max-width: 768px) {
    padding: .5em;
  }
  padding: 1em;
`;
