const itemsRoutes = (fastify, options, done) => {

    fastify.get('/ping', {
        schema: {
            description: 'ping',
            tags: ['Test'],
            summary: 'test api',
            response: {
                200: {
                    description: 'Test response',
                    type: 'object',
                    properties: {
                        response: { type: 'string' }
                    }
                }
            },
            security: [{ Bearer: [] }]
        }
    }, async (req, reply) => {
        reply.send({ response: 'pong' })
    })

    done()
}

module.exports = itemsRoutes