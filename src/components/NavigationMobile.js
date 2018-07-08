import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../assets/NavigationMobile.css';

import logo from '../assets/images/bse_white.png';
import satLogo from '../assets/images/sat_logo.png';
import facebook from '../assets/images/facebook.png';
import twitter from '../assets/images/twitter.png';
import github from '../assets/images/github.png';
import mail from '../assets/images/mail.png';


class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      settings: false,
    };

    this.toggleSettings = this.toggleSettings.bind(this);
  }

  toggleSettings(bool) {
    return () => {
      console.log("A");
      this.setState({
        settings: bool,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.settings &&
          <div>
            <div className="socialModalOverlay" onClick={this.toggleSettings(false)}></div>
            <div className="socialModal">
              <a href="https://www.facebook.com/browncubesat" target="_blank" rel="noopener noreferrer">
                <img src={facebook} width="35px" height="35px" alt="fb"/></a>
              <a href="https://www.twitter.com/browncubesat" target="_blank" rel="noopener noreferrer">
                <img src={twitter} width="35px" height="35px" alt="tw"/></a>
              <a href="https://www.github.com/BrownSpaceEngineering" target="_blank" rel="noopener noreferrer">
                <img src={github} width="35px" height="35px" alt="gh"/></a>
              <a href="mailto:bse@brown.edu" target="_blank" rel="noopener noreferrer">
                <img src={mail} width="35px" height="35px" alt="mail"/></a>
              <a href="http://www.brownspace.org/equisat" target="_blank" rel="noopener noreferrer">
                <img src={satLogo} alt="equisat" className="satLogo" />
              </a>
            </div>
          </div>
        }
        <div className="navigationMobile">
          <div className="logos">
            <a href="http://www.brownspace.org" target="_blank" rel="noopener noreferrer">
              <img src={logo} alt="logo" className="bseLogo" />
            </a>
          </div>
          <div className="links">
            <Link to="/" className={this.props.active === 'missioncontrol' ? 'active' : ''}>Map</Link>
            <Link to="/cad" className={this.props.active === 'cad' ? 'active' : ''}>CAD</Link>
            <Link to="/data" className={this.props.active === 'data' ? 'active' : ''}>Data</Link>
          </div>
          <div className="social">
            <i className="fas fa-cog settings" onClick={this.toggleSettings(!this.state.settings)}></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
