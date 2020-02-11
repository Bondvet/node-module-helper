const { resolve } = require('path');
const { writeFileSync, existsSync } = require('fs');
const addBabelConfig = require('../lib/addBabelConfig');
const addNvmRc = require('../lib/addNvmRc');
const addCIConfig = require('../lib/addCIConfig');
const addPrettierRc = require('../lib/addPrettierRc');
const addEditorConfig = require('../lib/addEditorConfig');

const pwd = process.cwd();
const pkdDir = resolve(pwd, '..', '..', '..');
const pkgFile = resolve(pkdDir, 'package.json');
const pkgExists = existsSync(pkgFile);

if (!pkgExists) {
    console.info('no package.json found');
    process.exit(0);
}

const config = require(pkgFile);

const scripts = config.scripts || {};

function addScript(scripts, name, cmd) {
    if (!scripts[name]) {
        scripts[name] = cmd;
    }
}

addScript(
    scripts,
    'prebuild',
    'rm -rf dist/* && mkdir -p dist && bondvet-copy-package',
);
addScript(scripts, 'prebuild:watch', 'mkdir -p dist && bondvet-copy-package');

addScript(scripts, 'build', 'babel src --out-dir dist --copy-files');
addScript(
    scripts,
    'build:watch',
    'babel src --out-dir dist --copy-files --watch',
);
addScript(scripts, 'publish', '(cd dist && yarn publish)');
addScript(scripts, 'prepublish', 'yarn build');
addScript(scripts, 'dev', 'yarn build:watch');

config.scripts = scripts;

writeFileSync(pkgFile, JSON.stringify(config, null, 2));

addBabelConfig(pkdDir);
addNvmRc(pkdDir);
addCIConfig(pkdDir);
addPrettierRc(pkdDir);
addEditorConfig(pkdDir);
