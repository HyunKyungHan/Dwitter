import { config } from '../config.js';
/*sequelize에서 mysql을 자동으로 import*/
import SQ from 'sequelize';

const {host, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
    host, 
    dialect: 'mysql', /*기본값이 mysql이라 생략가능.*/
    logging: false, /*database실행한 것에 대해 더 이상 로그를 남기지 않음.(배포 시 끄는 것 추천)*/
});
