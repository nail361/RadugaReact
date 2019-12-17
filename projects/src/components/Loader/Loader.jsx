import React from 'react';
import PropTypes from 'prop-types';
import classes from './Loader.scss';

const Loader = (props) => {
  const { children } = props;
  return (
    <div className={classes.Loader}>
      <div className={classes.spinner}>
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
      <div className={classes.title}>{children}</div>
    </div>
  );
};

export default Loader;

Loader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Loader.defaultProps = {
  children: 'Загрузка...',
}
