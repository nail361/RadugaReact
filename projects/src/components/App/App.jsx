import React, { PureComponent, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import API from '../../utils/API';
import * as actions from '../../actions/GameActions';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import classes from './App.scss';
import modalClasses from '../Modal/Modal.scss';

import { sendCompleteData } from '../../utils/help';

const Game1 = React.lazy(() => import('../Game1/Game1'));
const Game2 = React.lazy(() => import('../Game2/Game2'));
const Game3 = React.lazy(() => import('../Game3/Game3'));

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
      isLoading: true,
      name: 'дружок',
      endGame: false,
    };

    this.game = React.createRef();

    this.onAnswerClick = this.onAnswerClick.bind(this);
    this.showErrorMsg = this.showErrorMsg.bind(this);
  }

  componentDidMount() {
      API.get('/', {
        params: {
          inc: 'name',
        },
      }).then( (userData) => {
        const { name } = userData.data.results[0];
        this.setState({
          isLoading: false,
          name,
        });
      }).catch( (eror) => {
        console.log(`😱 Axios request failed: ${eror}`);
        this.setState({
          isLoading: false,
        });
      });
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
    const { gameId, nextGame } = this.props;

    if ((gameId + 1) >= components.length) {
      this.endGame();
    } else {
      nextGame();
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
    const { gameId } = this.props;
    const { name, isLoading } = this.state;

    const {
      showError,
      showComplete,
      endGame,
    } = this.state;

    let resultText = '';
    let resultClass = '';
    if (showError) {
      resultText = <span>Ошибка<br />попробуй ещё раз</span>;
      resultClass = modalClasses.error;
    } else if (showComplete) {
      resultText = <span>Отлично!<br />задание пройдено</span>;
      resultClass = modalClasses.complete;
    }

    return (
      <div>
        {(showError || showComplete)
          && ReactDOM.createPortal(
            <Modal>
              <div className={`${modalClasses.resultWindow} ${resultClass}`}>
                {resultText}
              </div>
            </Modal>,
            modalRoot,
          )}
        {endGame
          && ReactDOM.createPortal(
            <Modal>
              <div className={modalClasses.resultWindow}>
                <p style={{ fontSize: '22px', margin: '5px' }}>Поздравляем!</p>
                <p>Вы прошли все задания,<br />можно приступать к следующей теме.</p>
              </div>
            </Modal>,
            modalRoot,
          )}
        {((gameId === 0) && !isLoading) && (
          <h1>Привет {name}!</h1>
        )}
        <div className={classes.Games}>
          <Suspense fallback={<Loader />}>
            {Game(gameId, this.game, this.nextGame)}
          </Suspense>
        </div>
        <footer className={classes.Footer}>
          <button
            className={classes.AnswerBtn}
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

App.propTypes = {
  gameId: PropTypes.number.isRequired,
  nextGame: PropTypes.func.isRequired,
};
