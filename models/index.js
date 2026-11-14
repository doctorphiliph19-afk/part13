const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('bloglist', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
})

module.exports = sequelize