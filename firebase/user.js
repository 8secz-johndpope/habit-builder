const firebaseAdmin     = require('../firebase/firebase-admin.js');
const baseUtilities     = require('../utilities/base.js');
const firebaseClient    = require('../firebase/firebase-client.js');

let admin       = firebaseAdmin.admin;
let firebase    = firebaseClient.firebase;

function getCurrentUser() {
  return firebase.auth().currentUser;
}

function getUserByEmail(email) {
  return admin.auth().getUserByEmail(email);
}

function signIn(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function createUser(email, password) {
  // let encryptPassword = baseUtilities.encryptPassword(password);
  admin.auth().createUser({
    email: email,
    password: password,
    emailVerified: true
  }).then( (userRecord) => {
    console.log(userRecord);
    return signIn(email, password);
  }).catch ( (err) => {
    console.log(err);
    process.exit();
  });
}

module.exports = {
  getUserByEmail: getUserByEmail,
  createUser: createUser,
  signIn: signIn,
  getCurrentUser: getCurrentUser
}