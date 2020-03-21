import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  };
  render() {
    const { books } = this.props;
    return (
      <ul className="Home-List">
        {books.map(book => (
          <Link
            key={book.id}
            data-testid={book.id}
            style={{ textDecoration: 'none' }}
            to={book.url}
          >
            <li className="List-Item">{book.title}</li>
          </Link>
        ))}
      </ul>
    );
  }
}

export default Home;
