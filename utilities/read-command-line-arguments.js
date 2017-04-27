// parse Arguments
const userArgs = require('minimist')(process.argv.slice(2));

module.exports = {
  email: userArgs.email,
  password: userArgs.password,
  help: userArgs.help,
  json: userArgs.json,
  list: userArgs.list,     // List Habits
  add: userArgs.add,     // Add a Habit
  del: userArgs.del, // Delete a Habit
  verbose: userArgs.verbose,     // Verbose - Show a Habit
  habit: userArgs.habit,     // Habit
  days: userArgs.days,     // X-Days-Ago
  tick: userArgs.tick,     // Did it (Tick It)
  finished: userArgs.finished,   // Mark Habit as Finished
  unfinished: userArgs.unfinished    // Mark Habit as Unfinished
}