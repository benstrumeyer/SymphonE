import * as angular from "angular";
import IModule = angular.IModule;

var app = angular.module("AngularApp",
    [
        "ngSanitize",
        "ngAnimate",
        "ngMessages",
        "ui.router",
        // "ui.bootstrap",
        "toastr"
    ]);

console.log("LOOK MA! I WORK FROM ANGULAR!");

// Global Angular App Declaration
export const AngularApp = app as IModule;