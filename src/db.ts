import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize({
    dialect: 'postgres',
    dialectOptions: {
        ...(process.env.NODE_ENV === 'production' && {
            ssl: {
                rejectUnauthorized: false,
            },
        }),
    },
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

export default db;
