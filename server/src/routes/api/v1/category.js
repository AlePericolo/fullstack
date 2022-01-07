const {array, object, string} = require('fluent-json-schema')
const category = require('../../../controllers/category')

const categoryRoutes = (fastify, options, done) => {

    fastify.get('/categories', {
        schema: {
            description: 'get categories',
            tags: ['Category'],
            summary: 'get categories',
            response: {
                200: array().items(
                    object()
                        .prop('_id', string())
                        .prop('label', string())
                )
            }
        },
        handler: category.getCategories
    })

    fastify.delete('/categories/:_id', {
        schema: {
            description: 'delete category',
            tags: ['Category'],
            summary: 'delete category',
            params: object()
                .prop('_id', string().required()),
            response: {
                200: object()
                    .prop('message', string())
            },
            security: [{ Bearer: [] }]
        },
        preValidation: [fastify.authenticate],
        handler: category.deleteCategory
    })

    fastify.post('/category', {
        schema: {
            description: 'create new category',
            tags: ['Category'],
            summary: 'create new category',
            body: object()
                .prop('label', string()),
            response: {
                201: object()
                    .prop('message', string())
            },
            security: [{ Bearer: [] }]
        },
        preValidation: [fastify.authenticate],
        handler: category.createCategory
    })

    fastify.put('/category/:_id', {
        schema: {
            description: 'update category by id',
            tags: ['Category'],
            summary: 'update category by id',
            params: object()
                .prop('_id', string().required()),
            body: object()
                .prop('label', string()),
            response: {
                200: object()
                    .prop('message', string())
            },
            security: [{ Bearer: [] }]
        },
        preValidation: [fastify.authenticate],
        handler: category.updateCategory
    })

    done()
}

module.exports = categoryRoutes