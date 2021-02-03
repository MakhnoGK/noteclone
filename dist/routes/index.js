"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const notes_1 = __importDefault(require("./notes"));
const users_1 = __importDefault(require("./users"));
const routes = express_1.Router();
routes.use('/notes', notes_1.default);
routes.use('/auth', auth_1.default);
routes.use('/users', users_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map