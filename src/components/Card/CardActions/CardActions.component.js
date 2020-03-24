import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  > button {
    margin: 20px 20px 0;
    @media (max-width: 768px) {
      margin: 10px 10px 0;
    }
    &:last-child {
      margin-left: 0;
      margin-right: 2px;
    }
  }
`;
