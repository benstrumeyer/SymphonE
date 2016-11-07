import path = require("path");

const env = process.env.NODE_ENV || "development";
const isDevEnv = (env === "development");

const rootPath = path.join(__dirname, "..");

interface IAppConfig
{
    rootPath: string;
    port: number;
    cors: {
        origin: string | string[],
        credentials: boolean
    };
    winston: {
        level: string
    };
    jwt: {
        secret: string,
        expiryInMinutes: number,
        cookie: {
            name: string,
            options: {
                httpOnly: boolean,
                secure: boolean,
                expires: Date
            }
        }
    };
    arango: {
        host: string,
        port: number,
        database: string,
        username: string,
        password: string
    }
}

export const CONFIG: IAppConfig = {
    rootPath: rootPath,
    port: isDevEnv ? 7350 : 80,
    cors: {
        origin: process.env.CLIENT_URL || true,
        credentials: true
    },
    winston: {
        level: isDevEnv ? "debug" : "info"
    },
    jwt: {
        secret: process.env.JWT_SECRET || "asdfghjkl",
        expiryInMinutes: 30,
        cookie: {
            name: process.env.JWT_COOKIE || "symphone.presence",
            options: {
                httpOnly: true,
                secure: !isDevEnv,
                expires: new Date(2099, 1, 1)
            }
        }
    },
    arango: {
        host: process.env.ARANGO_HOST || "localhost",
        port: process.env.ARANGO_PORT || 8529,
        database: process.env.ARANGO_DBNAME || "SymphonE",
        username: process.env.ARANGO_USER || "admin",
        password: process.env.ARANGO_PASS || "admin123"
    }
};