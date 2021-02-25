import Note from '../models/Note';
import User from '../models/User';
import * as JWT from 'jsonwebtoken';
import { Request, Response } from 'express';

const resolvers = {
  Query: {
    note: async (_: any, { id }: { id: number }) => {
      const note = await Note.findOne({ where: { id } });
      return note;
    },
    notes: async (_, __, { req }) => {
      const notes = await Note.findAll({ where: { userId: req.userId } });
      console.log(notes);
      return notes;
    },
    me: async (_, __, { req }) => {
      if (!req.userId) return;

      return User.findOne({ where: { id: req.userId } });
    },
    logout: (_, __, { res }: { res: Response }) => {
      res.clearCookie('access_token');
      return 'logged out';
    },
  },
  Mutation: {
    register: async (_, { username, password, fullname }) => {
      const registeredUser = await User.create({
        username,
        password,
        fullname,
      });
      if (!registeredUser) return;

      registeredUser.setAttributes('password', null);
      return registeredUser;
    },
    login: async (
      _: { _: any },
      { username, password },
      { req, res }: { req: any; res: Response }
    ) => {
      const user = await User.findOne({ where: { username } });
      const passwordsMatch = await user.comparePasswords(password);

      if (!passwordsMatch) return; // Do not authenticate if passwords dont match

      const accessToken = JWT.sign(
        { userId: user.id },
        process.env.PASSPORT_SECRET
      );

      res.cookie('access_token', accessToken, { maxAge: 1000 * 60 * 60 });

      return user;
    },
    addNote: async (_, { title, text }, { req }) => {
      if (!req.userId) return;

      const addedNote = await Note.create({ title, text, userId: req.userId });
      return addedNote;
    },
    removeNote: async (_, { id }, { req }) => {
      if (!req.userId) return;

      const removedId = Note.findOne({ where: { id } }).then(async (note) => {
        await Note.destroy({ where: { id } });
        return note.id;
      });

      return await removedId;
    },
  },
};

export default resolvers;
