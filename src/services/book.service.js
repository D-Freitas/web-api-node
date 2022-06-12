export default class BookService {
  constructor ({ bookRepository }) {
    this.bookRepository = bookRepository
  }

  find () {
    return this.bookRepository.find()
  }

  findById (id) {
    return this.bookRepository.findById(id)
  }

  create (data) {
    return this.bookRepository.create(data)
  }
}

