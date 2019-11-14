import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import '../styles/App.css';

class App extends PureComponent {
  render() {
    const { name } = this.props;
    return (
      <div>
        <h1>My React App! {name}</h1>
      </div>
    );
  }
}

export default App;


App.propTypes = {
  name: PropTypes.string,
};

App.defaultProps = {
  name: 'john',
};
