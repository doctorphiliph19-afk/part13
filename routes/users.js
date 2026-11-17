const express = require('express')
const usersController = require('../controllers/users')

const router = express.Router()

router.get('/', usersController.getAll)
router.post('/', usersController.create)
router.get('/:id', usersController.getById)
router.put('/:username', usersController.update)

module.exports = router