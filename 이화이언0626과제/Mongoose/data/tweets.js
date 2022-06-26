import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';
import * as UserRepository from './auth.js';

//스키마를 코드 상에 정의-> 데이터의 일관성을 유지할 수 있다.
const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll() {
  //트윗을 찾은 후 정렬한 상태로 가져옴(createdAt기준으로 descending으로 가져오기
  return Tweet.find().sort({ createdAt: -1 });
}

export async function getAllByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

//간결해짐..!
export async function getById(id) {
  return Tweet.findById(id);
}

export async function create(text, userId) {
  return UserRepository.findById(userId).then((user) =>
    //트윗을 만들고 저장한 후 return하기
      new Tweet({
      text,
      userId,
      name: user.name,
      username: user.username,
    }).save()
  );
}

export async function update(id, text) {
//id로 찾고 업데이트하기({text}만 업데이트 함.+{ returnOriginal: false } 사용해 업데이트 한 것을 return.)
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

export async function remove(id) {
  return Tweet.findByIdAndDelete(id);
}
