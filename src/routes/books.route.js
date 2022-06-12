import { once } from 'node:events'
import Book from '../entities/book.entity.js'
import { DEFAULT_HEADER } from '../utils/util.js'

const routes = ({ bookService }) => ({
  '/books:get': async (request, response) => {
    const books = await bookService.find()
    
    response.writeHead(201, DEFAULT_HEADER)
    response.write(JSON.stringify(books, null, 2))
    return response.end()
  },
  '/books:findById': async (request, response) => {
    const paths = request.url.split('/')
    const id = paths.at(-1)
    const book = await bookService.findById(id)

    response.writeHead(201, DEFAULT_HEADER)
    response.write(JSON.stringify(book, null, 2))
    return response.end()
  },
  '/books:post': async (request, response) => {
    const data = await once(request, 'data')
    const item = JSON.parse(data)
    const book = new Book(item)
    const id = await bookService.create(book)

    response.writeHead(201, DEFAULT_HEADER)
    response.write(JSON.stringify({
      id,
      success: 'Book registred with success!!!'
    }), null, 2)
    return response.end()
  },
})

export { routes }

