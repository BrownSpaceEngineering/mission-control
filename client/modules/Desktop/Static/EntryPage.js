import React, { Component } from 'react';
import TestComponent from './TestComponent';
import TwitterBox from './TwitterBox'


class EntryPage extends Component {

  render() {
    return (
      <div>
        Hi
        <TestComponent />
        <TwitterBox />
      </div>
    );
  }

}

export default EntryPage;
