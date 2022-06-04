import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';

const router = express.Router();

const validateCredential = [
    body('username')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 characters'), //형식에 맞지 않는 data 걸러내기
    validate,
];

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name is missing'),
    body('email').isEmail().normalizeEmail().withMessage('invalid email'), //형식에 맞지 않는 data 걸러내기
    body('url')    //url은 꼭 필요한 정보는 아니다.
    .isURL()   //그래서 있다면 url형식이 맞는지 유효성 검사 실시.
    .withMessage('invalid URL')
    .optional({ nullable: true, checkFalsy: true}),  //데이터가 없거나(null) 텅텅 빈 문자열(booleanfalse)인 경우까지 고려하기.
    validate,
];

//controller에게 signup 요청이 오면 연결+유효성검사
router.post('/signup', validateSignup, authController.signup);
//login 요청이 오면 authController에 있는 login과 연결+유효성검사
router.post('/login', validateCredential, authController.login);

//로그인한 후 내가 유효한지 아닌지 확인하는 api
router.get('/me', isAuth, authController.me);

export default router;