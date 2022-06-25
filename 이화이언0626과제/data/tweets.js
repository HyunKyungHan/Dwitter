import {db} from '../db/database.js';
import * as userRepository from './auth.js';
/*joinquery: 두 개의 연관 있는 table을 함께 읽어오기*/

/*query를 정리해 재사용하기*/
/*tweets와 users table에서 데이터 가져오기 + tw의 id가 user id와 일치하는 경우에만 가져오기 + ORDER BY를 통해 최신순으로 tweet정렬하기*/
/*tweet을 tw로, users를 us로 줄임.*/
const SELECT_JOIN = 'SELECT tw.id, tw.userId, tw.text, tw.createdAt, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId = us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';
export async function getAll() {
  return db
  .execute(`${SELECT_JOIN} ${ORDER_DESC}` ) 
  .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
  /*username조건 추가*/
  .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username] ) 
  .then((result) => result[0]);
}

export async function getById(id) {
  return db
  .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
  .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
  .execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)',
  [text, new Date(), userId])
  .then(result => getById(result[0].insertId));
}

export async function update(id, text) {
  return db.execute('UPDATE tweets SET text =? WHERE id=?', [text,id])
  .then(() => getById(id));
}

export async function remove(id) {
  return db.execute('DELETE FROM tweets WHERE id=?', [id])
}
