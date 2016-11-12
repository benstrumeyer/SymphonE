import {IStateProvider, IState} from "angular-ui-router";

import {AngularApp} from "../../AngularApp";

export function registerRoute(name: string, state: IState)
{
    AngularApp.config(function ($stateProvider: IStateProvider)
    {
        console.log(name, state);

        $stateProvider.state(name, state);
    });
}