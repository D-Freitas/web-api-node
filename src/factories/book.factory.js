import BookRepository from '../repositories/book.repo.js'
import BookService from '../services/book.service.js'

const generateInstance = ({ filePath }) => {
  const bookRepository = new BookRepository({ file: filePath })
  const bookService = new BookService({ bookRepository }) 
  return bookService
}

export { generateInstance }

