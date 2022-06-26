import MongoDb from 'mongodb';
import { config } from '../config.js';

let db;
/*connectDB사용에 db에 연결*/
export async function connectDB() {
  return MongoDb.MongoClient.connect(config.db.host) //
    .then((client) => {
      db = client.db();
    });
}

/*사용자 컬렉션 전달 함수*/
export function getUsers() {
  return db.collection('users');
}
/*tweet 컬렉션 전달 함수*/
export function getTweets() {
  return db.collection('tweets');
}
