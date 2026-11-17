const { DataTypes } = require('sequelize')
const sequelize = require('./index')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'createdat',
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updatedat',
  },
}, {
  tableName: 'users',
  timestamps: true,
})

module.exports = User
