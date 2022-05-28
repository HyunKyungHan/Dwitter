//express는 middleware들이 chain으로 연결된 형태.
//1.req 실습하기

import express from 'express'  //express 가져오기
const app = express();   //app 만들기

app.get('/sky/:id', (req, res, next) => {
    //console.log(req.path);   //path(경로)에 대한 정보 확인 가능
    //console.log(req.headers);   //header 정보 확인 가능
    console.log(req.params);   //param형태 정보 확인 가능 (http://localhost:8080/sky/hk)
    console.log(req.params.id);  

    console.log(req.query);    //query에 대한 정보 확인 가능 (http://localhost:8080/sky/hk/?keyword=bts)
    console.log(req.query.keyword);
    res.send('hi');  //클라이언트는 입력이 올때까지 계속 로딩하고 있으므로 클라이언트에게 항상 data를 보내줘야 한다.
});
app.listen(8080);      //8080이라는 포트에서 listen (url창에 localhost:8080 입력하기)
//여기까지만 진행해도 server가 생성됨


