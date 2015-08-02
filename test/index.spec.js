/* global describe, it */
'use strict'

var expect = require('expect')
var dokkuAppSsh = require('../index')

describe('dokku-app-ssh', function () {
  describe('running logs command', function () {
    it('should build an ssh command string', function () {
      // arrange
      var host = 'msapp.co.nz'
      var appName = 'dokku-test'
      var command = 'logs'

      // act
      var sshParams = dokkuAppSsh(host, command, appName)

      // assert
      expect(sshParams)
        .toExist()
        .toBeA('string')
        .toEqual('ssh -T dokku@msapp.co.nz -- logs dokku-test')
    })
  })

  describe('running logs command with -t (tail)', function () {
    it('should build an ssh command string with -t flag', function () {
      // arrange
      var host = 'msapp.co.nz'
      var appName = 'dokku-test'
      var command = 'logs -t'

      // act
      var sshParams = dokkuAppSsh(host, command, appName)

      // assert
      expect(sshParams)
        .toExist()
        .toBeA('string')
        .toEqual('ssh -T dokku@msapp.co.nz -- logs dokku-test -t')
    })
  })

  describe('running without a ${command}', function () {
    describe('providing ${command} as an empty string', function () {
      it('should build an ssh command string without ${command}', function () {
        // arrange
        var host = 'msapp.co.nz'
        var appName = 'dokku-test'
        var command = ''

        // act
        var sshParams = dokkuAppSsh(host, command, appName)

        // assert
        expect(sshParams)
          .toExist()
          .toBeA('string')
          .toEqual('ssh -T dokku@msapp.co.nz')
      })
    })

    describe('providing ${command} as null', function () {
      it('should build an ssh command string without ${command}', function () {
        // arrange
        var host = 'msapp.co.nz'
        var appName = 'dokku-test'
        var command = null

        // act
        var sshParams = dokkuAppSsh(host, command, appName)

        // assert
        expect(sshParams)
          .toExist()
          .toBeA('string')
          .toEqual('ssh -T dokku@msapp.co.nz')
      })
    })
  })

  describe('running a ${command} without providing an ${appName}', function () {
    it('should error if command is not global', function () {
      // arrange
      var host = 'msapp.co.nz'
      var command = 'logs'

      // act/assert
      expect(function () {
        dokkuAppSsh(host, command)
      }).toThrow()
    })
    it('should not error if command is global', function () {
      // arrange
      var host = 'msapp.co.nz'
      var command = 'apps:list'

      // act
      var sshParams = dokkuAppSsh(host, command)

      // assert
      expect(sshParams)
        .toExist()
        .toBeA('string')
        .toEqual('ssh -T dokku@msapp.co.nz -- apps:list')
    })
  })
})
