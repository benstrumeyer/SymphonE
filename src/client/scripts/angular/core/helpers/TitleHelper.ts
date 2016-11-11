import {APP_META} from "./MetaHelper";

export function createPageTitle(title:string)
{
    return `${title} | ${APP_META.name}`;
}