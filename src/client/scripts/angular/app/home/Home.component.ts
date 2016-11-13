import {AngularApp} from "../../AngularApp";
import {registerRoute} from "../../core/helpers/RoutingHelper";

class HomeController
{

}

AngularApp.component("homeComponent", {
    controller: HomeController,
    template: require("./Home.template.html")
});

registerRoute("homeState", {
    url: "/",
    template: "<home-component></home-component>"
});

