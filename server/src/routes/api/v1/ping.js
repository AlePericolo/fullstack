const {object, string} = require('fluent-json-schema')

const itemsRoutes = (fastify, options, done) => {

    fastify.get('/ping', {
        schema: {
            description: 'ping',
            tags: ['Test'],
            summary: 'test api',
            response: {
                200: object()
                    .prop('message', string())
            }
        }
    }, async (req, reply) => {
        reply.send({ message: 'pong' })
    })

    done()
}

module.exports = itemsRoutes