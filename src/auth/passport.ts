import passport from 'passport';
import { JwtStrategy } from './strategies/JwtStrategy';
import { LocalStrategy } from './strategies/LocalStrategy';

passport.use(LocalStrategy);
passport.use(JwtStrategy);

export default passport;


