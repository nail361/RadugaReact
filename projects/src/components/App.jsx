import React, { PureComponent, Suspense } from 'react';
import PropTypes from 'prop-types';
import '../styles/App.scss';
import '../styles/reset.css';

import { sendCompleteData } from '../plugins/help';

const Game1 = React.lazy(() => import('./Game1'));
const Game2 = React.lazy(() => import('./Game2'));
const Game3 = React.lazy(() => import('./Game3'));

const components = [
  Game1,
  Game2,
  Game3,
];

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      gameId: 0,
      showError: false,
      showComplete: false,
      endGame: false,
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

    if ((gameId + 1) >= components.length) {
      this.endGame();
    } else {
      this.setState({ gameId: gameId + 1 });
    }
  }

  endGame() {
    this.setState({
      endGame: true,
    });
    sendCompleteData('game-1-1')
      .then((data) => console.log(JSON.stringify(data)))
      .catch((error) => console.error(error));
  }

  render() {
    const { name } = this.props;
    const {
      gameId,
      showError,
      showComplete,
      endGame,
    } = this.state;

    let resultText = '';
    let resultClass = '';
    if (showError) {
      resultText = <span>Ошибка<br />попробуй ещё раз</span>;
      resultClass = 'error';
    } else if (showComplete) {
      resultText = <span>Отлично!<br />задание пройдено</span>;
      resultClass = 'complete';
    }

    const Game = components[gameId];

    return (
      <div>
        {(showError || showComplete) && (
          <div className="result-modal">
            <div className={`result-window ${resultClass}`}>
              {resultText}
            </div>
          </div>
        )}
        {endGame && (
          <div className="end-game-modal">
            <div className="end-game-window">
              Поздравляем!<br />
              вы прошли все задания.<br />
              Можно приступать к следующей теме.
            </div>
          </div>
        )}
        {(gameId === 1) && (
          <h1>Привет {name}!</h1>
        )}
        <div className="games-wrapper">
          <Suspense fallback={<div>ЗАГРУЗКА...</div>}>
            <Game ref={this.game} nextGame={this.nextGame} />
          </Suspense>
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
