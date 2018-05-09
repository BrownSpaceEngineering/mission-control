import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './Navigation.css';

import logo from '../../../../public/images/bse_white.png';
import facebook from '../../../../public/images/facebook.png';
import twitter from '../../../../public/images/twitter.png';
import github from '../../../../public/images/github.png';
import mail from '../../../../public/images/mail.png';


class Navigation extends Component {
  render() {
    return (
      <div className={style.navigation}>
        <div className={style.logo}>
          <Link to="http://www.brownspace.org" target="_blank">
          <img src={logo} width="35px" height="35px" alt="logo" /></Link>
        </div>
        <div className={style.links}>
          <Link to="/" className={this.props.active === 'missioncontrol' ? style.active : ''}>Mission Control</Link>
          <Link to="/cad" className={this.props.active === 'cad' ? style.active : ''}>CAD</Link>
          <Link to="/data" className={this.props.active === 'data' ? style.active : ''}>Data</Link>
        </div>
        <div className={style.social}>
          <Link to="https://www.facebook.com/browncubesat" target="_blank">
            <img src={facebook} width="35px" height="35px" alt="fb"/></Link>
          <Link to="https://www.twitter.com/browncubesat" target="_blank">
            <img src={twitter} width="35px" height="35px" alt="tw"/></Link>
          <Link to="https://www.github.com/BrownSpaceEngineering" target="_blank">
            <img src={github} width="35px" height="35px" alt="gh"/></Link>
          <Link to="mailto:bse@brown.edu" target="_blank">
            <img src={mail} width="35px" height="35px" alt="mail"/></Link>
        </div>
      </div>
    );
  }
}

export default Navigation;
