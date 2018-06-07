import React, { Component } from 'react';

import Navigation from '../components/Navigation';
import '../assets/Cad.css';

class CadPage extends Component {
  render() {
    return (
      <div className="cadPage">
        <Navigation active='cad' />
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
