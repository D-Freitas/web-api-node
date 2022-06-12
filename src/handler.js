import { access } from './config/access.js'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'node:url'
import { DEFAULT_HEADER } from './utils/util.js'
import { routes } from './routes/books.route.js'
import { generateInstance } from './factories/book.factory.js'

const currentDir = dirname(fileURLToPath(import.meta.url))
const [path, file] = [
  access.GENERIC_DATABASE.split('/').slice(0, 2).join('/'),
  access.GENERIC_DATABASE.split('/').slice(2, 3).join('')
]

const filePath = join(currentDir, path, file)
const bookService = generateInstance({ filePath })
const booksRoutes = routes({ bookService })

const allowRoutes = {
  ...booksRoutes,

  default (request, response) {
    response.writeHead(404, DEFAULT_HEADER)
    response.write('Not found')
    response.end()
  }
}

function handler (request, response) {
  const { url, method } = request
  const { pathname } = parse(url, true)
  let key = `${pathname}:${method.toLowerCase()}`
  const paths = pathname.split('/').filter(path => path !== '')
  if (paths.length > 1) {
    const [route] = paths
    key = `/${route}:findById`
  }
  const chosen = allowRoutes[key] || allowRoutes.default
  return Promise.resolve(chosen(request, response))
  .catch(handlerError(response))
}

function handlerError (response) {
  return (error) => {
    response.writeHead(500, DEFAULT_HEADER)
    response.write(JSON.stringify({
      error: 'internet server error!!'
    }))
    return response.end()
  }
}

export default handler

