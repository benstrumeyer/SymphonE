import {AngularApp} from "../../AngularApp";

class ActiveChatController{

}

AngularApp.component("homeComponent", {
    controller: ActiveChatController,
    template: require("./ActiveChat.template.html")
});