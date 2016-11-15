import {IStateService} from "angular-ui-router";

import {AngularApp} from "../../AngularApp";

// Configure Angular App Initialization
AngularApp.run(function ($rootScope, $state: IStateService)
{
    $rootScope.pageTitle = "Home";

    $state.go("homeState");
});