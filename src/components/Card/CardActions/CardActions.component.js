import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  > button {
    margin: .8em .4em 0;
    &:last-child {
      margin-right: 2px;
    }
  }
`;
