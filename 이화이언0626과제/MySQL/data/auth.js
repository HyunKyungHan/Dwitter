// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
import {db} from '../db/database.js'

export async function findByUsername(username) {
  return db /*데이터를 db에서 읽어오도록 코드를 수정*/
  .execute('SELECT * from users WHERE username=?',[username]) //
  .then((result) => result[0][0]);
}

export async function findById(id) {
  return db
    .execute('SELECT * FROM users WHERE id=?', [id]) //
    .then((result) => result[0][0]);
}

export async function createUser(user) {
  /*object deconstruction 이용*/
  const {username, password, name, email, url} = user;
  return db.execute('INSERT INTO users (username, password, name, email, url) VALUES(?,?,?,?,?)', [
    username, password, name, email, url
  ]).then((result)=>result[0].insertId);
}
