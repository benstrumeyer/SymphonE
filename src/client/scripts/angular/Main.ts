import glob = require("glob");
import path = require("path");

// Glob require all the angular app files
var coreFiles = glob.sync(path.join(__dirname, "./core/**/*.js"));
var appFiles = glob.sync(path.join(__dirname, "./app/**/*.js"));

["./AngularApp"]
    .concat(coreFiles)
    .concat(appFiles)
    .forEach(path => require(path));