import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
  > button, > a {
    margin: .8em .4em 0;
    @media (max-width: 768px) {
      margin: .4em 0 0;
      }
      &:last-child {
        @media (min-width: 768px) {
          margin-right: 0;
        }
      }
  }
  > a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
  }
`;
