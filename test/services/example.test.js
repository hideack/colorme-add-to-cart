'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('product redirect is loaded', (t) => {
  t.plan(3)
  const app = build(t)

  app.inject({
    url: '/test-product-123'
  }, (err, res) => {
    t.error(err)
    t.ok(res.payload.includes('hideack3.shop-pro.jp'))
    t.ok(res.payload.includes('test-product-123'))
  })
})

// If you prefer async/await, use the following
//
// test('example is loaded', async (t) => {
//   const app = build(t)
//
//   const res = await app.inject({
//     url: '/example'
//   })
//   t.equal(res.payload, 'this is an example')
// })
