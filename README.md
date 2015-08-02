dokku-app-ssh
=============

Creates a dokku ssh command string from host, command and appName strings.
Handles edge cases for you.

Example:
```js
var sshParams = dokkuAppSsh('dokku.mydomain.com', 'logs -t', 'test-app');
```

Produces the string...
```
ssh -T dokku@dokku.mydomain.com -- logs test-app -t
```
