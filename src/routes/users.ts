import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    res.send(200).json({ username: 'Get username' });
});

export default routes;
