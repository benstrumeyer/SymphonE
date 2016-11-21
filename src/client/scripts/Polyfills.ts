import fs = require("fs");

// Require files as plain text polyfill
require.extensions[".html"] = function (module, filename)
{
    module.exports = fs.readFileSync(filename, "utf8");
};