import { Server } from 'socket.io';
import jwt from 'jsonwebtoken'
import { config } from '../config.js';

class Socket {
    constructor(server) {
        this.io = new Server(server, {
            cors: {
                origin: '*',
            },
        });
    
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;   //socket에서 토큰을 주고받을 때는 handshake 안의 auth를 사용해야함.(query통해서 작성x.) 
            if (!token) {
                return next(new Error('Authentication Error'));
            }
            jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
                if(error){
                    return next(new Error('Authentication Error'));
                }
                next();
            });
        });

        this.io.on('connection', (socket) => {
            console.log('Socket client connected');
        });
    }
}

let socket;
export function initSocket(server) {
    if(!socket) {
        socket = new Socket(server);
    }
}
export function getSocketIO() {
    if(!socket) {
        throw new Error('Please call init first');
    }
    return socket.io;
}
