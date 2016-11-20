const path = require("path");

module.exports = function (gulp, plugins, paths, project)
{
    gulp.task("run-server", ["compile-server", "watch-server"], function ()
    {
        var serverPath = paths.build + "/server";
        
        plugins.nodemon({
            script: serverPath + "/Server.js",
            watch: [serverPath]
        });
    });
    
    gulp.task("run-client", ["compile-client", "watch-client"], function ()
    {
        var clientPath = paths.build + "/client";
        
        gulp.src(clientPath)
            .pipe(plugins.runElectron([], {cwd: clientPath}));
    });
};
