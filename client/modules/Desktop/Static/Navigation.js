import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './Navigation.css';

import logo from '../../../../public/images/bse_white.png';

class Navigation extends Component {
  render() {
    return (
      <div className={style.navigation}>
        <div className={style.logo}>
          <img src={logo} width="35px" height="35px" alt="logo" />
        </div>
        <div className={style.links}>
          <Link to="/" className={style.active}>Mission Control</Link>
          <Link to="/cad">CAD</Link>
          <Link to="/data">Data</Link>
        </div>
        <div className={style.social}>
          social media here
        </div>
      </div>
    );
  }
}

export default Navigation;
