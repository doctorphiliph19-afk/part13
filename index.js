const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')

const app = express()
app.use(express.json())

const sequelize = new Sequelize('bloglist', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
})

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'blogs',
  timestamps: false,
})

// GET all blogs
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

// POST a new blog
app.post('/api/blogs', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.status(201).json(blog)
})

// DELETE a blog
app.delete('/api/blogs/:id', async (req, res) => {
  const deleted = await Blog.destroy({
    where: { id: req.params.id },
  })

  if (!deleted) {
    return res.status(404).end()
  }

  res.status(204).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})