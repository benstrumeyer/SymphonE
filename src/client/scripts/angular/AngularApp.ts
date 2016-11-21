import glob = require("glob");
import path = require("path");

import * as angular from "angular";

// Init the angular module
angular.module("AngularApp", [
    "ngSanitize",
    "ngAnimate",
    "ngMessages",
    "ui.router",
    "ui.bootstrap",
    "toastr"
]);

// Glob require all the angular app files
var coreFiles = glob.sync(path.join(__dirname, "./core/**/*.js"));
var appFiles = glob.sync(path.join(__dirname, "./app/**/*.js"));
coreFiles.concat(appFiles).forEach(path => require(path));

console.log("LOOK MA! I WORK FROM ANGULAR!");

// Global Angular App Declaration
export const AngularApp = angular.module("AngularApp");

