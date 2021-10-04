import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { SECRET_KEY } from './constants';

const localStrategy = passportLocal.Strategy;
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

passport.use(new localStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

export const getToken = (user: any) => {
    return jwt.sign(user, SECRET_KEY, {expiresIn: 3600})
}

let opts: any = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('bearer');
opts.secretOrKey = SECRET_KEY;

passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        UserModel.findOne({_id: jwt_payload._id}, (err: any, user: any) => {
            if(err){
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

export const verifyUser = passport.authenticate('jwt', {session: false})