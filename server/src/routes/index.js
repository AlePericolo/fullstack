const ping = require('./api/v1/ping')
const auth = require('./api/v1/auth')
const user = require('./api/v1/user')

module.exports = [
    ping,
    auth,
    user
]