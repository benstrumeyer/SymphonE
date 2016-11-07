import {AppDatabaseContext} from "./AppDatabaseContext";

export class DatabaseContainer
{
    public static async getContext(): Promise<AppDatabaseContext>
    {
        var context = new AppDatabaseContext();
        return await context.setup();
    }
}
