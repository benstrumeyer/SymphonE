import {AngularApp} from "../AngularApp";

class ElectronAppController
{

}

AngularApp.component("electronAppComponent", {
    controller: ElectronAppController,
    template: require("./ElectronApp.template.html")
});

