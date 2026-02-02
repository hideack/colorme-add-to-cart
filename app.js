'use strict'

const fastify = require('fastify-plugin')

module.exports = fastify(async function (fastify, opts) {
  fastify.register(require('@fastify/view'), {
    engine: {
      ejs: require('ejs')
    }
  })

  const ACCOUNT = process.env.ACCOUNT || 'hideack3';

  fastify.get('/:product', (req, reply) => {
    fastify.log.info(req.params);

    fastify.log.info(`Account: ${ACCOUNT}`)
    fastify.log.info(`Product ID: ${req.params.product}`)

    reply.view('/ejs/redirect.ejs', { account: ACCOUNT , product: req.params.product})
  })

  // Declare a route
  fastify.get('/ping', function (request, reply) {
    reply.send({"ping":"pong"});
  });
})
