const express = require('express')
const blogsController = require('../controllers/blogs')

const router = express.Router()

router.get('/', blogsController.getAll)
router.post('/', blogsController.create)
router.delete('/:id', blogsController.remove)
router.put('/:id', blogsController.update)

module.exports = router