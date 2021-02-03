"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const JwtStrategy_1 = require("./strategies/JwtStrategy");
const LocalStrategy_1 = require("./strategies/LocalStrategy");
passport_1.default.use(LocalStrategy_1.LocalStrategy);
passport_1.default.use(JwtStrategy_1.JwtStrategy);
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map