'use strict';
const {randWord, randLine, randNumber} = require('@ngneat/falso')
const hobbies = ["football", "basketball", "tennis", "golf", "swimming", "running", "cycling", "hiking", "climbing", "skiing", "snowboarding", "skating", "surfing", "skateboarding", "parkour", "yoga", "pilates", "gymnastics", "dancing", "singing", "playing an instrument", "painting", "drawing", "photography", "cooking", "baking", "sewing", "knitting", "crocheting", "gardening", "woodworking", "pottery", "sculpting", "writing", "blogging", "reading", "watching movies", "watching series", "watching anime", "playing video games", "playing board games", "playing card games", "playing tabletop games", "playing role-playing games", "playing darts", "playing pool", "playing bowling", "playing billiards", "playing chess", "playing checkers", "playing backgammon", "playing mahjong", "playing go", "playing poker", "playing bridge", "playing blackjack", "playing baccarat", "playing roulette", "playing craps", "playing slots", "playing bingo", "playing keno", "playing lottery", "playing rummy", "playing dominoes", "playing canasta", "playing hearts", "playing spades", "playing solitaire", "playing gin rummy", "playing cribbage", "playing euchre", "playing pinochle", "playing whist", "playing scrabble", "playing monopoly", "playing risk", "playing settlers of catan", "playing uno", "playing jenga", "playing twister", "playing clue", "playing trivial pursuit", "playing scrabble", "playing battleship", "playing operation", "playing connect four", "playing hungry hungry hippos", "playing candy land", "playing chutes and ladders", "playing life", "playing operation", "playing connect four", "playing hungry hungry hippos", "playing candy land", "playing chutes and ladders", "playing life", "playing operation", "playing connect four", "playing hungry hungry hippos", "playing candy land", "playing chutes and ladders", "playing life", "playing operation", "playing connect four", "playing hungry hungry hippos"]


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = new Array(30).fill().map(() => ({
      name: randWord(),
      description: hobbies[Math.floor(Math.random() * hobbies.length)],
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
