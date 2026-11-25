const express = require('express')
const readinglistsRouter = express.Router()

const readinglistsController = require('../controllers/readinglists')

readinglistsRouter.post('/', readinglistsController.create)

module.exports = readinglistsRouter