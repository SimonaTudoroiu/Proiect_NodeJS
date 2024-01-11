'use strict';
const  bcrypt = require('bcrypt');
const { randUserName, randEmail, randPassword, randLine} = require('@ngneat/falso');

const hobbies = ["football", "basketball", "tennis", "golf", "swimming", "running", "cycling", "hiking", "climbing", "skiing", "snowboarding", "skating", "surfing", "skateboarding", "parkour", "yoga", "pilates", "gymnastics", "dancing", "singing", "playing an instrument", "painting", "drawing", "photography", "cooking", "baking", "sewing", "knitting", "crocheting", "gardening", "woodworking", "pottery", "sculpting", "writing", "blogging", "reading", "watching movies", "watching series", "watching anime", "playing video games", "playing board games", "playing card games", "playing tabletop games", "playing role-playing games", "playing darts", "playing pool", "playing bowling", "playing billiards", "playing chess", "playing checkers", "playing backgammon", "playing mahjong", "playing go", "playing poker", "playing bridge", "playing blackjack", "playing baccarat", "playing roulette", "playing craps", "playing slots", "playing bingo", "playing keno", "playing lottery", "playing rummy", "playing dominoes", "playing canasta", "playing hearts", "playing spades", "playing solitaire", "playing gin rummy", "playing cribbage", "playing euchre", "playing pinochle", "playing whist", "playing scrabble", "playing monopoly", "playing risk", "playing settlers of catan", "playing uno", "playing jenga", "playing twister", "playing clue", "playing trivial pursuit", "playing scrabble", "playing battleship", "playing operation", "playing connect four", "playing hungry hungry hippos", "playing candy land", "playing chutes and ladders", "playing life", "playing operation", "playing connect four", "playing hungry hungry hippos", "playing candy land", "playing chutes and ladders", "playing life", "playing operation", "playing connect four", "playing hungry hungry hippos", "playing candy land", "playing chutes and ladders", "playing life", "playing operation", "playing connect four", "playing hungry hungry hippos"]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = new Array(30).fill().map(() => ({
      username: randUserName(),
      mail: randEmail(),
      password: bcrypt.hashSync(randPassword(), 10),
      description: randLine(),
      hobbies: hobbies.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 10)).join(', '),
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    await queryInterface.bulkInsert("UserProfiles", data, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserProfiles", null, {});
  }
};
