var proxyquire = require('proxyquire'),
    test       = require('tape'),
    sinon      = require('sinon')

var exec = sinon.stub().callsArgWith(2, null, '', '')
var child_process = { exec }
var pem = proxyquire('..', { child_process })

test('accepts no options', (t) => {
    t.plan(1)
    exec.reset()
    pem(() => {
        t.pass('function called')
    })
})

test('accepts no args', (t) => {
    t.plan(1)
    exec.reset()
    t.doesNotThrow(pem)
})

test('accepts an identifier option', (t) => {
    t.plan(1)
    exec.reset()
    pem({ identifier: 'test.test.123' }, () => {
        t.ok(exec.calledWith('pem -a test.test.123'), 'pem called with -a')
    })
})

test('accepts a user option', (t) => {
    t.plan(1)
    exec.reset()
    pem({ user: 'gege' }, () => {
        t.ok(exec.calledWith('pem -u gege'), 'pem called with -u')
    })
})

test('accepts a output option of directory', (t) => {
    t.plan(1)
    exec.reset()
    pem({ output: '/' }, () => {
        t.ok(exec.calledWith('pem -e /'), 'pem called with directory where provisioning file is placed')
    })
})

test('accepts a p12 password', (t) => {
    t.plan(1)
    exec.reset()
    pem({ p12Password: 'password' }, () => {
        t.ok(exec.calledWith('pem -p password'), 'pem called with directory where provisioning file is placed')
    })
})

test('accepts an option  generateP12', (t) => {
    t.plan(1)
    exec.reset()
    pem({ generateP12: true }, () => {
        t.ok(exec.calledWith('pem --generate_p12'), 'pem called with  --generate_p12')
    })
})

test('accepts an option to save private key', (t) => {
    t.plan(1)
    exec.reset()
    pem({ savePrivateKey: true }, () => {
        t.ok(exec.calledWith('pem -s'), 'pem called with  -s to save private key')
    })
})

test('accepts a profile option teamId', (t) => {
    t.plan(1)
    exec.reset()
    pem({ teamId: 'ejoi' }, () => {
        t.ok(exec.calledWith('pem -b ejoi'), 'pem called with teamId specified -b')
    })
})

test('accepts a name for pem file', (t) => {
    t.plan(1)
    exec.reset()
    pem({ pemName: 'filename' }, () => {
        t.ok(exec.calledWith('pem -o filename'), 'pem called with filename')
    })
})

test('accepts a profile option teamName', (t) => {
    t.plan(1)
    exec.reset()
    pem({ teamName: 'teamA' }, () => {
        t.ok(exec.calledWith('pem -l teamA'), 'pem called with teamName specified -l')
    })
})

test('accepts an option of force', (t) => {
    t.plan(1)
    exec.reset()
    pem({ force: true }, () => {
        t.ok(exec.calledWith('pem --force'), 'pem called with --force')
    })
})

test('accepts a option of development', (t) => {
    t.plan(1)
    exec.reset()
    pem({ development: true }, () => {
        t.ok(exec.calledWith('pem --development'), 'pem called with --development')
    })
})

test('accepts a runtime option of timeout', (t) => {
    t.plan(1)
    exec.reset()
    pem({ timeout: 1 }, () => {
        t.ok(exec.calledWithMatch('pem', { timeout: 1 }), 'pem called with timeout runtime option')
    })
})

test('accepts a runtime option of password', (t) => {
    t.plan(1)
    exec.reset()
    pem({ password: 'password' }, () => {
        t.ok(exec.calledWithMatch('pem', { env: { FASTLANE_PASSWORD: 'password' } }), 'pem called with password runtime option')
    })
})

test('accepts a runtime option of path', (t) => {
    t.plan(1)
    exec.reset()
    pem({ path: '/something' }, () => {
        t.ok(exec.calledWithMatch('pem', { cwd: '/something' }), 'pem called with runtime path')
    })
})
