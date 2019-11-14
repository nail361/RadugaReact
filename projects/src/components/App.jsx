import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Game1 from './Game1';

import '../styles/App.scss';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { gameId: 1 };
  }

  nextGame() {
    const { gameId } = this.state;
    this.setState({ gameId: gameId + 1 });
  }

  render() {
    const { name } = this.props;
    const { gameId } = this.state;
    const components = {
      game1: Game1,
    };

    const Game = components[`game${gameId}`];

    return (
      <div>
        <h1>Привет {name}!</h1>
        <div className="games-wrapper">
          <Game nextGame={this.nextGame} />
        </div>
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
