#! /usr/bin/env node
require('dotenv').config()

const _                 = require('lodash');
const Preferences       = require('preferences');
const settings          = require('./settings.js');
const onBoarding        = require('./utilities/on-boarding.js');
const firstTime         = require('./utilities/is-first-time-usage.js');
const readArgument      = require('./utilities/read-command-line-arguments.js');
const baseUtilities     = require('./utilities/base.js');
const writeFile         = require('./utilities/write-file.js');
const User              = require('./firebase/user.js');
const Habit             = require('./firebase/user.js');
const firebaseClient    = require('./firebase/firebase-client.js');

// Clear CLI screen
require('clear')();
onBoarding.sayHello();

let firebase = firebaseClient.firebase;

if (readArgument.help) {
  // Print Arguments list
  onBoarding.printArgumentsList().then( response => {
    process.exit();  
  });
}

function handleEnvFile() {
  if (readArgument.json) {
    writeFile.toEnvFile('HB_FIREBASE_SDK_FILE_PATH', readArgument.json);
  } else {
    if (!process.env.HB_FIREBASE_SDK_FILE_PATH) {
      throw 'You need to pass json agrument.';
    }
  }
  writeFile.toEnvFile('HB_EMAIL', readArgument.email);
  writeFile.toEnvFile('HB_PASSWORD', readArgument.password);
}

function authenticateUser(email, password) {
  // Sign up Or Sign In
  return new Promise( (resolve, reject) => {
    User.getUserByEmail(email).then( (userRecord) => {
      // Sign In
      User.signIn(email, password).then((res) => {
        resolve(User.getCurrentUser());
      });
      
    }).catch( (err) => {
      if (err.errorInfo.code === 'auth/user-not-found'){
        // Sign Up
        User.createUser(email, password);
      }
      reject(err);
    });
  })
}

firstTime.isFirstTimeUsage().then( response => {
  if (response == true) {
    if (readArgument.email && readArgument.password) {
      handleEnvFile();
      User.getUserByEmail(readArgument.email).then( (userRecord) => {
        console.log('We have updated your Email & Password into Enviroment File.\n' + 
                    'So that Habit Builder is available to use next time.');
        process.exit();
      }).catch( (err) => {
        User.createUser(readArgument.email, readArgument.password);
      })
    } else { 
      firstTime.informForTheFirstTime();
      process.exit(); // break the process  
    };
  } else {
    // Sign In User Using .env file
    let email = process.env.HB_EMAIL
    let password = process.env.HB_PASSWORD
    authenticateUser(email, password).then( (response) => { 
      console.log('Login Successfully!');
      process.exit();
    });
  };
});
