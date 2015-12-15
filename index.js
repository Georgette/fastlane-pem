var exec = require('child_process').exec

module.exports = pem

function pem (options, cb) {

    if (typeof options === 'function') {
        cb = options
        options = {}
    }
    options = options || {}
    cb = cb || function () {}
    options.timeout = options.timeout !== undefined ? options.timeout : 0

    var cmd = 'pem'
    if (options.identifier)     cmd += ` -a ${options.identifier}`
    if (options.user)           cmd += ` -u ${options.user}`
    if (options.output)         cmd += ` -e ${options.output}`
    if (options.savePrivateKey) cmd += ' -s'
    if (options.teamId)         cmd += ` -b ${options.teamId}`
    if (options.teamName)       cmd += ` -l ${options.teamName}`
    if (options.p12Password)    cmd += ` -p ${options.p12Password}`
    if (options.pemName)        cmd += ` -o ${options.pemName}`
    if (options.force)          cmd += ` --force`
    if (options.development)    cmd += ` --development`
    if (options.generateP12)    cmd += ` --generate_p12`

    var runtimeOptions = { env: Object.assign({}, process.env) }

    if (options.timeout)    runtimeOptions.timeout               = options.timeout
    if (options.password)   runtimeOptions.env.FASTLANE_PASSWORD = options.password
    if (options.path)       runtimeOptions.cwd                   = options.path

    exec(cmd, runtimeOptions, (err, stdout, stderr) => {
        cb(err, { stdout, stderr })
    })
}
