// Data Schema
// habits: {
//   '$habit': {
//     uid: $uid,
//     name: 'Read at least 30 pages of books everyday',
//     days_in_a_row: 0,
//     finished: false,
//     logs: {
//       '$log': {
//          did_it: true
//          date: 1491350400000
//        }
//     }
//   }
// }

const firebaseClient    = require('../firebase/firebase-client.js');
const User              = require('../firebase/user.js');
const moment            = require('moment');
const _                 = require('lodash');

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
    console.log($index + '. ' + habit.name + 
                ' - Key: ' + snapshot.key +
                ' - Days in row: ' + habit.days_in_a_row +
                ' - Added at: ' + moment(habit.created_at).format('DD/MM/YYYY') )
    $index += 1;
  });
  ref.once('value', (snapshot) => {
    process.exit();
  });
}

function deleteHabit(habitKey) {
  if (habitKey === null || habitKey == undefined) {
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

module.exports = {
  createHabit: createHabit,
  listHabits: listHabits,
  deleteHabit: deleteHabit
}



