import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './Button.scss';

class Button extends React.Component {

  constructor(props) {
    super(props);
  }

  renderIcon = () => {
    if (this.props.hasIcon) {
      return (
        <span className={classNames(
              'glyphicon',
              this.props.hasIcon,
              styles.btnIcon
            )}
            aria-hidden="true">
        </span>
      );
    }
  }

  render() {
    return(
      <button
          className={classNames(
              'btn',
              this.props.type ? 'btn-'+this.props.type : 'btn-primary',
              styles.button,
              this.props.className
          )}
          onClick={this.props.onClick}
          disabled={this.props.disabled}>
        { this.renderIcon() }
        { this.props.children }
      </button>
    );
  }
}

export { Button };
export default Button;
