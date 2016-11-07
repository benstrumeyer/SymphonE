const del = require("del");
const merge = require("merge-stream");
const runSequence = require("run-sequence");

module.exports = function(gulp, plugins, paths, project)
{
    gulp.task("clean", function (callback)
    {
        return del(paths.build + "/**", {force: true}, callback);
    });
    
    // Build App
    gulp.task("build", function (callback)
    {
        runSequence(
            "clean",
            "update-package-info",
            "compile",
            callback
        );
    });
        
    // Update Assembly Info
    gulp.task("update-package-info", function ()
    {
        // Update package.json Info
        var packageJson = gulp.src(paths.root + "/package.json")
            .pipe(plugins.debug({title: "package.json:"}))
            .pipe(plugins.jsonEditor({
                name: project.meta.project,
                version: project.meta.version,
                description: project.meta.description,
                copyright: project.meta.copyright,
                author: project.meta.author
            }))
            .pipe(gulp.dest(paths.root));
        
        // Update meta.json Info
        var metaJson = gulp.src(paths.projectJson)
            .pipe(plugins.debug({title: "project.json:"}))
            .pipe(plugins.jsonEditor(() => project.meta))
            .pipe(plugins.rename({
                basename: "meta"
            }))
            .pipe(gulp.dest(paths.scripts));
        
        return merge(packageJson, metaJson);
    });
    
    // Deploy App
    gulp.task("deploy", function ()
    {
        var serverPaths = [
            paths.build + "/server/**/*",
            paths.root + "/pacakge.json"
        ];
        
        var clientPaths = [
            paths.build + "/client/**"
        ];
        
        var server = gulp.src(serverPaths, {base: paths.root})
            .pipe(plugins.zip("server.zip", {compress: true}))
            .pipe(gulp.dest(paths.deploy));
        
        var client = gulp.src(clientPaths)
            .pipe(plugins.zip("client.zip", {compress: true}))
            .pipe(gulp.dest(paths.deploy));
        
        return merge(server, client);
    });
};
