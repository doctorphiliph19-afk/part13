const errorHandler = (error, req, res, next) => {
  if (error.name === 'SequelizeValidationError' || error.status === 400) {
    return res.status(400).json({ error: error.message })
  }

  console.error(error)
  res.status(500).json({ error: 'Internal server error' })
}

module.exports = errorHandler
