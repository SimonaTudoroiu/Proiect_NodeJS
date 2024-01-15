const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");

const addUserGroup = async (userId, groupId) => {
    const newUserGroup = await db.UserGroup.create({
        userId,
        groupId,
    });
    return newUserGroup;
}

const deleteUserGroup = async (userId, groupId) => {
    const userGroup = await db.UserGroup.destroy({
        where: {
            userId,
            groupId
        }
    });

    return userGroup;
}

module.exports = {
    addUserGroup,
    deleteUserGroup
}