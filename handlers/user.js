const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");

const addUser = async(userProfileId) => {
    const newUser = await db.User.create({
        userProfileId,

    });
    return newUser;
}


exports.addUser = addUser;