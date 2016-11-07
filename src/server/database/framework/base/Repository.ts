import {Cursor, DocumentCollection} from "arangojs";

import {IModel} from "./IModel";

export class Repository<TModel extends IModel>
{
    private collection: DocumentCollection;

    constructor(collection)
    {
        this.collection = collection;
    }

    public get(): DocumentCollection
    {
        return this.collection;
    }

    /* Multiple Document Query functions */

    public async all(opts?: any): Promise<Cursor>
    {
        return await this.collection.all(opts);
    }

    public async filter(criteria: Object, opts?: any): Promise<Cursor>
    {
        return await this.collection.byExample(criteria, opts);
    }

    /* Single Document Query functions */

    public async any(): Promise<TModel>
    {
        return await this.collection.any() as TModel;
    }

    public async find(criteria: Object): Promise<TModel>
    {
        try
        {
            return await this.collection.firstExample(criteria) as TModel;
        }
        catch (err)
        {
            return null;
        }
    }

    public async findById(entityId: string): Promise<TModel>
    {
        try
        {
            return await this.collection.document(entityId) as TModel;
        }
        catch (err)
        {
            return null;
        }
    }

    public async exists(entityId: string): Promise<boolean>
    {
        try
        {
            await this.findById(entityId);
            return true;
        }
        catch (err)
        {
            return false;
        }
    }

    /* Manipulation Functions */

    public async save(document: TModel): Promise<TModel>
    {
        return await this.collection.save(document) as TModel;
    }

    public async update(entityId: string, update: Object, opts?: any): Promise<TModel>
    {
        return await this.collection.update(entityId, update, opts) as TModel;
    }

    public async remove(entityId: string, opts?: any): Promise<TModel>
    {
        // This line will throw error if entity with the given ID was not found
        return await this.collection.remove(entityId, opts) as TModel;
    }
}