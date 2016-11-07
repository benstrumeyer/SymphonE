import {Database, Collection} from "arangojs";
import {DatabaseConfig} from "./DatabaseConfig";
import {DatabaseInitializer} from "../initializer/DatabaseInitializer";
import {Repository} from "../base/Repository";

export abstract class DatabaseContext
{
    // Configuration to connect to the database
    public __dbConfig: DatabaseConfig;

    // Core of ArangoDB
    public __core: Database;

    // Collections that will get initialized
    public __collectionNames: string[];

    public async setup(): Promise<this>
    {
        this.__core = await DatabaseInitializer.initDatabase(this.__dbConfig);

        for (let collectionName of this.__collectionNames)
        {
            let collection = this.__core.collection(collectionName);

            this[collectionName] = new Repository(collection);

            await DatabaseInitializer.initCollection(this[collectionName]);
        }

        return this;
    }
}