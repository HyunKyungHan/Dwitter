import express from 'express';

const app = express();

app.use(express.json());

app
  .route('/posts')
  .get((req, res) => {      //같은 경로는 묶어서 처리할 수 있다. 
    res.status(201).send('GET: /posts');
  })
  .post((req, res) => {
    res.status(201).send('POST: /posts');
  });

app
  .route('/posts/:id')
  .put((req, res) => {
    res.status(201).send('PUT: /posts/:id');
  })
  .delete((req, res) => {
    res.status(201).send('DELETE: /posts/:id');
  });

app.listen(8080);
