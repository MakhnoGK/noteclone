"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const LocalStrategy_1 = require("../auth/strategies/LocalStrategy");
const JwtStrategy_1 = require("../auth/strategies/JwtStrategy");
const User_1 = __importDefault(require("../models/User"));
const JWT = __importStar(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const routes = express_1.Router();
routes.get('/', async (_req, res) => {
    try {
        const users = await User_1.default.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
routes.post('/signup', async (req, res) => {
    try {
        // Check if user with that username exists
        const userExists = (await User_1.default.findAll({ where: { username: req.body.username } }))
            .length > 0;
        if (userExists) {
            return res.status(200).json({ error: 'Username already taken' });
        }
        const user = await User_1.default.create(req.body);
        user.setAttributes('password', null);
        res.status(201).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal error' });
    }
});
routes.post('/signin', async (req, res) => {
    passport_1.default.authenticate(LocalStrategy_1.LocalStrategy, { session: false }, (error, user, info) => {
        try {
            if (error || !user) {
                res.status(401.1).json({
                    error,
                    user,
                    info,
                });
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.status(402).json(err);
                }
                else {
                    const token = JWT.sign(user.toJSON(), process.env.PASSPORT_SECRET, {
                        expiresIn: '1h',
                    });
                    res.cookie('access_token', token, {
                        httpOnly: true,
                        sameSite: true,
                    });
                    return res.status(200).json({
                        isAuthenticated: req.isAuthenticated(),
                        user,
                    });
                }
            });
        }
        catch (loginError) {
            console.error(loginError);
        }
    })(req, res);
});
routes.get('/signout', passport_1.default.authenticate(JwtStrategy_1.JwtStrategy, { session: false }), (_req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ success: true });
});
// TODO: Remove (or decide what to do)
routes.options('/authenticated', cors_1.default());
routes.get('/authenticated', cors_1.default(), passport_1.default.authenticate(JwtStrategy_1.JwtStrategy, { session: false }), (req, res) => res.status(200).json({ user: req.user }));
exports.default = routes;
//# sourceMappingURL=auth.js.map