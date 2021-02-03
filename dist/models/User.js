"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("sequelize");
const bcrypt_1 = require("bcrypt");
const db_1 = __importDefault(require("../db"));
class User extends sequelize_1.Model {
    async comparePasswords(password) {
        return await bcrypt_1.compare(password, this.password);
    }
}
User.init({
    id: {
        type: '',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_2.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'users',
    modelName: 'user',
    hooks: {
        async beforeCreate(user) {
            user.password = await bcrypt_1.hash(user.password.toString(), 10); // toString() - strange things may happen =)
            if (!user.fullname || user.fullname.trim().length === 0) {
                user.fullname = user.username;
            }
        },
    },
    timestamps: false,
    sequelize: db_1.default,
});
// User.hasMany(Note, { sourceKey: 'id', foreignKey: 'userId', as: 'notes' });
exports.default = User;
//# sourceMappingURL=User.js.map