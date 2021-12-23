const S = require('fluent-json-schema')
const user = require('../../../controllers/user')

const userRoutes = (fastify, options, done) => {

    fastify.get('/users', {
        schema: {
            description: 'get users',
            tags: ['User'],
            summary: 'get users',
            response: {
                200: S.array().items(
                    S.object()
                        .prop('_id', S.string())
                        .prop('email', S.string())
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
            params: S.object()
                .prop('_id', S.string().required()),
            response: {
                200: S.object()
                    .prop('_id', S.string())
                    .prop('email', S.string())
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
            params: S.object()
                .prop('_id', S.string().required()),
            response: {
                200: S.object()
                    .prop('message', S.string())
            },
            security: [{ Bearer: [] }]
        },
        preValidation: [fastify.authenticate],
        handler: user.deleteUser
    })

    done()
}

module.exports = userRoutes