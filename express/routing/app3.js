import express from 'express';
import userRouter from './routes/user.js';
import postRouter from './routes/post.js';

const app = express();

app.use(express.json()); //REST API -> Body
app.use(express.urlencoded({extended: false})); //HTML Form -> Body
app.use(express.static('public'));

//이렇게 하면 서버에 도메인이 '/users'와 '/posts'임을 쉽게 파악할 수 있다.
app.use('/users', userRouter);  //user에 관련된 것은 userRouter를 사용한다.
app.use('/posts', postRouter);  //post에 관련된 것은 postRouter를 사용한다.

app.listen(8080);
