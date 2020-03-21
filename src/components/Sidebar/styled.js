import styled from 'styled-components';

export const SidebarGridChild = styled.div`
  transition: ${props =>
    props.shouldShow ? 'var(--easing-decelerate)' : 'var(--easing-accelerate)'};
  width: ${props =>
    props.shouldShow ? (props.isNarrowScreen ? '80vw' : '20vw') : '0'};
  svg {
    padding-left: ${props => (props.shouldShow ? 'none' : '1rem')};
  }
`;
