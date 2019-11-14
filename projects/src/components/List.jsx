import React from 'react';
import PropTypes from 'prop-types';

class List extends React.Component {
  componentDidMount() {
  }

  render() {
    const { names } = this.props;
    return (
      <ul>
        {names.map((name) => <li key={name}>{name}</li>)}
      </ul>
    );
  }
}

export default List;

List.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string),
};

List.defaultProps = {
  names: [],
};
