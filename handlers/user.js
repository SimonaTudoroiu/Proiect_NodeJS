const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");

const addUser = async(userProfileId) => {
    const newUser = await db.User.create({
        userProfileId,

    });
    return newUser;
}

const deleteUser = async(id) => {
    const user = await db.User.destroy({
        where: {
            id
        }
    });

    return user;
}

const updateUser = async(id, userProfileId) => {
    const user = await db.User.update({
        userProfileId
    }, {
        where: {
            id
        }
    });

    return user;
}



module.exports = {
    addUser,
    deleteUser,
    updateUser

}