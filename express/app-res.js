//2.res 실습하기

import express from 'express'  //express 가져오기
const app = express();   //app 만들기

app.get('/sky/:id', (req, res, next) => {

    res.send('hi');  //클라이언트는 입력이 올때까지 계속 로딩하고 있으므로 클라이언트에게 항상 data를 보내줘야 한다.
    res.json({name: 'Ellie'});    //json을 보낼수도 있다.
    res.sendStatus(400);          //data말고 단순 status code만 보낼 수도 있다.
    res.status(201).send('created');
    res.setHeader('key', 'value');     //header에 특정 값을 입력할 수도 있다. 
});
app.listen(8080);      //8080이라는 포트에서 listen (url창에 localhost:8080 입력하기)
//여기까지만 진행해도 server가 생성됨


