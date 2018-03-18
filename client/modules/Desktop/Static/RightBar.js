import React, { Component } from 'react';

import style from './CesiumPage.css';

class RightBar extends Component {
  render() {
    return (
      <div className={style.rightBar}>
        <h2>TEMPERATURE< /h2>
        <h1>XX< /h1>
        <br />
        <h2>ALTITUDE</h2>
        <h1>XX< /h1>
        <br />
        <h2>COORDINATES< /h2>
        <h1>XX< /h1>
        <h1>XX< /h1>
        <div className={style.copyright}>
          <p>&copy; BSE 2018 < /p>
        < /div>
      < /div>
    );
  }
}

export default RightBar;
