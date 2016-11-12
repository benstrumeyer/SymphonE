import {IStateProvider, IState} from "angular-ui-router";

import {AngularApp} from "../../AngularApp";

export function registerRoute(name: string, state: IState)
{
    AngularApp.config(function ($stateProvider: IStateProvider)
    {
        $stateProvider.state(name, state);
    });
}