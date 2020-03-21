import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../svgs/Menu';
import './Header.css';

const Header = ({ show, toggle }) => {
  return (
    <header className="Header" data-name="Header">
      {!show && (
        <div>
          <button
            onClick={toggle}
            style={{
              flexGrow: 0,
              cursor: 'pointer',
              margin: '.5rem',
              marginRight: 0,
              border: 0,
              background: 'transparent',
            }}
            data-testid="openSidebar"
          >
            <Menu />
          </button>
        </div>
      )}
      <div style={{ flexGrow: '1', marginTop: '2vh' }}>
        <Link
          style={{
            textDecoration: 'none',
            color: 'black',
            textAlign: 'center',
          }}
          to="/"
        >
          <h1 className="Logo">{`You Don't Know JS Exercises`}</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
