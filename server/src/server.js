const swagger = require("./config");
const routes = require("./routes")

const serverHandler = (fastify, option, done) => {

    fastify.register(require("fastify-cors"), {
        origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
    });

    fastify.register(require("fastify-swagger"), swagger)

    // fastify.register(require('fastify-mongodb'), {
    //     forceClose: true,        
    //     url: process.env.MONGO_URI
    // })

    routes.forEach((route) => {
        fastify.register(route, {prefix: '/api/v1'});
    })

    done()
}

module.exports = serverHandler;