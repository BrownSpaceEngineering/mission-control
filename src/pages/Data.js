import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import Navigation from '../components/Navigation';
import NavigationMobile from '../components/NavigationMobile';
import '../assets/Data.css';

class DataPage extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="cadPage">
        <MediaQuery query="(min-width: 769px)">
            <Navigation active='data' />
          </MediaQuery>
          <MediaQuery query="(max-width: 769px)">
            <NavigationMobile active='data' />
          </MediaQuery>
        Hello.
      </div>
    );
  }
}

export default DataPage;
