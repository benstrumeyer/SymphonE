import {AngularApp} from "../../../AngularApp";

AngularApp.service("ApiService", function ($http, ConstantsService)
{
    var self = this;

    var baseUrl = ConstantsService.apiBaseUrl;

    var bindMethods = function (...methods: string[])
    {
        for (let method of methods)
        {
            self[method] = function (apiUrl, config)
            {
                return $http[method](baseUrl + apiUrl, config);
            };
        }
    };

    var bindMethodsWithData = function (...methods: string[])
    {
        for (let method of methods)
        {
            self[method] = function (apiUrl, data, config)
            {
                return $http[method](baseUrl + apiUrl, data, config);
            };
        }
    };

    bindMethods("get", "delete", "head", "jsonp");
    bindMethodsWithData("post", "put", "patch");
});