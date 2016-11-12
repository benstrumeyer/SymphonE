import {AngularApp} from "../AngularApp";

export class AppController
{

}

AngularApp.component("appComponent", {
    controller: AppController,
    template: require("./App.template.html")
});

