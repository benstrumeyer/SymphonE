import {IModel} from "../framework/base/IModel";

export interface IPassport extends IModel
{
    userId:string;

    protocol:string;

    password?:string;
    accessToken?:string;

    provider?:string;
    identifier?:string;
    tokens?:any;
}