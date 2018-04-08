import React, { Component } from 'react';

import { Button } from 'reactstrap';

import style from './TestPage.css';


class TestPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const newCounter = this.state.counter + 1;
    this.setState({
      counter: newCounter,
    });
  }

  render() {
    return (
      <div>
        <iframe src="https://myhub.autodesk360.com/ue2aaba84/shares/public/SH7f1edQT22b515c761e08a6bec09be6c898?mode=embed" 
        width="800" height="600" allowfullscreen="true" webkitallowfullscreen="true" 
        mozallowfullscreen="true"  frameborder="0"></iframe>  
      </div>
    );
  }

}

export default TestPage;
