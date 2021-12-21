const user = require('../controllers/user')

const userRoutes = (fastify, options, done) => {

    fastify.get('/users', {
        schema: {
            description: 'users',
            tags: ['User'],
            summary: 'get users',
            response: {
                200: {
                    description: 'Users list',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            email: { type: 'string' },
                            password: { type: 'string' }
                        }
                    }
                }
            },
        },
        handler: user.getUsers
    })

    fastify.get('/users/:id', {
        schema: {
            description: 'user',
            tags: ['User'],
            summary: 'get user by id',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                }
            },
            response: {
                200: {
                    description: 'User by id',
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        email: { type: 'string' },
                        password: { type: 'string' }
                    }
                }
            },
        },
        handler: user.getUser
    })

    done()
}

module.exports = userRoutes

// module.exports = [
//     {
//         method: 'GET',
//         url: '/api/users',
//         schema: {
//             description: 'users',
//             tags: ['User'],
//             summary: 'get users',
//             response: {
//                 200: {
//                     description: 'Users list',
//                     type: 'array',
//                     items: {
//                         type: 'object',
//                         properties: {
//                             _id: { type: 'string' },
//                             email: { type: 'string' },
//                             password: { type: 'string' }
//                         }
//                     }
//                 }
//             },
//         },
//         handler: user.getUsers
//     },
//     {
//         method: 'GET',
//         url: '/api/users/:id',
//         schema: {
//             description: 'user',
//             tags: ['User'],
//             summary: 'get user by id',
//             params: {
//                 type: 'object',
//                 properties: {
//                     id: { type: 'string' }
//                 }
//             },
//             response: {
//                 200: {
//                     description: 'User by id',
//                     type: 'object',
//                     properties: {
//                         _id: { type: 'string' },
//                         email: { type: 'string' },
//                         password: { type: 'string' }
//                     }
//                 }
//             },
//         },
//         handler: user.getUser
//     },
//     {
//         method: 'POST',
//         url: '/api/users',
//         schema: {
//             description: 'user',
//             tags: ['User'],
//             summary: 'add user',
//             body: {
//                 type: 'object',
//                 properties: {
//                     email: { type: 'string' },
//                     password: { type: 'string' }
//                 }
//             },
//             response: {
//                 200: {
//                     description: 'Add User',
//                     type: 'object',
//                     properties: {
//                         _id: { type: 'string' },
//                         email: { type: 'string' },
//                         password: { type: 'string' }
//                     }
//                 }
//             },
//         },
//         handler: user.addUser
//     },
//     {
//         method: 'PUT',
//         url: '/api/users/:id',
//         schema: {
//             description: 'update user',
//             tags: ['User'],
//             summary: 'update user by id',
//             params: {
//                 type: 'object',
//                 properties: {
//                     id: { type: 'string' }
//                 }
//             },
//             body: {
//                 type: 'object',
//                 properties: {
//                     email: { type: 'string' },
//                     password: { type: 'string' }
//                 }
//             },
//             response: {
//                 200: {
//                     description: 'Update User by id',
//                     type: 'object',
//                     properties: {
//                         _id: { type: 'string' },
//                         email: { type: 'string', nullable: true },
//                         password: { type: 'string', nullable: true }
//                     }
//                 }
//             },
//         },
//         handler: user.updateUser
//     },
//     {
//         method: 'DELETE',
//         url: '/api/users/:id',
//         schema: {
//             description: 'delete user',
//             tags: ['User'],
//             summary: 'delete user by id',
//             params: {
//                 type: 'object',
//                 properties: {
//                     id: { type: 'string' }
//                 }
//             },
//             response: {
//                 200: {
//                     description: 'Delete User by id',
//                     type: 'object',
//                     properties: {
//                         _id: { type: 'string' },
//                         email: { type: 'string' },
//                         password: { type: 'string' }
//                     }
//                 }
//             },
//         },
//         handler: user.deleteUser
//     }
// ]