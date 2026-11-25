
const { DataTypes } = require('sequelize')
const sequelize = require('./index')

const ReadingList = sequelize.define('ReadingList', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'blog_id',
  },
  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'reading_lists',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})

module.exports = ReadingList
