
const Blog = require('../models/blog')

const getAll = async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        'author',
        [
          Blog.sequelize.fn('COUNT', Blog.sequelize.col('id')),
          'blogs',
        ],
        [
          Blog.sequelize.fn('SUM', Blog.sequelize.col('likes')),
          'likes',
        ],
      ],
      group: ['author'],
      order: [
        [Blog.sequelize.fn('SUM', Blog.sequelize.col('likes')), 'DESC'],
      ],
    })

    res.json(authors)
  } catch (error) {
    next(error)
  }
}

module.exports = { getAll }
