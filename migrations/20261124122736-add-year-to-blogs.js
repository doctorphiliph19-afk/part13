
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('blogs', 'year', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('blogs', 'year')
  },
}
