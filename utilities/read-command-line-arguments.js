// parse Arguments
const userArgs = require('minimist')(process.argv.slice(2));

module.exports = {
  email: userArgs.email,
  password: userArgs.password,
  help: userArgs.help,
  jsonFilePath: userArgs.jsonFilePath,
  apiKey: userArgs.apiKey,
  list: userArgs.list,     // List Habits
  add: userArgs.add,       // Add a Habit
  del: userArgs.del,       // Delete a Habit
  show: userArgs.show,     // Show a Habit
  habit: userArgs.habit,   // Habit
  days: userArgs.days,     // X-Days-Ago
  tick: userArgs.tick,     // I Did it (Tick It)
  remove: userArgs.remove  // Remove a Log
}