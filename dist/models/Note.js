"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
const User_1 = __importDefault(require("./User"));
class Note extends sequelize_1.Model {
}
Note.init({
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'note',
    tableName: 'notes',
    timestamps: true,
    createdAt: true,
    updatedAt: false,
});
Note.belongsTo(User_1.default, { targetKey: 'id' });
exports.default = Note;
//# sourceMappingURL=Note.js.map