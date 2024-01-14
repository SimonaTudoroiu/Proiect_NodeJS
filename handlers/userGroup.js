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

exports.addUserGroup = addUserGroup;