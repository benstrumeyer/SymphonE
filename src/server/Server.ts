import * as express from "express";

import {CONFIG} from "./config/Config";
import {Bootstrap} from "./config/Bootstrap";
import {LOGGER} from "./helpers/Logger";

var app = express();

// Bootstrap the application and couple the middlewares
Bootstrap.init(app)
    .then(() =>
    {
        // Start up the server after bootstrap has finished
        LOGGER.info("Starting Server...");

        app.listen(CONFIG.port, function ()
        {
            LOGGER.info("Magic is happening at http://localhost:" + CONFIG.port);
        });
    });