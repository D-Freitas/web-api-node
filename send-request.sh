#!/bin/bash

curl \
  --silent \
  -X POST
  -d '{"name": "Clean Coder", "author": "Robert C. Martin", "theme": "Software development"}' \
  localhost:3000/books

curl \
  --silent \
  -X POST
  -d '{"invalid json payload"}' \
  localhost:3000/books
