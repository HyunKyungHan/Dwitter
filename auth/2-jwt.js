const jwt = require('jsonwebtoken');
const secret = 'sdhoaighaosdkfld';

const token = jwt.sign({   //token의 크기가 너무 커지면 네트워크 데이터가 많이 소모되므로 정말 필요한 것들만 포함한다.
    id: 'userID',
    isAdmin: true,
}, secret,     //server가 가지고 있는 sercret key. secure pw generating 웹사이트를 참고해도 된다.
    {expiresIn: 2}  //token은 변경되지 않으므로 유출되면 보안상 문제 발생 -> 따라서 expiresIn을 사용해 token의 유효 기간을 설정해야 한다.
); 

//const edited = 'sjfaoi9ghEown7adpeWrjwekrjweInvmpowji25dfjgslf6sjf';

jwt.verify(token, secret, (error, decoded) => {
    console.log(error, decoded);   //한번 발행된 token은 변경되면 error가 발생함을 확인할 수 있다. 서버에서 사용자가 임의로 token을 변경했는지 확인가능함.
});

console.log(token);