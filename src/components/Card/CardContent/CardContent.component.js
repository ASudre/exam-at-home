import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: ${(props) => `2px solid ${props.theme.color.primary}`};
  border-radius: 3px;
  align-items: center;
  padding: 1em;
`;
