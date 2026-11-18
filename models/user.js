
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
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: {
        msg: 'username must be a valid email address',
      },
    },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'passwordhash',
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

User.prototype.toJSON = function () {
  const values = { ...this.get() }
  delete values.passwordHash
  return values
}

module.exports = User
