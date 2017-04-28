const fs          = require('fs');
const readline    = require('readline');
const settings    = require('../settings.js');
const lineReader  = require('line-reader');

function checkingEnvFile() {
  let myMap = new Map(); // ES6 Map data structure
  myMap.set('HB_FIREBASE_SDK_FILE_PATH', 1);
  myMap.set('HB_EMAIL', 2);
  myMap.set('HB_PASSWORD', 3);
  myMap.set('HB_API_KEY', 5);
  myMap.set('HB_MESSAGING_SENDER_ID', 8);
  const sumOfMyMap = 19;
  let sum = 0;
  return new Promise((resolve, reject) => {
    lineReader.eachLine(settings.ENVIRONMENT_FILE_PATH, (line, last) => {
      if (line) {
        let val = myMap.get(line.split('=')[0]);
        if (typeof val == 'number') {
          sum += val;
        }
      }
    }, (err) => {
      if (err) return reject(err);
      // I'm done.
      if (sum == sumOfMyMap) {
        resolve(false);
      } else {
        resolve(true);
      }
    }); // lineReader
  }); // Promise
}

function isFirstTimeUsage() {
  // Step 1: Check if .env exists?
  // Step 2: Read .env file
  // Step 3: Check if some environment variables haven't have values?
  // Step 3a: HB_FIREBASE_SDK_FILE_PATH
  // Step 3b: HB_EMAIL
  // Step 3c: HB_PASSWORD
  // Step 3c: HB_API_KEY
  // Step 3c: HB_MESSAGING_SENDER_ID
  // Returns true/false
  
  return new Promise((resolve, reject) => {
    fs.stat(settings.ENVIRONMENT_FILE_PATH, (err, stats) => {
      if (err) {
        // File doesn't exist.
        resolve(true);
      } else {        
        resolve(checkingEnvFile());
      }
    });
  })
}

function informForTheFirstTime() {
  console.log('For the first-time using Habit Builder, ' +
            'please take time to read the user guide and ' +
            'setup Firebase account for storing your habit data.')
  console.log('\n');
}

module.exports = {
  isFirstTimeUsage: isFirstTimeUsage,
  informForTheFirstTime: informForTheFirstTime
}
