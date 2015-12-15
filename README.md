# fastlane-pem

[![NPM version](https://badge.fury.io/js/fastlane-pem.png)](http://badge.fury.io/js/fastlane-pem)
[![Build Status](https://travis-ci.org/Georgette/fastlane-pem.svg?branch=master)](https://travis-ci.org/Georgette/fastlane-pem)
[![Coverage Status](https://coveralls.io/repos/Georgette/fastlane-pem/badge.png?branch=master)](https://coveralls.io/r/Georgette/fastlane-pem?branch=master)

Node wrapper for [Ruby Fastlane PEM](https://github.com/fastlane/PEM) module

## example

```javascript

var pem = require('fastlane-pem')

pem({user:'gege', output:'/'}, (err, result) => {
    console.log(`STDOUT:\n${result.stdout}`)
    console.log(`STDERR:\n${result.stderr}`)

    if (err) {
        if (err.killed) console.error(`Terminated: ${err.signal}`)
        if (err.code) console.error(`Exit Code: ${err.code}`)
        console.error(err.message)
})

```

## api

# pem([options], [cb])

pem accepts optional options and callback, see tables below for all possibilities.

### PEM Options

|PEM Option |Example|Description|Command Executed|
|-------------|-------|-----------|----------------|
| identifier(string)  | {identifier:'myapp'} | The bundle identifier of your app | -a {identifier} |
| output(string)      | { output: outputDirectoryPath } | generates the pem profile in a specific directory | -e {outputDirectoryPath} |                                                                                                                  | user (string)       |  { user:username } | Your Apple ID Username | -u {user} |
| p12Password(string)      | { p12Password: 'password' } | The password that is used for your p12 file  | -p {p12Password} |                                                                                                                  | pemName (string)       |  { pemName:'filename' } | The file name of the generated .pem file | -o {pemName} |  
| teamId(string) | { teamId:'ekjo' } |   The ID of your team if you're in multiple teams | -b {teamId} |  
| teamName(string) | { teamName:'teamA' }   | The name of your team if you're in multiple teams | -l {teamName}
| development(boolean) | { development:true } | Renew the development push certificate instead of the production one | --development |
| force (boolean)       | { force:true }  | Create a new push certificate, even if the current one is active for 30 more days | --force |                            | generateP12 (boolean) | { generateP12:true }  | Generate a p12 file additionally to a PEM file | --generate_p12 |
|savePrivateKey (boolean) | { savePrivateKey:true }  | Set to save the private RSA key | --s |                              

### Runtime Options

|Runtime Option |Example|Description|
|----------------|-------|-----------|
|timeout (number)| { timeout:0 } | specify when to exit execution in case of error |
|password (string)| {password:''} | app store password |
|path (string)| {path:'/'} | path of directory where PEM executes|

## install

With [npm](https://npmjs.org) do:

```
npm install --save fastlane-pem
```

## testing

`npm test`

### coverage

`npm run view-cover`

This will output a textual coverage report.

`npm run open-cover`

This will open an HTML coverage report in the default browser.
