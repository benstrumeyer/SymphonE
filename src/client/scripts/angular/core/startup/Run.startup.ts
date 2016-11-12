import {AngularApp} from "../../AngularApp";

// Configure Angular App Initialization
AngularApp.run(function ($rootScope, $state)
{
    $rootScope.pageTitle = "Home";

    $state.go("homeState");
});