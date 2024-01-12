'use strict';
const { randNumber } = require('@ngneat/falso')
const {shuffle} = require('lodash')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let user_ids = Array.from({ length: 30 }, (_, i) => i + 1);
    user_ids = shuffle(user_ids);

    const data = user_ids.slice(0, 30).map(id => ({
      profileId: id,
      createdAt: new Date(),
      updatedAt: new Date()
    }))

    await queryInterface.bulkInsert('Users', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
