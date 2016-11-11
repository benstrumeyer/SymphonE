export interface IAppMeta
{
    name: string;
    project: string;
    version: string;
    description: string;
    copyright: string;

    author: {
        name: string,
        url: string
    };
}

export const APP_META = require("../../../meta.json") as IAppMeta;