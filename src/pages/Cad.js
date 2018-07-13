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
          src="https://myhub.autodesk360.com/ue2d9e293/shares/public/SHabee1QT1a327cf2b7a9907ea329c429482?mode=embed"
          allowFullScreen="true"
          title="cadFrame"
        >
        </iframe>
      </div>
    );
  }
}

export default CadPage;
