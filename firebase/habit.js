const firebaseClient    = require('../firebase/firebase-client.js');
const User              = require('../firebase/user.js');
const moment            = require('moment');
const _                 = require('lodash');
const chalk             = require('chalk');

let firebase    = firebaseClient.firebase;
let database    = firebase.database();

function createHabit(habitName) {
  let uid = User.getCurrentUser().uid;
  let newKey = database.ref().child('/habits').push().key;
  let updates = {}
  updates['/habits/' + newKey] = {
    uid: uid,
    name: habitName,
    days_in_a_row: 0,
    created_at: moment().valueOf()
  };
  database.ref().update(updates).then( (resp) => {
    console.log('Added Successfully!\nThe Habit Key is ' + newKey);
    process.exit();
  }).catch( (err) => {
    console.log('Error: ' + err);    
    process.exit();
  });
}

function listHabits() {
  let uid = User.getCurrentUser().uid;
  let $index = 1;
  let ref = database.ref('/habits/').orderByChild('uid').equalTo(uid)
  ref.on('child_added', (snapshot) => {
    let habit = snapshot.val();
    output =    $index + '. '      + habit.name + 
                ' - Key: '         + snapshot.key +
                ' - Days in row: ' + habit.days_in_a_row
    if (habit.until) {
      output += ' - Until: ' + moment(habit.until).format('DD/MM/YYYY')
    }
    console.log(output);
    $index += 1;
  });
  ref.once('value', (snapshot) => {
    process.exit();
  });
}

function deleteHabit(habitKey) {
  if (habitKey === null || habitKey === undefined) {
    console.log('Argument Error - Need to provide --habit $habitKey as well.')
    return process.exit();
  }

  database.ref('/habits/' + habitKey).remove().then( (resp) => {
    console.log('Removed Successfully!');
    process.exit();
  }).catch( (err) => {
    console.log('Error: ' + err);    
    process.exit();
  });
}

function deleteLog(habitKey, logKey) {
  if (habitKey === null || habitKey === undefined) {
    console.log('Argument Error - Need to provide --habit $habitKey as well.')
    return process.exit();
  }

  if (logKey === null || logKey === undefined) {
    console.log('Argument Error - Need to provide --log $logKey as well.')
    return process.exit();
  }

  database.ref('/habits/' + habitKey + '/logs/' + logKey).remove().then( (resp) => {
    console.log('Removed Successfully!');
    return updatingDaysInRow(habitKey);
  }).catch( (err) =>{
    console.log('Error: ' + err);    
    process.exit();
  })
}

function updatingDaysInRow(habitKey) {
  let ref = database.ref('/habits/' + habitKey + '/logs').orderByKey()
  let dateKeys = [];
  ref.once('value', (snapshot) => {
    snapshot.forEach((child) => {
      dateKeys.push(child.key);
    });
    let until = _.last(dateKeys);
    let days_in_a_row = 1;
    if (dateKeys.length == 1) {
      return updateHabit(habitKey, until, days_in_a_row, dateKeys.length);
    }
    let iterator = dateKeys.length - 2;
    let checkingDate = until;
    let gap = 1;
    do {
      let yesterday = moment(parseInt(checkingDate)).subtract(1, 'days').valueOf();
      let twoDaysAgo = moment(parseInt(checkingDate)).subtract(2, 'days').valueOf();
      if (parseInt(dateKeys[iterator]) != yesterday && parseInt(dateKeys[iterator]) != twoDaysAgo) {
        break;
      } else {
        checkingDate = dateKeys[iterator];
        days_in_a_row += 1;
        iterator -= 1;
      }
    } while (iterator >= 0)
    return updateHabit(habitKey, until, days_in_a_row, dateKeys.length);
  });
}

function showHabit(habitKey) {
  ref = database.ref('/habits/' + habitKey)
  ref.once('value', (snapshot) => {
    let habit = snapshot.val();
    let output = '\n\n';
    output += 'Showing ' + habitKey + ' - ' + habit.name + '\n';
    output += 'Until ' + moment(habit.until).format('DD/MM/YYYY') + 
              ", you've done it for " + habit.days_in_a_row.toString() + ' days in a row.\n';
    output += '\nDetails:\n';
    _.each(Object.keys(habit.logs), (log) => {
      output += moment(parseInt(log)).format('DD/MM/YYYY');
      output += ' - ' + log + '\n';
    });
    output += '\n';
    output = chalk.bold.magenta(output);
    console.log(output);
    console.log(chalk.bold.blue('Keep Going On!\n'));
    process.exit();
  });
}

function updateHabit(habitKey, until, days_in_a_row, dateKeysLength) {
  ref = database.ref('/habits/' + habitKey)
  ref.once('value', (snapshot) => {
    let updates = {}
    updates['/habits/' + habitKey] = {
      name: snapshot.val().name,
      logs: snapshot.val().logs,
      created_at: snapshot.val().created_at,
      uid: snapshot.val().uid,
      until: parseInt(until),
      days_in_a_row: days_in_a_row
    }
    database.ref().update(updates).then( (resp) => {
      console.log('Updated ' + habitKey);
      let output = '';
      if (days_in_a_row <= 1) {
        if (dateKeysLength == 1) {
          output = chalk.bold.blue("Good Job! Big Journeys begin with small steps!");
        } else {
          output = chalk.bold.blue("Begin Again? Don't give up!");
        }
      } else if (days_in_a_row <= 5) {
        output = chalk.bold.green('You did it! Come on! You can do it!');
      } else if (days_in_a_row <= 10) {
        output = chalk.bold.yellow('Well done! Keep fighting!');
      } else if (days_in_a_row <= 15) {
        output = chalk.bold.magenta('Wow! Do the impossible!');
      } else {
        output = chalk.bold.red("You are so brave! I'm so proud of you!");
      }
      console.log('\n\n');
      console.log(output);
      console.log('\n\n');
      process.exit();
    }).catch( (err) => {
      console.log('Error: ' + err);
      process.exit();
    });
  })
}

function loggingHabit(habitKey, days = 0) {
  let dateKey = moment().subtract(days, 'days').startOf('day');
  // Check if $habit exists?
  let ref = database.ref('/habits/' + habitKey) 
  ref.once('value', (snapshot) => {
    if (snapshot.exists()) {
      let updates = { }
      updates['/habits/' + habitKey + '/logs/' + dateKey.valueOf()] = {
        i_did_it: true,
        updated_at: moment().valueOf() 
      }
      database.ref().update(updates).then( (resp) => {
        console.log('Logged Successfully!');
        // Calculate and Update Days In Row
        return updatingDaysInRow(habitKey);
      }).catch( (err) => {
        console.log('Error: ' + err);
        process.exit();
      });
    } else {
      console.log(habitKey + ' not founded');
      process.exit();
    }
  });
}

module.exports = {
  createHabit:    createHabit,
  listHabits:     listHabits,
  deleteHabit:    deleteHabit,
  loggingHabit:   loggingHabit,
  deleteLog:      deleteLog,
  showHabit:      showHabit
}
