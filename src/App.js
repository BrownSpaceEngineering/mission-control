import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Cesium from './pages/Cesium';
import Cad from './pages/Cad';
import CurrentData from './pages/CurrentData';
import HistoricalData from './pages/HistoricalData';
import HistoricalDataAdvanced from './pages/HistoricalDataAdvanced';
import PageNotFound from './pages/404';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Cesium}/>
          <Route exact path='/cad' component={Cad}/>
          <Route exact path='/data' component={CurrentData}/>
          <Route exact path='/data/historical' component={HistoricalData}/>
          <Route exact path='/data/historical/advanced' component={HistoricalDataAdvanced}/>
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
