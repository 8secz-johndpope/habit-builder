#! /usr/bin/env node
require('dotenv').config()

const _           = require('lodash');
const chalk       = require('chalk');
const figlet      = require('figlet');
const Preferences = require('preferences');
const settings    = require('./settings.js');

// Clear CLI screen
require('clear')();

// parse Arguments
const userArgs = require('minimist')(process.argv.slice(2));
const firstTime = require('./utilities/is-first-time-usage.js');

figlet('Habit Builder', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    data = chalk.red(data);
    console.log(data);
    firstTime.isFirstTimeUsage().then(result => {
      console.log(result);
      if (result == true) {
        firstTime.informForTheFirstTime();
        process.exit(); // break the process
      } else {
        // Conitnue
      };
    });
});


// const admin = require("firebase-admin");

// const serviceAccount = require(process.env.HABIT_BUILDER_FIREBASE_ADMIN_SDK_FILE_PATH);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://habit-builder-9d122.firebaseio.com"
// });

// TODO: Import Firebase Admin SDK serviceAccountKey
// Place Your serviceAccountKey.json path into .env
// Follow the instruction from https://firebase.google.com/docs/admin/setup to create
// a serviceAccountKey.

// https://firebase.google.com/docs/auth/admin/manage-users
// Create a User in the first-time usage.
// habit-builder -u viphat@gmail.com -p 12345678 