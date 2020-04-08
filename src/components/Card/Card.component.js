import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1em;
  flex-direction: column;
  margin-bottom: 1.6em;
  width: 100%;
  @media (min-width: 768px) {
    width: 600px;
  }
  &:last-child {
    margin: 0;
  }
`;
