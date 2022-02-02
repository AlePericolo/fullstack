const {array, object, string} = require('fluent-json-schema')
const article = require('../../../controllers/article')

const articleRoutes = (fastify, options, done) => {

    fastify.get('/articles', {
        schema: {
            description: 'get articles',
            tags: ['Article'],
            summary: 'get articles',
            response: {
                200: array().items(
                    object()
                        .prop('_id', string())
                        .prop('title', string())
                        .prop('subtitle', string())
                        .prop('text', string())
                        .prop('categories', array().items(
                            string())
                        )
                        .prop('user', object()
                            .prop('_id', string())
                            .prop('email', string())
                        )
                        .prop('created_at', string().format('time'))
                )
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