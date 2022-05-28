//백엔드 에러 핸들링 keypoint
//1. 클라이언트에게 에러가 발생했음을 친절하게 알리기
//2. 문제 상황에서 빠르게 복구되도록 예외처리 잘하기
import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';

const app = express();

app.use(express.json());

app.get('/file1', (req, res) => {
  // 1.
  // fs.readFile('/file1.txt', (err, data) => {  //readFile은 비동기. callback함수 내에서 error처리를 해야한다. 에러가 외부로 던져지지 않음 주의!(try-catch도 적용안됨.)
  //   if (err) {
  //     res.sendStatus(404).send('File not Found');
  //   }
  // });

  // 2.
  try {
    const data = fs.readFileSync('/file1.txt');  //readFileSync는 동기적. 한 단계가 모두 진행되어야 다음으로 넘어감. 여기서 에러가 발생하면 던져지기 때문에 try-catch로 잡거나 맨 마지막 error handling에 전달된다.
  } catch (error) {
    res.sendStatus(404).send('File not found');
  }
});


//프로미스는 비동기. 내부적으로 에러가 발생하기 때문에 try-catch로 잡을 수 없다. 따라서 .catch사용
app.get('/file2', (req, res) => {
  fsAsync
    .readFile('/file2.txt') //
    .catch((error) => {
      res.sendStatus(404);  //내부적으로 처리: 사용자에게 에러 메시지 보내기. 혹은 next()사용해서 맨 마지막 에러 핸들링 부분으로 던지기
    });
});

app.get('/file3', async (req, res) => {
  try {
    const data = await fsAsync.readFile('/file2.txt');  //코드 자체는 동기적이나 middleware가 (async떄문에)프로미스로 감싸짐. 따라서 여기서 발생한 에러는 프로미스에서 발생한 에러와 같은 취급.
  } catch {
    res.sendStatus(404);
  }
});

// 버전 5 이하에서는: require('express-async-errors');

// Express 5 부터는 이렇게
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(8080);
