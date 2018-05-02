import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './CesiumPage.css';

import logo from '../../../../public/images/bse_blue.png';

class Navigation extends Component {
  render() {
    return (
      <div className={style.navigation}>
        <Link to="/" className={style.active}>Mission Control</Link>
        <img className={style.logo} src={logo} height="40px" width="40px" alt="logo" />
        <Link to="/cad">CAD</Link>
        <Link to="/data">Data</Link>
      </div>
    );
  }
}

export default Navigation;
