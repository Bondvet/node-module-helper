const { resolve } = require('path');
const { writeFileSync, existsSync } = require('fs');

function addNvmRc(pkgDir) {
  const nvmRcFile = resolve(pkgDir, '.nvmrc');

  if (existsSync) {
    console.info(`${nvmRcFile} already exists.`);
  } else {
    writeFileSync(nvmRcFile, 'v8.11.2\n');
    console.info(`created ${nvmRcFile}`);
  }
}

module.exports = addNvmRc;
