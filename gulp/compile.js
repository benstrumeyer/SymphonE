const path = require("path");
const typescript = require("typescript");
const webpack = require("webpack");

const merge = require("merge-stream");

module.exports = function (gulp, plugins, paths, project)
{
    const tsServer = createTsProject(paths.server + "/tsconfig.json");
    const tsApp = createTsProject(paths.app + "/tsconfig.json");
    
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
    
    // Compile App files
    gulp.task("compile-app", function (callback)
    {
        var appDest = paths.build + "/app/";
    
        var tsTask = tsApp.src()
            .pipe(plugins.cache("app"))
            .pipe(tsApp()).js
            .pipe(plugins.debug({title: "[app] compiled:"}))
            .pipe(gulp.dest(appDest));
        
        var filesToCopy = [
            `${paths.app}/**/*`,
            `!${paths.app}/**/*.ts`,
            paths.packageJson
        ];
        
        var copyTask = gulp.src(filesToCopy)
            .pipe(gulp.dest(appDest));
        
        return merge(copyTask, tsTask);
    });
    
    // Compile Client files
    gulp.task("compile-client", function (callback)
    {
        var webpackConfig = require(path.join(paths.root, "webpack.config"));
        
        // Add optimization plugins to config
        // webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
        // webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
        
        webpack(webpackConfig, function (err, stats)
        {
            if (err)
                throw new plugins.util.PluginError("webpack", err);
            
            plugins.util.log("[webpack]", stats.toString({colors: true}));
            
            callback();
        });
    });
    
    /* Helpers */
    function createTsProject(configPath)
    {
        return plugins.typescript
            .createProject(configPath, {typescript: typescript});
    }
};
