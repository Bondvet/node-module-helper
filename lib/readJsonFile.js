const { readFileSync } = require('fs');

module.exports = function(path) {
    return JSON.parse(readFileSync(path).toString());
};
