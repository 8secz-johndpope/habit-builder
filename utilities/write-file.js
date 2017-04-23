const fs           = require('fs');
const settings     = require('../settings.js');
const touch        = require('touch');

function replaceKeyInEnvFile(key, value) {
  // pretends that Env File existed.
  // pretends that Key is included in Env File.
  fs.readFile(settings.ENVIRONMENT_FILE_PATH, 'utf-8', (err, data) => {
    if (err) throw err;
    let searchValue = key + '=' + eval('process.env.' + key);
    let newValue = key + '=' + value;
    let replaced = data.replace(searchValue, newValue);
    fs.writeFile(settings.ENVIRONMENT_FILE_PATH, replaced, 'utf-8', (err) => {
      if (err) throw err;
    });
  });
}

function toEnvFile(key, value) {
  if (eval('process.env.' + key)) {
    if (eval('process.env.' + key) != value) {
      replaceKeyInEnvFile(key, value);
    }
    return;
  }

  fs.stat(settings.ENVIRONMENT_FILE_PATH, (err, stats) => {
    if (err) {
      // touch .env
      touch.sync(settings.ENVIRONMENT_FILE_PATH);
      toEnvFile(key, value);
    } else {
      // Write to File
      let str = key + '=' + value + '\n';
      fs.appendFileSync(settings.ENVIRONMENT_FILE_PATH, str);
    }
  });
}

module.exports = {
  toEnvFile: toEnvFile
}