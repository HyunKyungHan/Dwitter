import { config } from '../config.js';
import mysql from 'mysql2';
import SQ from 'sequelize';

const {host, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
    host, 
    dialect: 'mysql', /*기본값이 mysql이라 생략가능.*/
});

const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
});

export const db = pool.promise(); 
