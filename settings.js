const path = require('path');

module.exports = {
  PROJECT_DIR : __dirname,
  ENVIRONMENT_FILE_PATH: path.join(__dirname, '.env'),
  HELP_FILE: path.join(__dirname, 'arguments-list.txt')
};