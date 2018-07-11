import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Cesium from './pages/Cesium';
import Cad from './pages/Cad';
import CurrentData from './pages/CurrentData';
import Preamble from './pages/Preamble';
import IdleData from './pages/IdleData';
import Attitude from './pages/Attitude';
import FlashBurst from './pages/FlashBurst';
import FlashComparison from './pages/FlashComparison';
import LowPower from './pages/LowPower';
import PageNotFound from './pages/404';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Cesium}/>
          <Route exact path='/cad' component={Cad}/>
          <Route exact path='/data' component={CurrentData}/>
          <Route exact path='/data/preamble' component={Preamble}/>
          <Route exact path='/data/idle' component={IdleData}/>
          <Route exact path='/data/attitude' component={Attitude}/>
          <Route exact path='/data/flash-burst' component={FlashBurst}/>
          <Route exact path='/data/flash-comparison' component={FlashComparison}/>
          <Route exact path='/data/low-power' component={LowPower}/>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
