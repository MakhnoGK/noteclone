"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = express_1.Router();
routes.get('/', (req, res) => {
    res.send(200).json({ username: 'Get username' });
});
exports.default = routes;
//# sourceMappingURL=users.js.map