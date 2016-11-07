import cookieParser = require("cookie-parser");
import cors = require("cors");

import {Express} from "express";
import {CONFIG} from "../Config";
import {LOGGER} from "../../helpers/Logger";
import {PassportConfig} from "./PassportConfig";
import {jsonWebToken} from "../../middlewares/JsonWebToken";

export class AuthConfig
{
    public static init(app: Express)
    {
        LOGGER.info("Setting up Auth...");

        // Hook up the auth related middlewares
        app.use(cookieParser());
        app.use(cors(CONFIG.cors));

        // Setup Passport
        PassportConfig.init(app);

        // Setup JSON Web Token auth flow
        app.use(jsonWebToken());
    }
}