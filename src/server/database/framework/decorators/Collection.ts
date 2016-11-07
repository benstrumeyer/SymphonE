import {DatabaseContext} from "../context/DatabaseContext";

export function Collection(collectionName?: string): PropertyDecorator
{
    return function (target:DatabaseContext, propertyKey: string)
    {
        target.__collectionNames = target.__collectionNames || [];
        target.__collectionNames.push(collectionName || propertyKey);
    }
}