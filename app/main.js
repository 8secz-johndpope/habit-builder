const readArgument      = require('../utilities/read-command-line-arguments.js');
const Habit             = require('../firebase/habit.js')

function process() {
  if (readArgument.list) {
    return Habit.listHabits();
  }
  if (readArgument.add) {
    return Habit.createHabit(readArgument.add);
  }
  if (readArgument.del) {
    return Habit.deleteHabit(readArgument.habit);
  }
}

module.exports = {
  process: process
}