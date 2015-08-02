// var spawn = require('child_process').spawn
var assert = require('assert')

var globalCommands = [
  'apps:create',
  'apps:destroy',
  'apps:list',
  'backup:export',
  'backup:import',
  'plugins-install',
  'plugins',
  'plugins-update',
  'ps:rebuildall',
  'ps:restartall',
  'version',
  'help',
  'apps'
]

// examples:
// global: ssh -T dokku@msapp.co.nz apps:list
// app specific:  ssh -T dokku@msapp.co.nz logs dokku-test -t

// host: example: msapp.co.nz
// appName: example: dokku-test
// command: example: logs -t
module.exports = function (host, command, appName) {
  assert(typeof host === 'string', '${host} must be provided and be a string')

  var commandParameters = []
  if (command) {
    commandParameters = command.split(' ')
    var cmd = commandParameters.shift()

    //global command or appName is provided
    assert(globalCommands.indexOf(cmd) !== -1 || appName,
      '${appName} must be provided if ${command} is not a global command')
  }

  var sshParams = ['ssh', '-T', 'dokku@' + host]

  if (cmd) {
    sshParams.push('--')
    sshParams.push(cmd)

    if (globalCommands.indexOf(cmd) === -1) sshParams.push(appName)
  }

  return sshParams
    .concat(commandParameters)
    .join(' ')
    .trim()
}
