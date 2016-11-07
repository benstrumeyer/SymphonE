import {IDatabaseConfig} from "./IDatabaseConfig";

export class DatabaseConfig
{
    public host: string;
    public port: number;
    public username: string;
    public password: string;
    public databaseName: string;

    constructor(config?:IDatabaseConfig)
    {
        this.host = config.host;
        this.port = config.port;
        this.username = config.username;
        this.password = config.password;
        this.databaseName = config.database;
    }

    public get databaseUrl()
    {
        var {username, password, host, port} = this;

        return `http://${username}:${password}@${host}:${port}`;
    }
}
