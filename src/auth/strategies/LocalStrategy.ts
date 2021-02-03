import { Strategy } from 'passport-local';
import User from '../../models/User';

export const LocalStrategy = new Strategy(async (username, password, done) => {
    try {
        const user = await User.findOne({
            where: {
                username,
            },
        });

        if (!user) return done(`User doesn't exists`, false); // No user
        if (!(await user.comparePasswords(password)))
            return done('Username or password is incorrect', false); // Wrong password

        user.setAttributes('password', null);
        return done(null, user);
    } catch (error) {
        done(error);
    }
});
