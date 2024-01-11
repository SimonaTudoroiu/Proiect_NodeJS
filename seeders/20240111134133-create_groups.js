'use strict';
const {randWord, randLine, randNumber} = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = new Array(30).fill().map(() => ({
      name: randWord(),
      description: randLine(),
      date: new Date(),
      nr_members: randNumber({min: 1, max: 30}),
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    await queryInterface.bulkInsert('Groups', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Groups', null, {})
  }
};
