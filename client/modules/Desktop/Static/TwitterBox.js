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
        <h3>Twitter Feed</h3>
        {this.state.tweets &&
          this.state.tweets.map((each) => {
            return (
              <div key={each.id} className={style.tweet}>o
                <img src={each.user.profile_image_url_https} alt="profile" className={style.profile_image} />
                <div className={style.username}><p>{each.user.name}&nbsp; &nbsp;@{each.user.screen_name}</p></div>
                <div className={style.text}>{each.text}</div>
              </div>
            );
          })
        }
      </div>
    );
  }

}

export default TwitterBox;
