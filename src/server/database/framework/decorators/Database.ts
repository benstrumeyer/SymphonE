import {DatabaseContext} from "../context/DatabaseContext";
import {IDatabaseConfig} from "../context/IDatabaseConfig";
import {DatabaseConfig} from "../context/DatabaseConfig";

export function Database(config: IDatabaseConfig): ClassDecorator
{
    return function (constructor: { new(): DatabaseContext})
    {
        constructor.prototype.__dbConfig = new DatabaseConfig(config);
    } as ClassDecorator;
}