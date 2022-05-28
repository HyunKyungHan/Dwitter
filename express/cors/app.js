import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: ['http://127.0.0.1:5500'] //해당 domain에서만 course policy를 볼 수 있도록 지정할 수 있다.
}));

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.listen(8080);
