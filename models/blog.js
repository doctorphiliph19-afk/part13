
const { DataTypes } = require('sequelize')
const sequelize = require('./index')

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
    validate: {
      isInt: true,
    },
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
    isInt: {
      msg: 'Year must be an integer',
    },
    min: {
      args: [1991],
      msg: 'Year must be at least 1991',
    },
    max: {
      args: [new Date().getFullYear()],
      msg: `Year cannot be later than ${new Date().getFullYear()}`,
    },
  },
},
},
{
  tableName: 'blogs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

module.exports = Blog
