'use strict'

const fastify = require('fastify-plugin')

module.exports = fastify(async function (fastify, opts) {
  fastify.register(require('@fastify/view'), {
    engine: {
      ejs: require('ejs')
    }
  })

  const ACCOUNT = process.env.ACCOUNT || 'hideack3';
  // Auto-detect custom domain vs shop-pro.jp subdomain
  const domain = ACCOUNT.includes('.') ? ACCOUNT : `${ACCOUNT}.shop-pro.jp`;

  fastify.get('/:product', (req, reply) => {
    fastify.log.info(req.params);

    fastify.log.info(`Account: ${ACCOUNT}`)
    fastify.log.info(`Domain: ${domain}`)
    fastify.log.info(`Product ID: ${req.params.product}`)

    reply.view('/ejs/redirect.ejs', { domain: domain , product: req.params.product})
  })

  // Declare a route
  fastify.get('/ping', function (request, reply) {
    reply.send({"ping":"pong"});
  });
})
