import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1em;
  flex-direction: column;
  align-items: stretch;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
  &:last-child {
    margin: 0;
  }
`;
