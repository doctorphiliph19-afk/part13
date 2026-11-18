const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
      },
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const { name, username, password } = req.body || {}

    if (!username || !name || !password) {
      return res.status(400).json({
        error: 'Username, name and password are required',
      })
    }

    if (typeof password !== 'string' || password.length < 3) {
      return res.status(400).json({
        error: 'Password must contain at least 3 characters',
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, username, passwordHash })
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

const getById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(404).end()
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    })

    if (!user) {
      return res.status(404).end()
    }

    user.name = req.body?.name
    await user.save()

    res.json(user)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  create,
  getById,
  update,
}
