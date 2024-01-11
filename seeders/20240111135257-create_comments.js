'use strict';
const { randNumber, randParagraph } = require('@ngneat/falso');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = new Array(150).fill().map(() => ({
      userId: randNumber({ min: 1, max: 30 }),
      postId: randNumber({ min: 1, max: 60 }),
      text: randParagraph(),
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    await queryInterface.bulkInsert('Comments', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {})
  }
};
