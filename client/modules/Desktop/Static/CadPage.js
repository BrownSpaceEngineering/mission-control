import React, { Component } from 'react';

import Navigation from './Navigation.js';
import style from './CadPage.css';


class CadPage extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <iframe
          className={style.cadFrame}
          src="https://myhub.autodesk360.com/ue2aaba84/shares/public/SH7f1edQT22b515c761e08a6bec09be6c898?mode=embed"
          allowFullScreen="true"
        >
        </iframe>
      </div>
    );
  }

}

export default CadPage;
