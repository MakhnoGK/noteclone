import { Router } from 'express';
import auth from './auth';
import notes from './notes';
import users from './users';

const routes = Router();

routes.use('/notes', notes);
routes.use('/auth', auth);
routes.use('/users', users);

export default routes;
