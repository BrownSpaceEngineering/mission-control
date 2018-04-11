import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { VictoryBar } from 'victory';

import style from './TestPage.css';


const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

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
        <VictoryBar
          data={data}
          // data accessor for x values
          x="quarter"
          // data accessor for y values
          y="earnings"
        />
      </div>
    );
  }

}

export default TestPage;
