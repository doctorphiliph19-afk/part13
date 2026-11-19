
require('dotenv').config()

const express = require('express')
const app = express()

// Load Sequelize model associations
require('./models/associations')

// Middleware
app.use(express.json())

const tokenExtractor = require('./middleware/tokenExtractor')
app.use(tokenExtractor)

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

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
