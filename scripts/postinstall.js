const { resolve } = require('path');
const { writeFileSync, existsSync } = require('fs');

const pwd = process.cwd();
const pkgFile = resolve(pwd,'..', '..','..', 'package.json');
const pkgExists = existsSync(pkgFile);

if (!pkgExists) {
    console.info('no package.json found');
    process.exit(0);
}

const config = require(pkgFile);

const scripts = config.scripts || {};

function addScript(scripts, name, cmd) {
    const commands = [cmd];

    if (scripts[name] && scripts[name] !== cmd) {
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
config.scripts = scripts;

writeFileSync(pkgFile, JSON.stringify(config, null, 2));
