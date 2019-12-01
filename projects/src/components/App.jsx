import React, { PureComponent, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/GameActions';
import Modal from './Modal';
import '../styles/App.scss';

import { sendCompleteData } from '../utils/help';

const Game1 = React.lazy(() => import('./Game1'));
const Game2 = React.lazy(() => import('./Game2'));
const Game3 = React.lazy(() => import('./Game3'));

const modalRoot = document.getElementById('modal-root');

const components = [
  Game1,
  Game2,
  Game3,
];

export const Game = (gameId, gameRef, nextGame) => {
  const GameComponent = components[gameId];
  return <GameComponent ref={gameRef} nextGame={nextGame} />;
};

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <div className="loader-title">Загрузка...</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gameId: state.gameId,
  };
};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showError: false,
      showComplete: false,
      endGame: false,
    };

    this.game = React.createRef();

    this.onAnswerClick = this.onAnswerClick.bind(this);
    this.showErrorMsg = this.showErrorMsg.bind(this);
  }

  componentDidMount() {
    // useDispatch(actions.resetGame);
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
    // const gameId = useSelector((state) => state.gameId);
    const { gameId } = this.props;

    if ((gameId + 1) >= components.length) {
      this.endGame();
    } else {
      this.props.nextGame();
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
    const { name, gameId } = this.props;
    // const gameId = 0;//useSelector((state) => state.gameId);
    const {
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

    return (
      <div>
        {(showError || showComplete)
          && ReactDOM.createPortal(
            <Modal>
              <div className={`result-window ${resultClass}`}>
                {resultText}
              </div>
            </Modal>,
            modalRoot,
          )}
        {endGame
          && ReactDOM.createPortal(
            <Modal>
              <div className="end-game-window">
                Поздравляем!<br />
                вы прошли все задания.<br />
                Можно приступать к следующей теме.
              </div>
            </Modal>,
            modalRoot,
          )}
        {(gameId === 1) && (
          <h1>Привет {name}!</h1>
        )}
        <div className="games-wrapper">
          <Suspense fallback={<Loader />}>
            {Game(gameId, this.game, this.nextGame)}
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

export default connect(
  mapStateToProps,
  actions,
)(App);
// export default App;

App.propTypes = {
  name: PropTypes.string,
};

App.defaultProps = {
  name: 'дружок',
};
