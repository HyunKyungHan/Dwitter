import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const auth_error = {message: 'Authentication Error'};

export const isAuth = async (req, res, next) => {  //모든 요청에 대해 header에 auth가 있는지, 검증할 수 있는 jwt형태인지, 사용자가 db에 존재하는지 확인
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer'))) {
        return res.status(401).json(auth_error);
    }

    const token = authHeader.split(' ')[1];

    //TODO: Make it secure!
    jwt.verify(
        token,
        'F2dMf84xdiweEHng8f23djfks1',
        async(error, decoded) => {
            if(error) {
                return res.status(401).json(auth_error);  //error발생 시 401보내주기
            }
            const user = await userRepository.findById(decoded.id);
            if(!user) {
                return res.status(401).json(auth_error); //존재하지 않는 사용자의 경우 401 보내주기
            }
            req.userId = user.id;  //req.customData (등록)
            next();
        }
    );
    };
