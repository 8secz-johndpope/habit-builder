const readArgument      = require('../utilities/read-command-line-arguments.js');
const Habit             = require('../firebase/habit.js')

function process() {
  if (readArgument.list) {
    return Habit.listHabits();
  }
  if (readArgument.add) {
    return Habit.createHabit(readArgument.add);
  }
  if (readArgument.habit) {
    if (readArgument.del) {
      return Habit.deleteHabit(readArgument.habit);
    }
    if (readArgument.show) {
      return Habit.showHabit(readArgument.habit);
    }
    if (readArgument.tick) {
      return Habit.loggingHabit(readArgument.habit, readArgument.days);
    }
  } else {
    console.log('Argument Error!');
    process.exit();    
  }
}

module.exports = {
  process: process
}
