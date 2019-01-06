const { resolve, dirname } = require('path');
const { copyFileSync, existsSync, mkdirSync } = require('fs');

function ensureDirectoryForFile(file) {
  const directory = dirname(file);

  if (!existsSync(directory)) {
    // make sure the parent folder exists
    ensureDirectoryForFile(directory);
    mkdirSync(directory);
  }
}

function copyFile(src, target) {
  if (existsSync(target)) {
    console.info(`${target} already exists.`);
  } else {
    ensureDirectoryForFile(target);

    copyFileSync(src, target);
    console.info(`created ${target}`);
  }
}

function addConfigFile(pkdDir) {
  const configFile = resolve(pkdDir, '.circleci', 'config.yml');
  const srcFile = resolve(__dirname, '..', 'templates', 'circleci.yml');

  copyFile(srcFile, configFile);
}

function addPreCommitHook(pkgDir) {
  const hookFile = resolve(pkgDir, '.git', 'hooks', 'pre-commit');
  const srcFile = resolve(__dirname, '..', 'templates', 'pre-commit');

  copyFile(srcFile, hookFile);
}

function addCIConfig(pkdDir) {
  addConfigFile(pkdDir);
  addPreCommitHook(pkdDir);
}

module.exports = addCIConfig;
