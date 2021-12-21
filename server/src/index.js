require("dotenv").config();

const serverHandler = require("./server")
const dbHandler = require("./db")

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

fastify.register(serverHandler)
dbHandler()

const start = async () => {
  try {
    await fastify.listen(process.env.PORT)  
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()