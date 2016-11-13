import {AngularApp} from "../../AngularApp";

// HTTP Configuration, like cookie, JWT and error handling
AngularApp.config(function ($httpProvider)
{
    $httpProvider.defaults.withCredentials = true;
});