import React, { Component } from 'react';

import style from './TwitterBox.css';
import { getTweets } from '../../../actions/ContentActions';

class TwitterBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    };
  }

  componentDidMount() {
    getTweets((result) => {
      this.setState({
        tweets: result.data,
      });
    });
  }

  render() {
    return (
      <div className={style.twitterBox}>
        {this.state.tweets.length > 0 &&
          this.state.tweets.map((each) => {
            return (
              <div key={each.id}>
                {each.text}
                <br />
                ---------------
              </div>
            );
          })
        }
      </div>
    );
  }

}

export default TwitterBox;
