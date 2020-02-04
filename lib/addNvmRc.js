const { resolve } = require('path');
const { writeFileSync, existsSync } = require('fs');

function addNvmRc(pkgDir) {
    const nvmRcFile = resolve(pkgDir, '.nvmrc');

    if (existsSync(nvmRcFile)) {
        console.info(`${nvmRcFile} already exists.`);
    } else {
        writeFileSync(nvmRcFile, 'v10.16.0\n');
        console.info(`created ${nvmRcFile}`);
    }
}

module.exports = addNvmRc;
