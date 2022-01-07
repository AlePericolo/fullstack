const ping = require('./api/v1/ping')
const auth = require('./api/v1/auth')
const user = require('./api/v1/user')
const category = require('./api/v1/category')
const article = require('./api/v1/article')

module.exports = [
    ping,
    auth,
    user,
    category,
    article
]