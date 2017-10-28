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
        {this.state.tweets &&
          this.state.tweets.map((each) => {
            console.log(each.user.profile_image_url_https);
            return (
              <div key={each.id}>
                <img src={each.user.profile_image_url_https} alt="profile" className="profile_image" />
                <div className="username"><p>{each.user.name} @{each.user.screen_name}</p></div>
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
