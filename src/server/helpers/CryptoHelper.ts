import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";

export class CryptoHelper
{
    public static validatePassword(password: string, hash: string): boolean
    {
        return bcrypt.compareSync(password, hash);
    }

    public static hashPassword(password:string):string
    {
        return bcrypt.hashSync(password, 10);
    }

    public static generateAccessToken():string
    {
        return crypto.randomBytes(48).toString("base64");
    }
}
