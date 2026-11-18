const errorHandler = (error, req, res, next) => {
  console.error(error)

  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    return res.status(400).json({
      error: error.errors.map((e) => e.message),
    })
  }

  if (error.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'Invalid user reference',
    })
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'Invalid JSON',
    })
  }

  res.status(500).json({
    error: 'Internal server error',
  })
}

module.exports = errorHandler