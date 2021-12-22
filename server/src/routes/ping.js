const S = require('fluent-json-schema')

const itemsRoutes = (fastify, options, done) => {

    fastify.get('/ping', {
        schema: {
            description: 'ping',
            tags: ['Test'],
            summary: 'test api',
            response: {
                200: S.object()
                    .prop('message', S.string())
            }
        }
    }, async (req, reply) => {
        reply.send({ message: 'pong' })
    })

    done()
}

module.exports = itemsRoutes