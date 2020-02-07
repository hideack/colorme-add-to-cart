'use strict'

const fastify = require('fastify')({
  logger: true
})

fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs')
  }
})

const PORT = process.env.PORT || 5000

fastify.get('/:account/:product', (req, reply) => {
  fastify.log.info(req.params);

  fastify.log.info(`Account: ${req.params.account}`)
  fastify.log.info(`Product ID: ${req.params.product}`)

  reply.view('/ejs/redirect.ejs', { account: req.params.account , product: req.params.product})
})

// Declare a route
fastify.get('/ping', function (request, reply) {
  reply.send({"ping":"pong"});
});

// Run the server!
fastify.listen(PORT, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
