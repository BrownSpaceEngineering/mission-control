import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import Navigation from './Navigation';
import NavigationMobile from './NavigationMobile';
import '../assets/Cad.css';
import Redirect from 'react-router-dom/Redirect';

class CadDownloadButton extends Component {
  constructor(props) {
    super(props);
    this.state={
      color: "Red"
    }
    this.clickbutton = this.clickbutton.bind(this);
  }
  clickbutton () {
    this.setState({
      color: "Green"
    });
  }
  render() {
    return (
        <button className={`CadDownloadButtom ${this.state.color}`} onClick={this.clickbutton}><a href="https://www.google.com">Testing</a></button>
    );
  }
}

export default CadDownloadButton;
