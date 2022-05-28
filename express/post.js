import express from 'express';
const app = express();

app.use(express.json());  //모든 request에 대해 express에서 제공하는 json형태로 나타냄

app.post('/', (req, res, next) => {
    console.log(req.body);
});

app.listen(8080);