const { resolve } = require('path');
const { writeFileSync, existsSync } = require('fs');
const { isArray } = require('lodash');

const readJsonFile = require('./readJsonFile');

function addPlugin(config, plugin) {
  if (!config.plugins.includes(plugin)) {
    config.plugins.push(plugin);
  }
}

function getPresetName(preset) {
  return isArray(preset) ? preset[0] : preset;
}

function addPreset(config, preset) {
  const presetName = getPresetName(preset);

  const idx = config.presets.findIndex(other => {
    const otherName = getPresetName(other);

    return otherName === presetName;
  });

  if (idx === -1) {
    config.presets.push(preset);
  }
}

module.exports = function(pkdDir) {
  const babelConfig = readJsonFile(resolve(__dirname, '..', '.babelrc'));
  const targetBabelFile = resolve(pkdDir, '.babelrc');
  const targetBabelConfig = existsSync(targetBabelFile)
    ? readJsonFile(targetBabelFile)
    : { plugins: [], presets: [] };

  babelConfig.plugins.forEach(plugin => addPlugin(targetBabelConfig, plugin));
  babelConfig.presets.forEach(preset => addPreset(targetBabelConfig, preset));

  writeFileSync(targetBabelFile, JSON.stringify(targetBabelConfig, null, 2));
};
