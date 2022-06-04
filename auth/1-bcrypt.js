const bcrypt = require('bcrypt');

const password = 'abcd1234';
const hashed = bcrypt.hashSync(password, 10 ); //salt의 길이 지정 가능(보통 10-12 추천)//
console.log('password: ${password}, hashed: ${hashed}');

const result = bcrypt.compareSync('abcd123', hashed);  //server에서 사용할땐 비동기적으로 하기
console.log(result);