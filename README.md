dokku-app-ssh
=============

[![NPM](https://nodei.co/npm/dokku-app-ssh.png?compact=true)](https://npmjs.org/package/dokku-app-ssh)
[![Build Status](https://travis-ci.org/digitalsadhu/dokku-app-ssh.svg?branch=master)](https://travis-ci.org/digitalsadhu/dokku-app-ssh)

Creates a dokku ssh command string from host, command and appName strings.
Handles edge cases for you.

## Installation

```
npm install dokku-app-ssh
```

## Usage

Require module

```js
var dokkuAppSsh = require('dokku-app-ssh');
```

Use module passing host, command and app name
```js
var host = 'dokku.mydomain.com';
var command = 'logs -t';
var appName = 'test-app';

var sshParams = dokkuAppSsh(host, command, appName);
```

`sshParams` is now the string...
```
ssh -T dokku@dokku.mydomain.com -- logs test-app -t
```
