const User = require('../models/user')
const Blog = require('../models/blog')
const ReadingList = require('../models/readingList')

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

module.exports = { create }