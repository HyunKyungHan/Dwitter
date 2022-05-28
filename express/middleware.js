//callback함수(middleware)는 작성 순서가 중요하다.
//한 경로에 대해 여러개의 middleware를 배열 형태로 등록할 수 있다.
//response를 하거나 next를 호출에서 다음 함수와 연결해야 한다. 여기서 res와 next에 대한 코드를 전혀 작성하지 않는다면 서버가 반응하지 않는다.
//하나의 callback에서 여러개의 send를 보내면 error 발생. 따라서 send를 사용할 떄는 return res.send('Hello'); 이런 식으로 작성해서 send가 끝나면 함수를 나가도록 작성해야 한다.

import express from 'express'  //express 가져오기
const app = express();   //app 만들기

app.get(
    '/',
    (req, res, next) => {
    console.log('first');
    next('route');   //next안에 'route'를 쓰면 comma로 연결된 부분을 건너뛰고 다음 경로로 넘어가 'second'를 출력하게 된다.
    },
    (req,res, next) => {
        console.log('first2');
        next();   //next를 써줘야 이 다음 경로로 넘어간다.
    }
);
app.get('/sky/:id', (req, res, next) => {
    console.log('second');
});

//app.all과 app.use의 차이
app.all('/api', (req, res, next) => {  //명시된 '/api'경로에 대해서만 적용됨.
    console.log('all');
    next();
});

app.use('/sky', (req, res, next) => {    //'/sky'를 포함한 뒤에 이어지는 어떠한 경로든 적용됨(middleware 등록 가능).
    console.log('use');
    next();
})

//처리할 수 없는 경로에 대한 친절한 에러 메시지 나타내기
//(여기까지 도달했다는 것은 res나 next가 적절히 사용되지 않아 처리가 제대로 되지 않았다는 뜻이므로..)
app.use((req, res, next) => {
    res.status(404).send('Not available!@_@')
})

//error handler 작성하기(마지막에!)
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('Sorry, try later!');
}) 


app.listen(8080);      //8080이라는 포트에서 listen (url창에 localhost:8080 입력하기)


