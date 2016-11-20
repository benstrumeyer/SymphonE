module.exports = function (gulp, plugins, paths, project)
{
    gulp.task("watch-server", function ()
    {
        return gulp.watch(`${paths.server}/**/*`, ["compile-server"]);
    });
    gulp.task("watch-client", function ()
    {
        return gulp.watch(`${paths.client}/**/*`, ["compile-client"]);
    });
};
