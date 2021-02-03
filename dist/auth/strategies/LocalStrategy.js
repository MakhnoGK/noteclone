"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const User_1 = __importDefault(require("../../models/User"));
exports.LocalStrategy = new passport_local_1.Strategy(async (username, password, done) => {
    try {
        const user = await User_1.default.findOne({
            where: {
                username,
            },
        });
        if (!user)
            return done(`User doesn't exists`, false); // No user
        if (!(await user.comparePasswords(password)))
            return done('Username or password is incorrect', false); // Wrong password
        user.setAttributes('password', null);
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
});
//# sourceMappingURL=LocalStrategy.js.map