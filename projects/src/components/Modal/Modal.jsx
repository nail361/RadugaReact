import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.scss';

class Modal extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className={classes.Modal}>
        {children}
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
