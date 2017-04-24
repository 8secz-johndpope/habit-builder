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
const firebaseClient    = require('./firebase/firebase-client.js');

// Clear CLI screen
require('clear')();
onBoarding.sayHello();

let firebase = firebaseClient.firebase;

if (readArgument.help) {
  // Print Arguments list
  onBoarding.printArgumentsList().then( result => {
    process.exit();  
  });
}

function handleEnvFile() {
  if (readArgument.SDKJsonPath) {
    writeFile.toEnvFile('HB_FIREBASE_SDK_FILE_PATH', readArgument.SDKJsonPath);
  } else {
    if (!process.env.HB_FIREBASE_SDK_FILE_PATH) {
      throw 'You need to pass SDKJsonPath agrument.';
    }
  }
  writeFile.toEnvFile('HB_EMAIL', readArgument.email);
  writeFile.toEnvFile('HB_PASSWORD', readArgument.password);
}

function authenticateUser() {
  // Sign up Or Sign In
  User.getUserByEmail(readArgument.email).then( (userRecord) => {
    // Sign In
    User.signIn(readArgument.email, readArgument.password).then((res) => {
      console.log('Sign in successful.');
      console.log(User.getCurrentUser());
      process.exit();
    });
    
  }).catch( (err) => {
    if (err.errorInfo.code === 'auth/user-not-found'){
      // Sign Up
      User.createUser(readArgument.email, readArgument.password);
    } else {
      process.exit();
    }
  });
}

firstTime.isFirstTimeUsage().then(result => {
  if (result == true) {
    if (readArgument.email && readArgument.password) {
      handleEnvFile();
      authenticateUser();
    } else { 
      firstTime.informForTheFirstTime();
      process.exit(); // break the process  
    };
  } else {
    // Authenticate with Email & Access Token
    
  };
});
