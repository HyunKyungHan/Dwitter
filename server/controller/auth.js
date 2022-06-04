import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {} from 'express-async-errors';
import * as userRepository from '../data/auth.js';  //controller는 userRepository를 사용해서 사용자의 data저장/일기/권한 위임.

//Dwitter는 jwt를 사용해 auth설정.
//이유:
//1. Dwitter서버는 RESTful API를 사용하기 때문
//2. 서비스의 확장성을 위해
//3. jwt를 사용하면 서버의 확장이 편리하기 때문
//TODO: Make it secure!
const jwtSecretKey = 'F2dMf84xdiweEHng8f23djfks1';  //secretkey 정의
const jwtExpiresInDays = '2d';  //expire기한 정의
const bcryptSaltRounds = 12;   //salt길이 정의

export async function signup(req, res) {   //필요한 데이터를 모두 받아온 후에
    const {username, password, name, email, url} = req.body;
    const found = await userRepository.findByUsername(username);
    if(found) {
        return res.status(409).json({message: '${username} already exists '});   //사용자 이름이 이미 존재하는지 확인
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await userRepository.createUser({   //사용자 만들기
        username,
        password: hashed,
        name, 
        email,
        url,
    });
    const token = createJwtToken(userId);   //사용자의 고유id을 이용해 token만들기
    res.status(201).json({token, username});
}

export async function login(req, res) {
    const { username, password } = req.body;
    const user = await userRepository.findByUsername(username);
    if (!user) {
        return res.status(401).json({message: 'Invalid user or password'});
    }
    const isValidPassword = await bcrypt.compare(password, user.password);  //hased된 pw와 사용자가 입력한 pw가 동일한지 확인
    if(!isValidPassword) {
        return res.status(401).json({ message: 'Invalid user or password'});  //보안상의 이유로 메시지에 잘못된 pw라고 친절하게 알려주지 않는다.
    }
    const token = createJwtToken(user.id);  //모든 과정이 성공적이라면 token 생성
    res.status(200).json({token, username});
}

function createJwtToken(id) {
    return jwt.sign({id}, jwtSecretKey, {expiresIn: jwtExpiresInDays});
}

export async function me(req, res, next) {  //userRepo에서 token과 함께 유저 정보 보내기
    const user = await userRepository.findById(req.userId);
    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({token: req.token, username: user.username});
}