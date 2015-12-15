var proxyquire = require('proxyquire'),
    test       = require('tape'),
    sinon      = require('sinon')

var error = new Error('boom')
var exec = sinon.stub().callsArgWith(2, error, '', '')
var child_process = { exec }
var pem = proxyquire('..', { child_process })

test('pem wrapper callback receives exec errors', (t) => {
    exec.reset()
    pem({ identifier: 'test.test.123' }, (err) => {
        t.equal(err, error, 'got error')
        t.end()
    })
})
