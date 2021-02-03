import { Router } from 'express';
import passport from 'passport';
import { JwtStrategy } from '../auth/strategies/JwtStrategy';
import Note from '../models/Note';

const routes = Router();

routes.get(
    '/',
    passport.authenticate(JwtStrategy, { session: false }),
    async (_, res) => {
        const user = _.user as { id: number };

        try {
            let notes = await Note.findAll({
                order: [['id', 'DESC']],
                where: {
                    userId: user.id,
                },
            });

            res.status(200).json(notes);
        } catch (error) {
            res.status(500).send({ error });
        }
    }
);

routes.put('/:id', async (req, res) => {
    try {
        const updatedNote = await Note.update(req.body, {
            where: {
                id: +req.params?.id,
            },
            returning: true,
        });

        res.json(updatedNote[1][0]);
    } catch (error) {
        res.status(500).json({ error });
    }
});

routes.delete('/:id', async (req, res) => {
    try {
        const noteToDelete = Note.findOne({
            where: {
                id: Number(req.params.id),
            },
        }).then(async (result) => {
            await Note.destroy({
                where: {
                    id: Number(req.params.id),
                },
            });

            return result;
        });

        res.status(201).json(await noteToDelete);
    } catch (error) {
        console.error(error);
    }
});

routes.post(
    '/',
    passport.authenticate(JwtStrategy, { session: false }),
    async (req, res) => {
        try {
            const authenticatedUser = req.user as { id: number };

            const note = await Note.create({
                ...req.body,
                userId: authenticatedUser.id,
            });

            res.status(201).send(note);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
);

export default routes;
