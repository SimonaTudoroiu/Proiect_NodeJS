'use strict';
const { randNumber, randParagraph } = require('@ngneat/falso');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = new Array(60).fill().map(() => ({
      userId: randNumber({ min: 1, max: 30 }),
      groupId: randNumber({ min: 1, max: 15 }),
      text: randParagraph(),
      date: new Date(),
      nr_likes: randNumber({ min: 1, max: 30 }),
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    await queryInterface.bulkInsert('Posts', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {})
  }
};
