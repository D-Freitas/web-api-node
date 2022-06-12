import test from 'node:test'
import assert from 'node:assert'
import { promisify } from 'node:util'

test('Book Integration Test Suite', async (context) => {
  const testPort = 9000

  // that's bad practice because it mutatess the environment
  process.env.PORT = testPort
  const { server } = await import('../../src/index.js')

  const testServerAddress = `http://localhost:${testPort}/books`

  await context.test('It should register a book', async (context) => {
    const data = {
      name: 'Clean Coder',
      author: 'Robert C. Martin',
      theme: 'Software development'
    }

    const response = await fetch(testServerAddress, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    assert.deepStrictEqual(response.headers.get('Content-Type'), 'application/json')
    assert.strictEqual(response.status, 201)

    const result = await response.json()
    assert.deepStrictEqual(
      result.success,
      'Book registred with success!!!',
      'it should return a valid text message'
    )
    assert.ok(result.id.length > 30, 'id should be a valid uuid')
  })
  await promisify(server.close.bind(server))()
})
