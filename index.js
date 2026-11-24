
require('dotenv').config()

const express = require('express')
const app = express()

// Load Sequelize models and associations
const { User, Blog } = require('./models/associations')
const sequelize = require('./models')

// Middleware
app.use(express.json())

const tokenExtractor = require('./middleware/tokenExtractor')
app.use(tokenExtractor)

// Home endpoint
app.get('/', (req, res) => {
  res.status(200).send('Bloglist API')
})

// Reset endpoint (test database only)
app.post('/api/reset', async (req, res, next) => {
  if (process.env.TESTING !== 'true') {
    return res.status(403).json({
      error: 'Reset allowed only in testing mode',
    })
  }

  try {
    await sequelize.transaction(async (transaction) => {
      await Blog.destroy({ where: {}, transaction })
      await User.destroy({ where: {}, transaction })
    })

    res.status(200).json({
      message: 'Database reset successful',
    })
  } catch (error) {
    next(error)
  }
})

// Routes
const blogsRouter = require('./routes/blogs')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const authorsRouter = require('./routes/authors')
const errorHandler = require('./middleware/errorHandler')

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 3001

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
