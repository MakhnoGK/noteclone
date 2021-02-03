"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const JwtStrategy_1 = require("../auth/strategies/JwtStrategy");
const Note_1 = __importDefault(require("../models/Note"));
const routes = express_1.Router();
routes.get('/', passport_1.default.authenticate(JwtStrategy_1.JwtStrategy, { session: false }), async (_, res) => {
    const user = _.user;
    try {
        let notes = await Note_1.default.findAll({
            order: [['id', 'DESC']],
            where: {
                userId: user.id,
            },
        });
        res.status(200).json(notes);
    }
    catch (error) {
        res.status(500).send({ error });
    }
});
routes.put('/:id', async (req, res) => {
    var _a;
    try {
        const updatedNote = await Note_1.default.update(req.body, {
            where: {
                id: +((_a = req.params) === null || _a === void 0 ? void 0 : _a.id),
            },
            returning: true,
        });
        res.json(updatedNote[1][0]);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
routes.delete('/:id', async (req, res) => {
    try {
        const noteToDelete = Note_1.default.findOne({
            where: {
                id: Number(req.params.id),
            },
        }).then(async (result) => {
            await Note_1.default.destroy({
                where: {
                    id: Number(req.params.id),
                },
            });
            return result;
        });
        res.status(201).json(await noteToDelete);
    }
    catch (error) {
        console.error(error);
    }
});
routes.post('/', passport_1.default.authenticate(JwtStrategy_1.JwtStrategy, { session: false }), async (req, res) => {
    try {
        const authenticatedUser = req.user;
        const note = await Note_1.default.create({
            ...req.body,
            userId: authenticatedUser.id,
        });
        res.status(201).send(note);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.default = routes;
//# sourceMappingURL=notes.js.map