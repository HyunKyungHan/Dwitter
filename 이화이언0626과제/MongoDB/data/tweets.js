import MongoDb from 'mongodb';
import { getTweets } from '../database/database.js';
import * as userRepository from './auth.js';
const ObjectId = MongoDb.ObjectId;

// NOSQL (정보의 중복 > 관계)
// 모든 사용자가 트윗을 query하는 횟수 > 사용자가 사용자의 정보를 업데이트하는 횟수
// 프로필 DB
// 사용자의 문서 DB: 서버1, 서버2, 서버3
// 관계형 JOIN query 의 성능이 좋지 않다.

//SQL: 관계형
//JOIN query 의 성능이 좋다.
export async function getAll() {
  return getTweets() //
    .find() //여러개의 API사용하려면 .find()
    .sort({ createdAt: -1 })  //가장 나중에 만들어진 트윗이 가장 위에 보이도록 정렬.
    .toArray()  //배열형태로 변환
    .then(mapTweets);
}

export async function getAllByUsername(username) {
  return getTweets() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
  return getTweets()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
  const { name, username, url } = await userRepository.findById(userId); //트윗에 사용자 정보를 포함(관계 중복 > 관계이므로)
  const tweet = {
    //id는 mongoDB에서 자동으로 생성.
    text,
    createdAt: new Date(),
    userId,
    name: name,
    username: username,
    url: url,
  };
  return getTweets()
    .insertOne(tweet)
    .then((data) => mapOptionalTweet({ ...tweet, _id: data.insertedId }));
}

export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(  //데이터받아오기
      { _id: new ObjectId(id) },
      { $set: { text } },
      { returnDocument: 'after' }
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  return getTweets().deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
  return tweets.map(mapOptionalTweet);
}
