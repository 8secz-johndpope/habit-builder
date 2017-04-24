// Some Utilities that cannot categorized
const bcrypt = require('bcrypt-nodejs');

function encryptPassword(password) {
  return bcrypt.hashSync(password);
}

function comparePassword(password, encryptedPassword) {
  return bcrypt.compareSync(password, encryptedPassword);
}

module.exports = {
  encryptPassword: encryptPassword,
  comparePassword: comparePassword
}