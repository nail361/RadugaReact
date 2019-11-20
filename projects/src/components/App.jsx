import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Game1 from './Game1';
import Game2 from './Game2';

import '../styles/App.scss';
import '../styles/reset.css';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      gameId: 2,
      showError: false,
      showComplete: false,
    };

    this.game = React.createRef();

    this.onAnswerClick = this.onAnswerClick.bind(this);
    this.showErrorMsg = this.showErrorMsg.bind(this);
  }

  onAnswerClick() {
    const isCorrect = this.game.current.checkAnswer();
    if (isCorrect) {
      this.showCompleteMsg();
    } else {
      this.showErrorMsg();
    }
  }

  showCompleteMsg() {
    this.setState({
      showComplete: true,
    });

    setTimeout(() => {
      this.setState({
        showComplete: false,
      });
      this.nextGame();
    }, 2000);
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
    const { gameId, showError, showComplete } = this.state;
    const components = {
      game1: Game1,
      game2: Game2,
    };

    let resultText = '';
    let resultClass = '';
    if (showError) {
      resultText = <span>Ошибка<br />попробуй ещё раз</span>;
      resultClass = 'error';
    } else if (showComplete) {
      resultText = <span>Отлично!<br />задание пройдено</span>;
      resultClass = 'complete';
    }

    const Game = components[`game${gameId}`];

    return (
      <div>
        {(showError || showComplete) && (
          <div className="result-modal">
            <div className={['result-window', resultClass].join(' ')}>
              {resultText}
            </div>
          </div>
        )}
        {(gameId === 1) && (
          <h1>Привет {name}!</h1>
        )}
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
