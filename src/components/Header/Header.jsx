import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import aceLogo from'../../data/ace-ticket-logo.png';
import styles from './Header.scss';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={styles.header}>
        <div className={styles.container}>
          <img src={aceLogo} className={styles.logo} alt="Ace Tickets"/>
          <div className={styles.pageTitle}>Order History</div>
          <img src={aceLogo} className={styles.dummy} />
        </div>
      </div>
    );
  }
}

export { Header };
export default Header;
