"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = new sequelize_1.Sequelize({
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
exports.default = db;
//# sourceMappingURL=db.js.map