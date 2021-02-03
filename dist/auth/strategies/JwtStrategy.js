"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const User_1 = __importDefault(require("../../models/User"));
exports.JwtStrategy = new passport_jwt_1.Strategy({
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['access_token'];
        }
        return token;
    },
    secretOrKey: process.env.PASSPORT_SECRET,
}, async (payload, verify) => {
    try {
        const user = await User_1.default.findOne({ where: { id: payload.id } });
        user === null || user === void 0 ? void 0 : user.setAttributes('password', null);
        return verify(null, user);
    }
    catch (error) {
        console.log(error);
        return verify(error);
    }
});
//# sourceMappingURL=JwtStrategy.js.map