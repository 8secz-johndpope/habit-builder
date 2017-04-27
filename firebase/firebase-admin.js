let admin = require('firebase-admin');

const serviceAccount = require(process.env.HB_FIREBASE_SDK_FILE_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://' + serviceAccount.project_id + '.firebaseio.com'
});

module.exports = {
  admin: admin
}
