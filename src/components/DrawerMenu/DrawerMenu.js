import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Toggle from '../Toggle';
import ChevronDown from '../../svgs/ChevronDown';
import ChevronRight from '../../svgs/ChevronRight';
import { Link } from 'react-router-dom';
import './DrawerMenu.css';

const DrawerMenu = props => {
  const { children, id, to, title, nest } = props;
  const ListItem = styled.li`
    padding: 0.5rem calc(0.5rem + (1rem * (${props => props.nest || 1}) / 1));
  `;
  const DrawerMenuChild = styled.div`
    max-height: ${props => (props.show ? '400vh' : '1px')};
  `;
  const getClassName = () =>
    nest === 1
      ? 'Drawer-Menu-Container Nest-1'
      : nest === 2
        ? 'Drawer-Menu-Container Nest-2'
        : 'Drawer-Menu-Container Nest-3';
  return (
    <Toggle>
      {({ show, toggle }) => (
        <div className={getClassName()}>
          <ListItem className="List-Item" key={id} nest={nest}>
            <button className="Arrow-Button" onClick={toggle}>
              {children && (show ? <ChevronDown /> : <ChevronRight />)}
            </button>
            <Link to={to} style={{ textDecoration: 'none' }}>
              {title}
            </Link>
          </ListItem>
          <DrawerMenuChild
            className="Drawer-Menu-Child"
            data-testid={`${id}-children`}
            show={show}
          >
            {children && children()}
          </DrawerMenuChild>
        </div>
      )}
    </Toggle>
  );
};

DrawerMenu.propTypes = {
  children: PropTypes.func,
  id: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  nest: PropTypes.number.isRequired,
};

export default DrawerMenu;
