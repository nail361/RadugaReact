import React from 'react';
import PropTypes from 'prop-types';

class Guests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isGoing: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const { target, name } = event;
    const { onGuestsChange } = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (name === 'isGoing') {
      this.setState(
        {
          [name]: value,
        },
      );
    } else if (name === 'guestsNumber') {
      onGuestsChange(value);
    }
  }

  render() {
    const { guestsNumber } = this.props;
    const { isGoing } = this.state;

    return (
      <form>
        <label htmlFor="isGoing">
          Пойду:
          <input
            name="isGoing"
            type="checkbox"
            checked={isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label htmlFor="guestsNumber">
          Количество гостей:
          <input
            name="guestsNumber"
            type="number"
            value={guestsNumber}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}

export default Guests;

Guests.propTypes = {
  onGuestsChange: PropTypes.func,
  guestsNumber: PropTypes.number,
};

Guests.defaultProps = {
  onGuestsChange: () => null,
  guestsNumber: 0,
};
