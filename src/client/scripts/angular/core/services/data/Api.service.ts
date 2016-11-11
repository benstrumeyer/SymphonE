import {IHttpService, IHttpPromiseCallbackArg, IRequestShortcutConfig} from "angular";

import {AngularApp} from "../../../AngularApp";
import {API_BASE_URL} from "../../config/Constants.config";
import {IPayload} from "../../models/IPayload";

export class ApiService
{
    public get: (apiUrl: string, config?: IRequestShortcutConfig) => Promise<IHttpPromiseCallbackArg<IPayload>>;
    public head: (apiUrl: string, config?: IRequestShortcutConfig) => Promise<IHttpPromiseCallbackArg<IPayload>>;

    public post: (apiUrl: string, data: any, config?: IRequestShortcutConfig) => Promise<IHttpPromiseCallbackArg<IPayload>>;
    public put: (apiUrl: string, data: any, config?: IRequestShortcutConfig) => Promise<IHttpPromiseCallbackArg<IPayload>>;
    public patch: (apiUrl: string, data: any, config?: IRequestShortcutConfig) => Promise<IHttpPromiseCallbackArg<IPayload>>;

    constructor(private $http: IHttpService)
    {
        this.bindMethods("get", "head");
        this.bindMethodsWithData("post", "put", "patch");
    }

    private bindMethods(...methods: string[])
    {
        for (let method of methods)
        {
            this[method] = function (apiUrl, config)
            {
                return this.$http[method](API_BASE_URL + apiUrl, config);
            };
        }
    }

    private bindMethodsWithData(...methods: string[])
    {
        for (let method of methods)
        {
            this[method] = function (apiUrl, data, config)
            {
                return this.$http[method](API_BASE_URL + apiUrl, data, config);
            };
        }
    }
}

AngularApp.service("ApiService", ApiService);