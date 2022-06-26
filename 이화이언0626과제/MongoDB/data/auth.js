import { getUsers } from '../database/database.js';
import MongoDb from 'mongodb';

/*MongoDb.을 매번 작성하기 귀찮으므로*/
const ObjectId = MongoDb.ObjectId;

/*getUsers 컬렉션을 가지고 와서 findOne API사용해 사용자를 찾은 후에 새로운 객체mapping*/
export async function findByUsername(username) {
  return getUsers()
    .findOne({ username }) //
    .then(mapOptionalUser);
}

/*id를 찾아서 mapping*/
export async function findById(id) {
  return getUsers()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalUser);
}

/*사용자 추가 후 id return*/
export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
