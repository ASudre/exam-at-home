import styled from 'styled-components';

export default styled.div`
  border-radius: 6px;
  box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 15%);
  box-sizing: border-box;
  padding: 1em;
  @media (max-width: 767px) {
    padding: .5em;
  }
  display: flex;
  justify-content: space-between;
  font-size: 1em;
  flex-direction: column;
  margin-bottom: 1.6em;
  @media (min-width: 768px) {
    width: 600px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
