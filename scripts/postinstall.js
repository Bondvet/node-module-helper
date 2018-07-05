const { resolve } = require('path');
const { writeFileSync } = require('fs');

const pwd = process.cwd();
const pkgDir = resolve(__dirname, '..')

if (pwd === pkgDir) {
    console.info('in package directory – nothing to do here');
    process.exit(0);
}
console.info('SETTING UP', pwd, pkgDir)

const pkgFile = resolve(pwd, 'package.json');
const config = require(pkgFile);

const scripts = config.scripts || {};

function addScript(scripts, name, cmd) {
    const commands = [cmd];

    if (scripts[name]) {
        commands.unshift(scripts[name]);
    }

    scripts[name] = commands.join(' && ');
}

addScript(
    scripts,
     'prebuild', 
     'rm -Rf dist && mkdir -p dist && bondvet-copy-package'
);

addScript(scripts, 'build', 'babel src --out-dir dist --copy-files');
addScript(scripts, 'build:watch', 'nodemon');
addScript(scripts, 'publish', '(cd dist && yarn publish)');

config.nodemonConfig = {
    exec: 'yarn build',
    delay: '500',
    watch: 'src',
};

writeFileSync(pkgFile, JSON.stringify(config, null, 2));
