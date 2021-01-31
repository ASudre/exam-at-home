import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: ${(props) => (props.row ? 'row-reverse' : 'column')};
  justify-content: space-between;
  color: ${(props) => props.theme.color.primary};
`;
