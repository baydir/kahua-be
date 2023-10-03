import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user';

export default function config(passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.AUTH_SECRET;
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      const { _id } = payload;
      User.findById(_id, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        return done(null, false);
      });
    })
  );
}
