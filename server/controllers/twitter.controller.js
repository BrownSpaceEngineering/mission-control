import dummyData from '../dummyData';

export function getTweets(req, res) {
  res.status(200).send({ data: dummyData.twitterTimeline });
}
