import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config({ path: '.env' });
import User from '../modules/users/users.entity.js';

const configs = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
};
export const jwtStrategy = new JwtStrategy(configs, (payload, done) => {
    User.findOne({ _id: payload._id }, function (err, user){
        if(err) return done(err, false);
        if(user) return done(null, user);
        return done(null, false);
    });
})

export const generateJwtToken = (payload, secret = process.env.ACCESS_TOKEN_SECRET, options) => {
    options = {
        expiresIn: '30m',
        ...options
    }
    return jwt.sign(payload, secret, options);
}

export const auth = (strategy) =>
    (req, res, next) =>
        passport.authenticate(strategy, { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({
                    message: "Unauthorized"
                }); // send the error response to client
            }
            const { password, ...rest } = user.toJSON();
            req.user = rest;
            req.basicUser = user;
            return next(); // continue to next middleware if no error.
        })(req, res, next);

