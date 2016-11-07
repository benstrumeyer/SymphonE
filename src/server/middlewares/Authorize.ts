import * as _ from "lodash";

import {RequestHandler} from "express";
import {AuthWorker} from "../workers/AuthWorker";

// Use this to make routes require authorization
export function authorize(roles?: string[]): RequestHandler
{
    return function (request, response, next)
    {
        // User hasn't logged in, so send 401
        if (!request.user)
            return response.sendStatus(401);

        // If roles weren't provided, it means we are only checking for authenticated users
        // Then accept
        if (!roles)
            return next();

        // Roles were requested, User has logged in, let's check roles
        var userRoles = request.user.roles;

        // None of user's roles match the roles requested, send 401
        if (_.intersection(roles, userRoles).length === 0)
            return response.sendStatus(401);

        // Otherwise accept
        return next();
    };
}

// Use this to perform register on the register endpoint
export function register(): RequestHandler
{
    return (request, response, next) => AuthWorker.doRegister(request, response, next);
}

// Use this to perform login on the login endpoint
export function login(): RequestHandler
{
    return (request, response, next) => AuthWorker.doLogin(request, response, next);
}


