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

  fastify.get('/:product', async (req, reply) => {
    fastify.log.info(req.params);

    fastify.log.info(`Account: ${ACCOUNT}`)
    fastify.log.info(`Domain: ${domain}`)
    fastify.log.info(`Product ID: ${req.params.product}`)

    const templateData = { domain: domain , product: req.params.product};
    fastify.log.info(`Template data: ${JSON.stringify(templateData)}`);

    // EJSを直接使用してテンプレートをレンダリング
    const ejs = require('ejs');
    const path = require('path');
    const templatePath = path.join(__dirname, 'ejs', 'redirect.ejs');

    try {
      const html = await ejs.renderFile(templatePath, templateData);
      fastify.log.info('Generated HTML content:');
      fastify.log.info(html);

      reply.type('text/html').send(html);
    } catch (error) {
      fastify.log.error('Template rendering error:', error);
      reply.code(500).send('Internal Server Error');
    }
  })

  // Declare a route
  fastify.get('/ping', function (request, reply) {
    reply.send({"ping":"pong"});
  });
})
