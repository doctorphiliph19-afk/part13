
const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = jwt.verify(
        authorization.substring(7),
        process.env.SECRET
      )

      req.decodedToken = decodedToken
    } catch (error) {
      return res.status(401).json({
        error: 'Invalid or expired token',
      })
    }
  }

  next()
}

module.exports = tokenExtractor
