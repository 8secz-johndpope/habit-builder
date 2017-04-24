const firebaseConnector = require('../firebase/firebase-connector.js');
const baseUtilities     = require('../utilities/base.js');

let admin = firebaseConnector.admin;

function getUserByEmail(email) {
  admin.auth().getUserByEmail(email)
    .then((userRecord) => {
      console.log('Successfully fetched user data:', userRecord.toJSON());
    })
    .catch((err) => {
      console.log('Error fetching user data:', error);
    });
}

function createUser(email, password) {
  console.log(baseUtilities.encryptPassword(password));
}

module.exports = {
  getUserByEmail: getUserByEmail,
  createUser: createUser
}