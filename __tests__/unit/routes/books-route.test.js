import test from 'node:test'
import assert from 'node:assert'
import { routes } from '../../../src/routes/books.route.js'
import { DEFAULT_HEADER } from '../../../src/utils/util.js'

const callTracker = new assert.CallTracker()
process.on('exit', () => callTracker.verify())

test('Book routes - endpoints test suite', async (t) => {
  await t.test('it should call /books:get route', async () => {
    const databaseMock = [{
      "id": "b326753f-086c-4207-b425-a58fef3c9432",
      "name": "Clean Coder",
      "author": "Robert C. Martin",
      "theme": "Software development"
    }]

    const bookServiceStub = {
      find: async () => databaseMock
    }

    const endpoints = routes({
      bookService: bookServiceStub
    })

    const endpoint  = '/books:get'
    const request = {}
    const expected = JSON.stringify(databaseMock, null, 2)

    const response = {
      writeHead: callTracker.calls((status, header) => {
        assert.strictEqual(
          status,
          201,
          'should be called with the success status'
        )
        assert.strictEqual(
          header,
          DEFAULT_HEADER,
          'should be called with the default header'
        )
      }),
      write: callTracker.calls(item => {
        assert.strictEqual(
          item,
          expected,
          'write should be called with the correct payload'
        )
      }),
      end: callTracker.calls(item => {
        assert.strictEqual(
          item,
          undefined,
          'end should be called without params'
        )
      })
    }
    const route = endpoints[endpoint]
    await route({}, response)
  })
})
