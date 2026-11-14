const express = require('express')
const blogsController = require('../controllers/blogs')

const router = express.Router()

router.get('/', blogsController.getAll)
router.post('/', blogsController.create)
router.delete('/:id', blogsController.remove)

module.exports = router