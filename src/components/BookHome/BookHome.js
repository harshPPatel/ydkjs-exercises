import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './BookHome.css';

class BookHome extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
  };
  render() {
    const { book } = this.props;

    return (
      <ul className="Book-Home-List">
        {book.chapters.map(chapter => (
          <li className="Book-Home-List-Item" key={book.id + chapter.url}>
            <Link
              to={book.url + chapter.url}
              style={{
                textDecoration: 'none',
                color: '#000',
              }}
            >
              {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default BookHome;
