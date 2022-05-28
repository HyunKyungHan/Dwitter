import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';   //보안관련
import tweetsRouter from './router/tweets.js'


const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);  //tweet에 관련된 모든 api요청은 tweet이라는 router에 가도록 맞춘다.

//error handling
app.use((req, res, next) => {
    res.sendStatus(404);
})

app.use((error, req, res, next) =>{
    console.log(error);
    res.sendStatus(500);
})

app.listen(8080);
