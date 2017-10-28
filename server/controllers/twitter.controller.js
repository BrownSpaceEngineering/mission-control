import Twit from 'twitter';

// The keys and tokens were given to me by twitter
const twitter = new Twit({
  consumer_key: 'cjll8FnPGIrKXmd6eihpmEa1x',
  consumer_secret: 'fjt8HFJDAzlNFlSqXLMGSgQIKSqjRU1JcWtcQjjLeWUxd1LdYh',
  access_token_key: '920859921033449472-vhSOP6U8JFhcvwFkG58dWSSJ8oXCtya',
  access_token_secret: 'HpoExnWtZC8BmnZMPahDIrnrBXirSa78OrhCVYSUAEJYd',
});

export function getTweets(req, res) {
  const params = {
    user_id: '920859921033449472',
    count: 5,
  };
  twitter.get('statuses/user_timeline', params, (error, tweets) => {
    if (!error) {
      console.log(tweets);
      res.status(200).send({ data: tweets });
    } else {
      res.status(500).send({ error: 'twitter error' });
    }
  });
}
