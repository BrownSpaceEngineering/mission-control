import dummyData from '../dummyData';

//the keys and tokens were given to me by twitter
var twit = require('twitter'),
	twitter = new twit({
		consumer_key:  'cjll8FnPGIrKXmd6eihpmEa1x',
		consumer_secret: 'fjt8HFJDAzlNFlSqXLMGSgQIKSqjRU1JcWtcQjjLeWUxd1LdYh',
		access_token_key: '920859921033449472-vhSOP6U8JFhcvwFkG58dWSSJ8oXCtya',
		access_token_secret: 'HpoExnWtZC8BmnZMPahDIrnrBXirSa78OrhCVYSUAEJYd'
	});


export function getTweets(req, res) {
  var params = {user_id: '920859921033449472'};
  twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
  		res.status(200).send(tweets);
  	} else {
  		throw error;
  		res.status(500).send({ error: 'twitter error' });
  	}
  });

}
