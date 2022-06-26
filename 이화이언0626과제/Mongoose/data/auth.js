import { useVirtualId } from '../database/database.js';
import Mongoose from 'mongoose';

//SQL: DB Schema o
//NoSQL: DB Schema x, ODM Schema o
const userSchema = new Mongoose.Schema({
  username: {type: String, required: true},
  name: { type: String, requires: true},
  email: {type: String, required:true},
  password: { type: String, required: true},
  url: String,
});

useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema);  //user컬렉션을userSchema와 연결.

/*간단해짐!*/
export async function findByUsername(username) {
  return User.findOne({username});
}
export async function findById(id) {
  return User.findById(id);
}
export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
