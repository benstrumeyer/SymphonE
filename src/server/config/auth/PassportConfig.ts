import * as passport from "passport";
import * as session from "express-session";

import {Express} from "express";
import {LOCAL_STRATEGY} from "./PassportLocalConfig";
import {CONFIG} from "../Config";

export class PassportConfig
{
    public static init(app: Express)
    {
        app.use(session({
            secret: CONFIG.jwt.secret,
            resave: true,
            saveUninitialized: true
        }));
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser((user, callback) =>
        {
            callback(null, user);
        });
        passport.deserializeUser((user, callback) =>
        {
            callback(null, user);
        });

        // Setup strategies for Passport
        passport.use(LOCAL_STRATEGY);
    }
}