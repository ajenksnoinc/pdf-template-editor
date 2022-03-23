const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "~": path.resolve(process.cwd(), "src/")
        }
    }
};
