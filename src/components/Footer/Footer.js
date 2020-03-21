import React, { Component } from 'react';

import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="Footer" data-name="Footer">
        <p>
          YDKJS Exercises is created and maintained by learners like you! To
          take a look at the source code or contribute to the project, check out
          the repository at
          <a href="https://github.com/austintackaberry/ydkjs-exercises">
            {' '}
            ydkjs-exercises (Open in new window)
          </a>
        </p>
      </footer>
    );
  }
}

export default Footer;
