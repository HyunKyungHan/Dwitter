import Mongoose from 'mongoose';
import { config } from '../config.js';

/*connectDB사용에 db에 연결*/
export async function connectDB() {
  return Mongoose.connect(config.db.host, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

export function useVirtualId(Schema) {
  //TODO: _id -> id
  Schema.virtual('id').get(function() {
  return this._id.toString();
  });
  Schema.set('toJSON', {virtuals:true});
  Schema.set('toObject', {virtuals: true});
}

//TODO(Me):Delete blow -> 개발 단계에서 누가 무슨 일을 해야하는지 이런식으로 작성.
let db;

/*tweet 컬렉션 전달 함수*/
export function getTweets() {
  return db.collection('tweets');
}
