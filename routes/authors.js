
const authorsRouter = require('express').Router()
const authorsController = require('../controllers/authors')

authorsRouter.get('/', authorsController.getAll)

module.exports = authorsRouter
