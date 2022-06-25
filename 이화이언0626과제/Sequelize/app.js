import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import sequelize from 'sequelize';
import { initSocket } from './connection/socket.js';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

/*모델과 스키마가 db에 table로 존재하지 않는다면 table을 새로 만든다.*/
sequelize.sync().then(() => {
  //console.log(client);
  const server = app.listen(config.host.port);
  initSocket(server);
});