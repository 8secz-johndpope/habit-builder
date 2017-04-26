// parse Arguments
const userArgs = require('minimist')(process.argv.slice(2));

module.exports = {
  email: userArgs.email,
  password: userArgs.password,
  help: userArgs.help,
  json: userArgs.json,
  l: userArgs.l,     // List Habits
  a: userArgs.a,     // Add a Habit
  del: userArgs.del, // Delete a Habit
  v: userArgs.v,     // Verbose - Show a Habit
  h: userArgs.h,     // Habit
  d: userArgs.d,     // X-Days-Ago
  t: userArgs.t,     // Did it (Tick It)
  fi: userArgs.fi,   // Mark Habit as Finished
  uf: userArgs.uf    // Mark Habit as Unfinished
}