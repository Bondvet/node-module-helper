const { resolve } = require('path');
const { copyFileSync, existsSync } = require('fs');

function copyFile(filename, { srcFolder = resolve(__dirname, '..') } = {}) {
    return function(pkgDir) {
        const targetFile = resolve(pkgDir, filename);

        if (existsSync(targetFile)) {
            console.info(`${targetFile} already exists.`);
        } else {
            copyFileSync(resolve(srcFolder, filename), targetFile);
            console.info(`created ${targetFile}`);
        }
    };
}

module.exports = copyFile;
