'use strict';
const { randNumber } = require('@ngneat/falso')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = new Array(50).fill().map(() => ({
      userId: randNumber({ min: 1, max: 30 }),
      groupId: randNumber({ min: 1, max: 15 }),
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    await queryInterface.bulkInsert('UserGroups', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserGroups', null, {})
  }
};
