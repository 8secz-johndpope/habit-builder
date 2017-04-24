let admin = require('firebase-admin');

const serviceAccount = require(process.env.HB_FIREBASE_SDK_FILE_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://' + serviceAccount.project_id + '.firebaseio.com'
});

module.exports = {
  admin: admin
}

// TODO: Import Firebase Admin SDK serviceAccountKey
// Place Your serviceAccountKey.json path into .env
// Follow the instruction from https://firebase.google.com/docs/admin/setup to create
// a serviceAccountKey.

// https://firebase.google.com/docs/auth/admin/manage-users
// Create a User in the first-time usage.
// habit-builder --email viphat@gmail.com --password 123456