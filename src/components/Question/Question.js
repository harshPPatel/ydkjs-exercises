import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import CodeBlock from '../markdown-renderers/CodeBlock';
import CodeInline from '../markdown-renderers/CodeInline';
import Root from '../markdown-renderers/Root';
import Paragraph from '../markdown-renderers/Paragraph';
import { getNewScore } from '../../helpers/helpers';

import './Question.css';

export class Question extends Component {
  static propTypes = {
    baseUrl: PropTypes.string.isRequired,
    bookId: PropTypes.number.isRequired,
    chapterId: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    numberOfQuestions: PropTypes.number.isRequired,
    question: PropTypes.shape({
      question: PropTypes.string.isRequired,
      questionId: PropTypes.string.isRequired,
      shouldBeRandomized: PropTypes.bool.isRequired,
      answers: PropTypes.array.isRequired,
      correctAnswerId: PropTypes.number.isRequired,
      moreInfoUrl: PropTypes.string.isRequired,
      explanation: PropTypes.string.isRequired,
    }).isRequired,
    score: PropTypes.object.isRequired,
    updateScore: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      userAnswerId: null,
      answerSubmitted: false,
      error: false,
      correctAnswer: null,
      explanationRequested: false,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  calcNewScore(isCorrect) {
    const { updateScore, score, bookId, chapterId, index } = this.props;
    const questionIndex = index - 1;

    // Check if current question was already answered correctly
    const prevStatus =
      score.books[bookId].chapters[chapterId].questions[questionIndex].status;

    const newScore = getNewScore({
      prevStatus,
      isCorrect,
      score,
      bookId,
      chapterId,
      questionIndex,
    });

    updateScore(newScore);
  }

  handleSubmit(event) {
    const { question } = this.props;
    const { userAnswerId } = this.state;
    const currentAnswer = question.answers.find(a => a.id == userAnswerId);

    // User did not select an answer
    if (userAnswerId === null) {
      this.setState({
        error: true,
      });
    } else {
      const userAnswerIsCorrect = question.correctAnswerId === currentAnswer.id;
      this.setState({
        answerSubmitted: true,
        error: false,
        correctAnswer: userAnswerIsCorrect,
      });
      this.calcNewScore(userAnswerIsCorrect);
    }

    event.preventDefault();
  }

  handleAnswerChange(event) {
    this.setState({
      userAnswerId: event.target.value,
      answerSubmitted: null,
      correctAnswer: null,
    });
  }

  handleKeyDown(event) {
    const { question, history } = this.props;
    const actions = {
      ArrowLeft: question.prevUrl,
      ArrowRight: question.nextUrl,
    };

    const url = actions[event.key];
    if (url) {
      history.push(url);
    }
  }

  toggleExplanationRequest() {
    this.setState({
      explanationRequested: !this.state.explanationRequested,
    });
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { question, numberOfQuestions, index } = this.props;
    const {
      answerSubmitted,
      userAnswerId,
      explanationRequested,
      error,
      correctAnswer,
    } = this.state;

    let message;
    if (error) {
      message = 'Please select an answer';
    } else if (correctAnswer) {
      message = 'Correct!';
    } else if (correctAnswer === false) {
      // not undefined
      message = 'Incorrect! Try Again!';
    }

    return (
      <React.Fragment>
        <div className="Question-Wrapper">
          <h3 className="Question-Header">{`Question ${index} of ${numberOfQuestions}`}</h3>
          <h4 className="Question" data-testid="question">
            <ReactMarkdown
              renderers={{
                code: CodeBlock,
                inlineCode: CodeInline,
              }}
              source={question.question}
            />
          </h4>
          <form onSubmit={event => this.handleSubmit(event)}>
            <fieldset className="Answer-Fieldset">
              {question.answers.map((answer, i) => {
                let answerColor;
                if (answerSubmitted) {
                  if (
                    userAnswerId == answer.id &&
                    question.correctAnswerId === answer.id
                  ) {
                    answerColor = { color: 'green' };
                  }
                  if (
                    userAnswerId == answer.id &&
                    !(question.correctAnswerId === answer.id)
                  ) {
                    answerColor = { color: 'red' };
                  }
                }
                return (
                  <div key={answer.id} data-testid="answer">
                    <label
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: '3px 0',
                      }}
                      htmlFor={i}
                    >
                      <div>
                        <input
                          type="radio"
                          name={index}
                          id={i}
                          value={answer.id}
                          data-testid={`answer-${answer.id}`}
                          onChange={event => {
                            this.handleAnswerChange(event);
                          }}
                        />
                      </div>
                      <span style={answerColor}>
                        <ReactMarkdown
                          renderers={{
                            code: CodeBlock,
                            inlineCode: CodeInline,
                            root: Root,
                            paragraph: Paragraph,
                          }}
                          source={answer.text}
                        />
                      </span>
                    </label>
                  </div>
                );
              })}
            </fieldset>
            <button className="Submit-Button" type="submit">
              Submit
            </button>
            {answerSubmitted &&
              explanationRequested && (
                <div>
                  <button
                    className="explanationButton"
                    onClick={event => this.toggleExplanationRequest()}
                    style={{ margin: '4px auto' }}
                  >
                    Hide Explanation
                  </button>
                  <div className="explanation" data-testid="explanation">
                    <ReactMarkdown
                      renderers={{
                        code: CodeBlock,
                        inlineCode: CodeInline,
                      }}
                      source={question.explanation}
                    />
                    <br />
                    <a
                      href={question.moreInfoUrl}
                      target="_blank"
                      style={{ textDecoration: 'underline', color: 'black' }}
                    >
                      More information here
                    </a>
                  </div>
                </div>
              )}

            {answerSubmitted &&
              !explanationRequested && (
                <button
                  className="explanationButton"
                  onClick={event => this.toggleExplanationRequest()}
                  style={{ margin: '4px auto' }}
                >
                  Show Explanation
                </button>
              )}
          </form>
          <div className="Message-Wrapper">{message}</div>
        </div>

        <section className="Section">
          {question.prevUrl ? (
            <Link to={question.prevUrl}>
              <button className="Flat-Button" disabled={false}>
                {question.prevButtonLabel}
              </button>
            </Link>
          ) : (
            <button className="Flat-Button" disabled={true}>
              {question.prevButtonLabel}
            </button>
          )}
          <Link to={question.nextUrl}>
            <button className="Flat-Button" disabled={false}>
              {question.nextButtonLabel}
            </button>
          </Link>
        </section>
      </React.Fragment>
    );
  }
}

const QuestionWithRouter = withRouter(Question);
export default QuestionWithRouter;
