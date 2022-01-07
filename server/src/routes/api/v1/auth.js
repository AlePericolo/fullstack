const {object, string} = require('fluent-json-schema')
const boom = require('boom')
const bcrypt = require('bcrypt')
const User = require('../../../models/user')

const authRoutes = (fastify, options, done) => {

    fastify.post('/signup', {
        schema: {
            description: 'signup user',
            tags: ['Auth'],
            summary: 'signup user',
            body: object()
                .prop('email', string().required())
                .prop('password', string().required()),
            response: {
                201: object()
                    .prop('message', string())
            }
        },
        handler: async (req, reply) => {
            try {
                const hash = await bcrypt.hash(req.body.password, 10)
                await User.create({
                    email: req.body.email,
                    password: hash
                })
                reply.status(201).send({ message: 'user created' })
            } catch (err) {
                throw boom.boomify(err)
            }
        }
    }),

    fastify.post('/login', {
        schema: {
            description: 'login user',
            tags: ['Auth'],
            summary: 'login user',
            body: object()
                .prop('email', string().required())
                .prop('password', string().required()),
            response: {
                200: object()
                    .prop('token', string()),
                401: object()
                    .prop('message', string())
            }
        },
        handler: async (req, reply) => {
            try {
                const users = await User.find({
                    email: req.body.email
                })
                if (users.length < 1)
                    reply.status(401).send({ message: 'login failed' })
                
                const isPasswordCorrect = await bcrypt.compare(req.body.password, users[0].password)
                
                if (!isPasswordCorrect)
                    reply.status(401).send({ message: 'login failed' })
                
                const token = fastify.jwt.sign({
                    email: users[0].email,
                    userId: users[0]._id,
                }, { expiresIn: 60 * 10 })
                
                reply.status(200).send({ token: token })
            } catch (err) {
                throw boom.boomify(err)
            }
        }
    }),

    done()
}

module.exports = authRoutes