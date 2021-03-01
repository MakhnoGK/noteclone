import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { AddressInfo } from 'net';
import passport from 'passport';
import path from 'path';
import { JwtStrategy } from './auth/strategies/JwtStrategy';
import { LocalStrategy } from './auth/strategies/LocalStrategy';
import db from './db';
import Note from './models/Note';
import User from './models/User';
import routes from './routes';

dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api', routes);

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'development') {
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

const server = app.listen(process.env.PORT || 5000, async () => {
    try {
        await db.authenticate();
        await db.sync({ force: Boolean(process.env.NODE_ENV === 'development') });

        if ((await Note.count()) === 0 && (await User.count()) === 0) {
            await User.create({
                username: 'MakhnoGK',
                password: '19962728',
            });

            await Note.create({
                title: 'Test title 1',
                text: '<h1>Test content 1</h1><p>Test paragraph 1</p>',
                userId: 1,
            });

            await Note.create({
                title: 'Test title 2',
                text: '<h1>Test content 2</h1><p>Test paragraph 2</p>',
                userId: 1,
            });
        }

        console.info('Database connected and synced');
    } catch (error) {
        console.error(`Database connection error:\n\n${error}`);
    }

    console.info(
        `Server started on ${(server.address() as AddressInfo).address}:${
            process.env.PORT
        }`
    );
});
