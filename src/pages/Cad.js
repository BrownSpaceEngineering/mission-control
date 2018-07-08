import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import Navigation from '../components/Navigation';
import NavigationMobile from '../components/NavigationMobile';
import '../assets/Cad.css';

class CadPage extends Component {
  render() {
    return (
      <div className="cadPage">
        <MediaQuery query="(min-width: 769px)">
            <Navigation active='cad' />
          </MediaQuery>
          <MediaQuery query="(max-width: 769px)">
            <NavigationMobile active='cad' />
          </MediaQuery>
        <iframe
          className="cadFrame"
          src="https://myhub.autodesk360.com/ue2aaba84/shares/public/SH7f1edQT22b515c761e08a6bec09be6c898?mode=embed"
          allowFullScreen="true"
        >
        </iframe>
      </div>
    );
  }
}

export default CadPage;
