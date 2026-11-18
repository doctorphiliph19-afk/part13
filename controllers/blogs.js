const User = require('../models/user')
const Blog = require('../models/blog')

// Get all blogs
const getAll = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      include: {
        model: User,
        attributes: ['id', 'name', 'username'],
      },
    })
    res.json(blogs)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    if (!req.decodedToken) {
      return res.status(401).json({
        error: 'Token missing',
      })
    }

    const user = await User.findByPk(req.decodedToken.id)

    if (!user) {
      return res.status(401).json({
        error: 'User not found',
      })
    }

    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
    })

    res.status(201).json(blog)
  } catch (error) {
    next(error)
  }
}
// Delete a blog
const remove = async (req, res, next) => {
  try {
    const deleted = await Blog.destroy({
      where: { id: req.params.id },
    })

    if (!deleted) {
      return res.status(404).end()
    }

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

// Update blog likes
const update = async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)

    if (!blog) {
      return res.status(404).end()
    }

    blog.likes = req.body.likes
    await blog.save()

    res.json(blog)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  create,
  remove,
  update,
}
