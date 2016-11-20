const path = require("path");
const typescript = require("typescript");
const sassModuleImporter = require("sass-module-importer");
const merge = require("merge-stream");

module.exports = function (gulp, plugins, paths, project)
{
    const tsServer = createTsProject(paths.server + "/tsconfig.json");
    const tsClient = createTsProject(paths.client + "/tsconfig.json");
    
    // Compile everything
    gulp.task("compile", ["compile-server", "compile-client"]);
    
    // Compile Server files
    gulp.task("compile-server", function ()
    {
        var serverDest = paths.build + "/server/";
        
        var tsTask = tsServer.src()
            .pipe(plugins.changed(serverDest, {extension: ".js"}))
            .pipe(tsServer()).js
            .pipe(plugins.debug({title: "[server] compiled:"}))
            .pipe(gulp.dest(serverDest));
        
        var filesToCopy = [
            `${paths.server}/**/*`,
            `!${paths.server}/**/*.ts`,
            paths.packageJson
        ];
        
        var copyTask = gulp.src(filesToCopy)
            .pipe(gulp.dest(serverDest));
        
        return merge(copyTask, tsTask);
    });
    
    // Compile Client files
    gulp.task("compile-client", function ()
    {
        var clientDest = paths.build + "/client/";
        
        // Typescript
        var tsTask = tsClient.src()
            .pipe(plugins.changed(clientDest, {extension: ".js"}))
            .pipe(tsClient()).js
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.debug({title: "[client] scripts:"}))
            .pipe(gulp.dest(clientDest));
        
        // SASS
        var sassTask = gulp.src(paths.styles + "/main.scss")
            .pipe(plugins.sassGlob())
            .pipe(plugins.sass({importer: sassModuleImporter()}).on('error', plugins.sass.logError))
            .pipe(plugins.debug({title: "[client] styles:"}))
            .pipe(gulp.dest(clientDest + "/styles"));
        
        var filesToCopy = [
            `${paths.client}/**/*.*`,
            `!${paths.client}/**/*.ts`,
            `!${paths.client}/**/*.scss`,
            paths.packageJson
        ];
        
        // Copy Task
        var copyTask = gulp.src(filesToCopy)
            .pipe(plugins.debug({title: "[client] copied:"}))
            .pipe(gulp.dest(clientDest));
        
        return merge(copyTask, tsTask, sassTask);
    });
    
    /* Helpers */
    function createTsProject(configPath)
    {
        return plugins.typescript
            .createProject(configPath, {typescript: typescript});
    }
};
