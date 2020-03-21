import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import BookRouter from './components/BookRouter';
import Home from './components/Home';
import Toggle from './components/Toggle';
import Sidebar from './components/Sidebar';
import rawBooks from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import NoMatch from './components/NoMatch';
import ResetModal from './components/ResetModal';
import { Switch, Route } from 'react-router-dom';
import { mergeScores, initializeBooks } from './helpers/helpers';

import { ScoreContext, score } from './score-context';
const books = initializeBooks(rawBooks);

const AppGrid = styled.div`
  overflow-y: ${props =>
    props.shouldShowSidebar && props.isNarrowScreen ? 'hidden' : 'scroll'};

  &:before {
    opacity: ${props =>
      props.shouldShowSidebar && props.isNarrowScreen ? 1 : 0};
    z-index: ${props =>
      props.shouldShowSidebar && props.isNarrowScreen ? 10 : -1};
  }
`;

class App extends Component {
  constructor() {
    super();

    const isNarrowScreen = window.innerHeight > window.innerWidth;
    // updateScore needs to be defined here, not in score-context.js
    // because it needs to setState
    this.updateScore = newScore => {
      window.localStorage.setItem('score', JSON.stringify(newScore));
      this.setState({ score: newScore });
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleShowReset = this.handleShowReset.bind(this);

    this.state = {
      score,
      isNarrowScreen,
      showInstallBtn: false,
      showReset: false,
    };
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    let lsScore = window.localStorage.getItem('score');
    let { score } = this.state;
    if (lsScore) {
      lsScore = JSON.parse(lsScore);
      score = mergeScores({
        lsScore,
        newScore: this.state.score,
      });
    }
    this.setState({ score });
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  };

  handleResize() {
    this.setState({
      isNarrowScreen: window.innerHeight > window.innerWidth,
    });
  }

  handleShowReset() {
    const { showReset } = this.state;
    this.setState({
      showReset: !showReset,
    });
  }

  render() {
    return (
      <ScoreContext.Provider
        value={{ score: this.state.score, updateScore: this.updateScore }}
      >
        <Toggle show={!this.state.isNarrowScreen}>
          {({ show, toggle }) => (
            <AppGrid
              className="App-Grid"
              data-name="App"
              isNarrowScreen={this.state.isNarrowScreen}
              shouldShowSidebar={show}
              onClick={e => {
                e.target.dataset.name === 'App' &&
                  this.state.isNarrowScreen &&
                  show &&
                  toggle();
              }}
            >
              {this.state.showReset && (
                <ResetModal
                  handleShowReset={this.handleShowReset}
                  updateScore={this.updateScore}
                  score={this.state.score}
                />
              )}
              <Sidebar
                data-name="Sidebar"
                books={books}
                score={this.state.score}
                updateScore={this.updateScore}
                handleShowReset={this.handleShowReset}
                isNarrowScreen={this.state.isNarrowScreen}
                shouldShow={show}
                onMenuClick={toggle}
              />
              <Header show={show} toggle={toggle} />
              <div className="Main-Content-Grid-Child" data-name="Main">
                <Switch>
                  <Route exact path="/" render={() => <Home books={books} />} />
                  {books.map((book, index) => {
                    book.id = index;
                    return (
                      <Route
                        key={index}
                        path={book.url}
                        render={() => <BookRouter book={book} />}
                      />
                    );
                  })}
                  <Route component={NoMatch} />
                </Switch>
              </div>
              <Footer />
            </AppGrid>
          )}
        </Toggle>
      </ScoreContext.Provider>
    );
  }
}

export default App;
