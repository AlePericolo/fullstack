const S = require('fluent-json-schema')
const user = require('../controllers/user')

const authRoutes = (fastify, options, done) => {

    fastify.post('/signup', {
        schema: {
            description: 'create new user',
            tags: ['Auth'],
            summary: 'create new user',
            body: S.object()
                .prop('email', S.string().required())
                .prop('password', S.string().required()),
            response: {
                201: S.object()
                    .prop('message', S.string())
            }
        },
        handler: user.createUser
    }),

    fastify.post('/login', {
        schema: {
            description: 'login user',
            tags: ['Auth'],
            summary: 'login user',
            body: S.object()
                .prop('email', S.string().required())
                .prop('password', S.string().required()),
            response: {
                200: S.object()
                    .prop('token', S.string()),
                401: S.object()
                    .prop('message', S.string())
            }
        },
        handler: user.loginUser
    }),

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
        handler: user.deleteUser
    })

    done()
}

module.exports = authRoutes