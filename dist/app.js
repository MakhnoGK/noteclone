"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./db"));
const Note_1 = __importDefault(require("./models/Note"));
const User_1 = __importDefault(require("./models/User"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config({ path: './.env' });
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use('/api', routes_1.default);
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'development') {
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    app.get('*', (_, res) => {
        res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
    });
}
const server = app.listen(process.env.PORT, async () => {
    try {
        await db_1.default.authenticate();
        await db_1.default.sync({ force: Boolean(process.env.NODE_ENV === 'development') });
        if ((await Note_1.default.count()) === 0 && (await User_1.default.count()) === 0) {
            await User_1.default.create({
                username: 'MakhnoGK',
                password: '19962728',
            });
            await Note_1.default.create({
                title: 'Test title 1',
                text: '<h1>Test content 1</h1><p>Test paragraph 1</p>',
                userId: 1,
            });
            await Note_1.default.create({
                title: 'Test title 2',
                text: '<h1>Test content 2</h1><p>Test paragraph 2</p>',
                userId: 1,
            });
        }
        console.info('Database connected and synced');
    }
    catch (error) {
        console.error(`Database connection error:\n\n${error}`);
    }
    console.info(`Server started on ${server.address().address}:${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map