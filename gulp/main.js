// Gulp
const gulp = require("gulp");
const plugins = require("gulp-load-plugins")();
const path = require("path");

// Directories
var paths = {};

paths.root = path.join(__dirname, "..");
paths.projectJson = path.join(paths.root, "project.json");
paths.nodeModules = path.join(paths.root, "node_modules");
paths.jspmPackages = path.join(paths.root, "jspm_packages");

paths.build = path.join(paths.root, "build");
paths.deploy = path.join(paths.root, "deploy");
paths.project = path.join(paths.root, "src");

paths.client = path.join(paths.project, "client");
paths.server = path.join(paths.project, "server");

paths.public = path.join(paths.client, "__public");
paths.scripts = path.join(paths.client, "scripts");
paths.styles = path.join(paths.client, "styles");
paths.lib = path.join(paths.client, "lib");

// Global Package Info
var project = require(paths.projectJson);

// Default Task
gulp.task("default", ["deploy"]);

// Load the other tasks from files
require("./compile")(gulp, plugins, paths, project);
require("./build")(gulp, plugins, paths, project);
require("./run")(gulp, plugins, paths, project);

