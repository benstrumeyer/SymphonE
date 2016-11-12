import {AngularApp} from "../../AngularApp";

export class KeyboardController
{

}

AngularApp.component("keyboardComponent", {
    controller: KeyboardController,
    template: require("./Keyboard.template.html")
});

