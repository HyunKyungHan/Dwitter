import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRepository.getAllByUsername(username)
    : tweetRepository.getAll());
  res.status(200).json(data);
}

export async function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function createTweet(req, res, next) {
  const { text, name, username } = req.body;
  const tweet = await tweetRepository.create(text, name, username);
  res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  //해당 userid로 작성한 tweet에 대해서만 update/delete할 권한을 부여해야 한다.
  const tweet = await tweetRepository.getById(id);
  if(!tweet) {
    return res.sendStatus(404);  //tweet이 이미 존재하는지 확인
  }
  if(tweet.userId !== req.userId) {
    return res.sendStatus(403);   //403: 로그인된 사용자지만 권한이 없을 때 사용.
  }
  const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated);   //둘 다 아니라면 tweet update하기
}

export async function deleteTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if(!tweet) {
    return res.sendStatus(404);  //tweet이 이미 존재하는지 확인
  }
  if(tweet.userId !== req.userId) {
    return res.sendStatus(403);   //403: 로그인된 사용자지만 권한이 없을 때 사용.
  }
  await tweetRepository.remove(id);
  res.sendStatus(204);
}
