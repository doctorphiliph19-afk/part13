const User = require('../models/user')

const getAll = async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const create = async (req, res, next) => {
  try {
    const { name, username } = req.body || {}
    const user = await User.create({ name, username })
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
