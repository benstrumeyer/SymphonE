module.exports = function (gulp, plugins, paths, project)
{
    gulp.task("watch-server", function ()
    {
        return gulp.watch(`${paths.server}/**/*`, ["compile-server"]);
    });
};
