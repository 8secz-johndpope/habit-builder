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

// habit-builder -l
// habit-builder -a 'Read at least 30 pages of books everyday'
// habit-builder -h $habit -v
// habit-builder -h $habit --del
// If there isn't a related parameter, default is today.
// habit-builder -h $habit -t
// habit-builder -h $habit -t -d 1
// habit-builder -h $habit --fi
// habit-builder -h $habit --uf

const firebaseClient    = require('../firebase/firebase-client.js');



