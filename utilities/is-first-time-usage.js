const path = require('path');
const fs = require('fs');
const readline = require('readline');
const settings    = require('../settings.js');
const envFilePath = path.join(settings.PROJECT_DIR, '.env');
const lineReader = require('line-reader');

function checkingEnvFile() {
  let myMap = new Map();
  myMap.set('HABIT_BUILDER_FIREBASE_ADMIN_SDK_FILE_PATH', 1);
  myMap.set('USERNAME', 2);
  myMap.set('ACCESS_TOKEN', 3);
  const sumOfMyMap = 6;
  let sum = 0;
  return new Promise((resolve, reject) => {
    lineReader.eachLine(envFilePath, (line, last) => {
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
  // Step 3a: HABIT_BUILDER_FIREBASE_ADMIN_SDK_FILE_PATH
  // Step 3b: USERNAME
  // Step 3c: ACCESS_TOKEN
  // Returns true/false
  
  return new Promise((resolve, reject) => {
    fs.stat(envFilePath, (err, stats) => {
      if (err) {
        // File doesn't exist.
        resolve(true);
      } else {
        // fs.readFile(envFilePath, 'utf-8', (err, data) => {
        //   console.log(data);
        // });
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
  'isFirstTimeUsage': isFirstTimeUsage,
  'informForTheFirstTime': informForTheFirstTime
}