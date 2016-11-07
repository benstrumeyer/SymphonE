import {CONFIG} from "../config/Config";
import {Collection, Database} from "./framework/decorators";
import {DatabaseContext} from "./framework/context/DatabaseContext";
import {Repository} from "./framework/base/Repository";
import {IUser} from "./models/IUser";
import {IPassport} from "./models/IPassport";

@Database(CONFIG.arango)
export class AppDatabaseContext extends DatabaseContext
{
    @Collection() public users: Repository<IUser>;
    @Collection() public passports: Repository<IPassport>;
}