// parse Arguments
const userArgs = require('minimist')(process.argv.slice(2));

module.exports = {
  email: userArgs.email,
  password: userArgs.password,
  help: userArgs.help,
  SDKJsonPath: userArgs.SDKJsonPath
}