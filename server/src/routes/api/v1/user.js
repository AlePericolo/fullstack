const {array, object, string} = require('fluent-json-schema')
const user = require('../../../controllers/user')

const userRoutes = (fastify, options, done) => {

    fastify.get('/users', {
        schema: {
            description: 'get users',
            tags: ['User'],
            summary: 'get users',
            response: {
                200: array().items(
                    object()
                        .prop('_id', string())
                        .prop('email', string())
                )
            },
            security: [{ Bearer: [] }]
        },
        preValidation: [fastify.authenticate],
        handler: user.getUsers
    })

    fastify.get('/users/:_id', {
        schema: {
            description: 'get user',
            tags: ['User'],
            summary: 'get user',
            params: object()
                .prop('_id', string().required()),
            response: {
                200: object()
                    .prop('_id', string())
                    .prop('email', string())
            },
            security: [{ Bearer: [] }]
        },
        preValidation: [fastify.authenticate],
        handler: user.getUser
    })

    fastify.delete('/users/:_id', {
        schema: {
            description: 'delete user',
            tags: ['User'],
            summary: 'delete user',
            params: object()
                .prop('_id', string().required()),
            response: {
                200: object()
                    .prop('message', string())
            },
            security: [{ Bearer: [] }]
        },
        preValidation: [fastify.authenticate],
        handler: user.deleteUser
    })

    done()
}

module.exports = userRoutes