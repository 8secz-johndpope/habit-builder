#! /usr/bin/env node

var _           = require('lodash');
var chalk       = require('chalk');
var clear       = require('clear');
var figlet      = require('figlet');
var Preferences = require('preferences');
// var inquirer    = require('inquirer');
// var fs          = require('fs');

var userArgs = process.argv.slice(2);
var firstArg = userArgs[0];
clear();
firstArg = chalk.blue.underline.bold(firstArg);

figlet('Habit Builder', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    data = chalk.red(data);
    console.log(data);
    console.log('For the first time using Habit Builder, ' +
            'please take time to read the user guide and ' +
            'setup Firebase account for storing your data.');
    console.log('\n\n\n');
});
