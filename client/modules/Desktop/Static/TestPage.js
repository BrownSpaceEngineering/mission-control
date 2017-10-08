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
        <h1>The counter is {this.state.counter}.</h1>
        <Button color="primary" className={style.counterButton} onClick={this.handleClick}>
          Increment
        </Button>
      </div>
    );
  }

}

export default TestPage;
