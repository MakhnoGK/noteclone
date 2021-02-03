import { Router } from 'express';
import passport from 'passport';
import { LocalStrategy } from '../auth/strategies/LocalStrategy';
import { JwtStrategy } from '../auth/strategies/JwtStrategy';
import User from '../models/User';
import * as JWT from 'jsonwebtoken';
import cors from 'cors';

const routes = Router();

routes.get('/', async (_req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

routes.post('/signup', async (req, res) => {
    try {
        // Check if user with that username exists
        const userExists =
            (await User.findAll({ where: { username: req.body.username } }))
                .length > 0;

        if (userExists) {
            return res.status(200).json({ error: 'Username already taken' });
        }

        const user = await User.create(req.body);
        user.setAttributes('password', null);

        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal error' });
    }
});

routes.post('/signin', async (req, res) => {
    passport.authenticate(
        LocalStrategy,
        { session: false },
        (error, user: User, info) => {
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
                    } else {
                        const token = JWT.sign(
                            user.toJSON(),
                            process.env.PASSPORT_SECRET!,
                            {
                                expiresIn: '1h',
                            }
                        );

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
            } catch (loginError) {
                console.error(loginError);
            }
        }
    )(req, res);
});

routes.get(
    '/signout',
    passport.authenticate(JwtStrategy, { session: false }),
    (_req, res) => {
        res.clearCookie('access_token');
        res.status(200).json({ success: true });
    }
);

// TODO: Remove (or decide what to do)
routes.options('/authenticated', cors());
routes.get(
    '/authenticated',
    cors(),
    passport.authenticate(JwtStrategy, { session: false }),
    (req, res) => res.status(200).json({ user: req.user })
);

export default routes;
