const users = require('./user')

module.exports = [
    {
        method: 'GET',
        url: '/api/ping',
        schema: {
            description: 'test',
            tags: ['Test'],
            summary: 'try api',
            response: {
                200: {
                    type: 'string',
                }
            }
        },
        handler: function (request, reply) {
            reply.send('pong')
        }
    },
    ...users
]