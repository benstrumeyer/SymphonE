import {AngularApp} from "../../AngularApp";

// Configure Angular App Routes
AngularApp.config(function ($locationProvider)
{
    $locationProvider.html5Mode(false);
});