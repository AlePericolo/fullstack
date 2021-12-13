require("dotenv").config();
const mongoose = require("mongoose");
const swagger = require("./config");
const routes = require("./routes")
const fastify = require('fastify')({
  logger: {
    prettyPrint: true,
    serializers: {
      req(request) {
        return {
          method: request.method,
          url: request.url,
          path: request.path,
          parameters: request.parameters,
          headers: request.headers
        };
      },
      res(reply) {
        return {
          statusCode: reply.statusCode
        }
      }
    }
  }
})

fastify.register(require("fastify-cors"), {
  origin: ['http://localhost:3001', 'http://127.0.0.1:3001'],
});
fastify.register(require("fastify-swagger"), swagger)

routes.forEach((route, index) => {
  fastify.route(route)
})

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => { console.log('DB connected') })

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
})

const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()