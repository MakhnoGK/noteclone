import { ExtractJwt, Strategy } from 'passport-jwt';
import User from '../../models/User';

export const JwtStrategy = new Strategy(
    {
        // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        jwtFromRequest: (req) => {
            let token = null;

            if (req && req.cookies) {
               token = req.cookies['access_token'];
            }

            return token;
        },
        secretOrKey: process.env.PASSPORT_SECRET!,
    },
    async (payload, verify) => {
        try {
            const user = await User.findOne({ where: { id: payload.id } });
            user?.setAttributes('password', null);
            return verify(null, user);
        } catch (error) {
            console.log(error)
            return verify(error);
        }
    }
);
