import express from 'express';
import { body, param, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return  next();
    }
    return res.status(400).json({message: errors.array()[0].msg});
};

app.post(
    '/users',
    [   //배열형태로 표현 가능
        body('name').trim().isLength({min: 2}).withMessage('이름은 두글자 이상!'),   //Sanitize: trim()을 사용해 사용자 이름의 공백을 없애주면 공백을 이름으로 허용하는 오류를 없애준다. 유효성 검사 전에 trim 하기!
        body('age').isInt().withMessage('숫자를 입력해'),
        body('email').isEmail().withMessage('이메일 입력하세요').normalizeEmail(),
        body('job.name').notEmpty(),
        validate,
    ],
    (req, res, next) => {    //사용자의 이름과 나이 등 정보들이 모두 입력되었고 foramt이 유효한지 확인할 수 있다.
    console.log(req.body);
    res.sendStatus(201);
});

app.get(
    '/:email',   //email의 format이 유효한지 아닌지 확인할 수 있다.
    [   //배열형태로 표현 가능
        param('email').isEmail().withMessage('이메일 입력하세요'),
        validate
    ],
     (req, res, next) => {   
    res.send('^ㅡ^');
});

app.listen(8080);