import { readFile, writeFile } from 'node:fs/promises'
import { access } from '../config/access.js'

export default class BookRepository {
  constructor ({ file }) {
    this.file = file
  }

  async #currentFileContent () {
    return JSON.parse(await readFile(this.file))
  }

  find () {
    return this.#currentFileContent()
  }

  async findById (id) {
    const results = await this.#currentFileContent()
    const found = results.find(result => result.id === id)
    return found
  }

  async create (data) {
    const currentFile = await this.#currentFileContent()
    currentFile.push(data)
    await writeFile(this.file, JSON.stringify(currentFile))
    return data.id
  }
}

