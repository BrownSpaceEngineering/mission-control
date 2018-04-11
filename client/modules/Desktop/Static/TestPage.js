import React, { Component } from 'react';
import { Button } from 'reactstrap';
//import { VictoryBar } from 'victory';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLine, VictoryScatter, VictoryStack, VictoryArea } from 'victory';

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
              <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryBar data={data} x="quarter" y="earnings" />
              </VictoryChart>
      </div>
    );
  }

}

export default TestPage;
