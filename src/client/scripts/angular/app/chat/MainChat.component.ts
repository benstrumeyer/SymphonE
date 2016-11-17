import {AngularApp} from "../../AngularApp";

class MainChatController {

}

AngularApp.component("mainChatComponent", {
    controller: MainChatController,
    template: require("./MainChat.template.html")
});