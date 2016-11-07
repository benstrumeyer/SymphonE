import {AngularApp} from "../../AngularApp";

// Configure Angular App Initialization
AngularApp.run(function ($rootScope)
{
    $rootScope.pageTitle = "Home";
});