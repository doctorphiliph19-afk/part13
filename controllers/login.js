
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body || {}

    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      !username ||
      !password
    ) {
      return res.status(400).json({
        error: 'Username and password are required',
      })
    }

    const user = await User.findOne({
      where: { username },
    })

    if (!user || !user.passwordHash) {
      return res.status(401).json({
        error: 'Invalid username or password',
      })
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      user.passwordHash
    )

    if (!passwordCorrect) {
      return res.status(401).json({
        error: 'Invalid username or password',
      })
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: '1h' }
    )

    res.status(200).json({
      token,
      username: user.username,
      name: user.name,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { login }
