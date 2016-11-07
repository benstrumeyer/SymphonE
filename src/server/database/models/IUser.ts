import {IModel} from "../framework/base/IModel";

export interface IUser extends IModel
{
    username: string;
    email: string;

    createdAt: Date;
    roles: string[];
}