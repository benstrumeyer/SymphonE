import {AngularApp} from "../AngularApp";

class AppController
{

}

AngularApp.component("appComponent", {
    controller: AppController,
    template: require("./App.template.html")
});

