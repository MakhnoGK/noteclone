import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { AddressInfo } from 'net';
import path from 'path';
import db from './db';
import Note from './models/Note';
import User from './models/User';
import routes from './routes';
import { schema, resolvers } from './graphql';
import * as JWT from 'jsonwebtoken';

dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

const apollo = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req, res }): any => {
    return { req, res };
  },
});

app.use((req, res, next) => {
  if (!req.cookies['access_token']) return next();

  const data = JWT.verify(
    req.cookies['access_token'],
    process.env.PASSPORT_SECRET
  ) as any;

  (req as any).userId = data.userId;
  next();
});

apollo.applyMiddleware({ app, cors: { credentials: true, origin: 'http://localhost:3000' } });

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

const server = app.listen(process.env.PORT, async () => {
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
