import styled from 'styled-components';

export const ArrowButton = styled.button`
  margin-right: 0.5rem;
  border: 0;
  background: transparent;

  &:hover {
    background: transparent;
  }

  &:focus {
    outline: none;
  }
`;

export const DrawerMenuParent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  transition: var(--easing-standard);
`;

export const DrawerMenuChild = styled.div`
  max-height: ${props => (props.show ? '400vh' : '1px')};
  overflow-y: hidden;
  transition: var(--easing-slower);
`;

// export const DrawerToggle = styled.div`
//   flex-
// `
// ListItem.displayName = 'ListItem';
