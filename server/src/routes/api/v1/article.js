const {array, object, string, integer} = require('fluent-json-schema')
const article = require('../../../controllers/article')

const articleRoutes = (fastify, options, done) => {

    fastify.post('/articles', {
        schema: {
            description: 'get articles',
            tags: ['Article'],
            summary: 'get articles',
            body: {
                type: 'object',
                properties: {
                    page: { type: 'integer' }
                }
            },
            response: {
                200: 
                    object()
                        .prop('items', array().items(
                            object()
                                .prop('_id', string())
                                .prop('title', string())
                                .prop('subtitle', string())
                                .prop('text', string())
                                .prop('categories', array().items(
                                    object()
                                        //.prop('_id', string())
                                        .prop('label', string())
                                    )
                                )
                                .prop('user', object()
                                    //.prop('_id', string())
                                    .prop('email', string())
                                )
                                .prop('created_at', string())
                                )
                        )
                    .prop('totalItems', integer())
                    .prop('itemsForPage', integer())
            },
        },
        handler: article.getArticles
    })

    fastify.post('/article', {
        schema: {
            description: 'create new article',
            tags: ['Article'],
            summary: 'create new article',
            body: object()
                .prop('title', string().required())
                .prop('subtitle', string())
                .prop('text', string().required())
                .prop('categories', array().items(
                    string())
                ),
            response: {
                201: object()
                    .prop('message', string())
            }
        },
        handler: article.createArticle
    })

    done()
}

module.exports = articleRoutes