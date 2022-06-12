import { randomUUID } from 'node:crypto'

export default class Books {
  constructor ({ name, author, theme }) {
    this.id = randomUUID()
    this.name = name
    this.author = author
    this.theme = theme
  }
}

