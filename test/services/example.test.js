'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('product redirect is loaded with default domain', (t) => {
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

test('product redirect works with custom domain', (t) => {
  t.plan(4)

  // Override environment variable for this test
  const originalAccount = process.env.ACCOUNT
  process.env.ACCOUNT = 'www.example.com'

  const app = build(t)

  app.inject({
    url: '/test-product-456'
  }, (err, res) => {
    t.error(err)
    t.ok(res.payload.includes('www.example.com'))
    t.notOk(res.payload.includes('www.example.com.shop-pro.jp'))
    t.ok(res.payload.includes('test-product-456'))

    // Restore original environment variable
    process.env.ACCOUNT = originalAccount
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
