// On Boarding Utilities

const chalk        = require('chalk');
const figlet       = require('figlet');
const fs           = require('fs');
const settings     = require('../settings.js');

function sayHello() {
  figlet('Habit Builder', function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      data = chalk.red(data);
      console.log(data); // Print Habit Builder Figlet.
  });
}

function printArgumentsList() {
  return new Promise((resolve, reject) => {
    fs.stat(settings.HELP_FILE, (err, stats) => {
      if (err) throw(err);
      fs.readFile(settings.HELP_FILE, 'utf-8', (err, data) => {
        if (err) throw(err);
        console.log(data);
        resolve();
      }); //fs.readFile
    }); //fs.stat
  }); 
}

module.exports = {
  sayHello: sayHello,
  printArgumentsList: printArgumentsList
}