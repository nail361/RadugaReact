import React, { PureComponent } from 'react';
import '../styles/Games.scss';

class Game1 extends PureComponent {
  render() {
    const icons = ['bird', 'animal', 'people', 'fish', 'dino', 'nfo'];

    return (
      <div className="game1-wrapper">
        <h2>Выберите кто населяет планету:</h2>
        <h3>Перенесите нужные иконки, из списка, на планету</h3>
        <div className="planet" />
        <div className="icons">
          {icons.map((icon) => <div key={icon} className={['icon', icon].join(' ')} />)}
        </div>
      </div>
    );
  }
}

export default Game1;
