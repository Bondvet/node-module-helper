#!/usr/bin/env node

const { resolve } = require('path');
const { writeFileSync } = require('fs');
const { omit, set } = require('lodash');

const pwd = process.cwd();
const config = require(resolve(pwd, 'package.json'));

const output = resolve(pwd, 'dist', 'package.json');

writeFileSync(
  output,
  JSON.stringify(
    set(
      omit(config, 'devDependencies', 'scripts', 'nodemonConfig'),
      'private',
      false,
    ),
    null,
    2,
  ),
);
