import {Database, Collection} from "arangojs";
import {DatabaseConfig} from "../context/DatabaseConfig";

export class DatabaseInitializer
{
    public static async initDatabase(config: DatabaseConfig)
    {
        var databaseName = config.databaseName;

        var db = new Database({
            url: config.databaseUrl
        });

        try
        {
            // Try to switch to the app's database
            db.useDatabase(databaseName);
            await db.get() as any;
        }
        catch (err)
        {
            // Database doesn't exist, create it
            db.useDatabase("_system");
            await db.createDatabase(databaseName);

            // Switch back to app DB
            db.useDatabase(databaseName);
        }

        return db;
    }

    public static async initCollections(collections: Collection[])
    {
        for (let collection of collections)
        {
            await DatabaseInitializer.initCollection(collection);
        }
    }

    public static async initCollection(collection: Collection)
    {
        try
        {
            // Try to get the collection
            await collection.get() as any;
        }
        catch (err)
        {
            // Collection doesn't exist, create it
            await collection.create({});
        }
    }
}
