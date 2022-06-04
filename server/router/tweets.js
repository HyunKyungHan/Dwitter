import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as tweetController from '../controller/tweet.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

//validation
//sanitization
//Contract Testing: client와 server가 데이터를 주고받을 때의 contract를 test
//proto-base...

const router = express.Router();

const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('text should be at least 3 characters'),
  validate,
];

// GET /tweet
// GET /tweets?username=:username
//isAuth추가해서 로그인 한 사람만 tweet할 수 있게 만들기
router.get('/', isAuth, tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', isAuth,  tweetController.getTweet);

// POST /tweeets
router.post('/',isAuth, [body('text').trim().isLength({min: 3}).withMessage('text shoul be at least 3 characters.')],
 validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', isAuth, tweetController.deleteTweet);

export default router;
