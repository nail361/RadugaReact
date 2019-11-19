import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Game1 from './Game1';

import '../styles/App.scss';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      gameId: 1,
      showError: false,
    };

    this.game = React.createRef();

    this.onAnswerClick = this.onAnswerClick.bind(this);
    this.showErrorMsg = this.showErrorMsg.bind(this);
  }

  onAnswerClick() {
    const isCorrect = this.game.current.checkAnswer();
    if (isCorrect) {
      //do smth
    } else {
      this.showErrorMsg();
    }
  }

  showErrorMsg() {
    this.setState({
      showError: true,
    });

    setTimeout(() => {
      this.setState({
        showError: false,
      });
      this.game.current.replay();
    }, 2000);
  }

  nextGame() {
    const { gameId } = this.state;
    this.setState({ gameId: gameId + 1 });
  }

  render() {
    const { name } = this.props;
    const { gameId, showError } = this.state;
    const components = {
      game1: Game1,
    };

    const Game = components[`game${gameId}`];

    return (
      <div>
        {showError && (
          <div className="error-modal">
            <div className="error-window">
              <span>Ошибка, попробуй ещё раз :)</span>
            </div>
          </div>
        )}
        <h1>Привет {name}!</h1>
        <div className="games-wrapper">
          <Game ref={this.game} nextGame={this.nextGame} />
        </div>
        <footer className="footer">
          <button
            className="answer-btn"
            type="button"
            onClick={this.onAnswerClick}
          >
            Ответить
          </button>
        </footer>
      </div>
    );
  }
}

export default App;

App.propTypes = {
  name: PropTypes.string,
};

App.defaultProps = {
  name: 'дружок',
};
