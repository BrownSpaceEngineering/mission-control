import callApi from '../util/apiCaller';

export function getTweets(next) {
  callApi('gettweets', 'get').then((result) => {
    return next(result);
  });
}
