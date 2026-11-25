
const User = require('../models/user')
const Blog = require('../models/blog')
const ReadingList = require('../models/readingList')

// Create a reading-list entry
const create = async (req, res, next) => {
  try {
    const { blogId, userId } = req.body || {}

    if (!Number.isInteger(userId)) {
      return res.status(400).json({
        error: 'Invalid userId',
      })
    }

    if (!Number.isInteger(blogId)) {
      return res.status(400).json({
        error: 'Invalid blogId',
      })
    }

    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(400).json({
        error: 'User not found',
      })
    }

    const blog = await Blog.findByPk(blogId)

    if (!blog) {
      return res.status(400).json({
        error: 'Blog not found',
      })
    }

    const readingList = await ReadingList.create({
      userId,
      blogId,
    })

    res.status(201).json(readingList)
  } catch (error) {
    next(error)
  }
}

// Mark a reading-list entry as read
const update = async (req, res, next) => {
  try {
    const { read } = req.body || {}

    if (typeof read !== 'boolean') {
      return res.status(400).json({
        error: 'Read must be a boolean',
      })
    }

    if (!req.decodedToken) {
      return res.status(401).json({
        error: 'Token missing',
      })
    }

    const readingList = await ReadingList.findByPk(req.params.id)

    if (!readingList) {
      return res.status(404).json({
        error: 'Reading list entry not found',
      })
    }

    if (readingList.userId !== req.decodedToken.id) {
      return res.status(403).json({
        error: 'You can only update your own reading list',
      })
    }

    readingList.read = read
    await readingList.save()

    res.json(readingList)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  create,
  update,
}
