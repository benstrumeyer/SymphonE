import {LOGGER} from "../../helpers/Logger";
import {Database, Collection} from "arangojs";
import {DatabaseContainer} from "../../database/DatabaseContainer";

export class DatabaseBootstrapper
{
    public static async init()
    {
        LOGGER.info("Connecting to ArangoDB...");

        await DatabaseContainer.getContext();
    }
}