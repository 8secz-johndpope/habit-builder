const firebase = require('firebase');
const serviceAccount = require(process.env.HB_FIREBASE_SDK_FILE_PATH);

const config = {
  apiKey: process.env.HB_API_KEY,
  authDomain: serviceAccount.project_id + '.firebaseapp.com',
  databaseURL: 'https://' + serviceAccount.project_id + '.firebaseio.com',
  projectId: serviceAccount.project_id
}

firebase.initializeApp(config);

module.exports = {
  firebase: firebase
}