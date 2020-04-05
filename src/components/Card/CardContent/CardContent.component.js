import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: ${(props) => `2px solid ${props.theme.color.primary}`};
  border-radius: 3px;
  align-items: center;
  color: ${(props) => props.theme.color.primary};
  @media (max-width: 768px) {
    padding: .5em;
  }
  padding: 1em;
`;
