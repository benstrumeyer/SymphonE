import * as angular from "angular";

// Init the angular module
angular.module("AngularApp", [
    "ngSanitize",
    "ngAnimate",
    "ngMessages",
    "ui.router",
    // "ui.bootstrap",
    "toastr"
]);

// Global Angular App Declaration
export const AngularApp = angular.module("AngularApp");

console.log("LOOK MA! I WORK FROM ANGULAR!");

