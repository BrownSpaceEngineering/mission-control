import React, { Component } from 'react';

import style from './CesiumPage.css';

import logo from '../../../../public/images/bse_blue.png';

class Navigation extends Component {
  render() {
    return (
      <div className={style.navigation}>
        <a href="localhost:3000/cesium" className={style.active}>Mission Control</a>
        <img className={style.logo} src={logo} height="40px" width="40px" alt="logo" />
        <a href="localhost:3000/cad">CAD</a>
        <a href="localhost:3000/data">Data</a>
      </div>
    );
  }
}

export default Navigation;
