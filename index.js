const express = require('express')
const app = express()

app.use(express.json())

const blogsRouter = require('./routes/blogs')
const errorHandler = require('./middleware/errorHandler')

app.use('/api/blogs', blogsRouter)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})