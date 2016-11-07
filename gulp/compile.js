const path = require("path");
const typescript = require("typescript");
const webpack = require("webpack");

const merge = require("merge-stream");

module.exports = function (gulp, plugins, paths, project)
{
    // Compile everything
    gulp.task("compile", ["compile-server", "compile-client"]);
    
    // Compile Server files
    gulp.task("compile-server", function ()
    {
        var serverDest = paths.build + "/server/";
        var tsConfigPath = paths.server + "/tsconfig.json";
        
        var tsProject = plugins.typescript
            .createProject(tsConfigPath, {
                typescript: typescript
            });
        
        var tsResult = tsProject.src()
            .pipe(plugins.typescript(tsProject));
        
        var tsTask = tsResult.js
            .pipe(plugins.debug({title: "[server] compiled:"}))
            .pipe(gulp.dest(serverDest));
        
        var filesToCopy = [
            `${paths.server}/**/*`,
            `!${paths.server}/**/*.ts`
        ];
        
        var copyTask = gulp.src(filesToCopy)
            .pipe(gulp.dest(serverDest));
        
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
};
