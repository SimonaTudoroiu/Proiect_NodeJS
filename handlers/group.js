const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");
const addUserGroup = require("./userGroup");


const addGroup = async (name, description, userId) => {
    const newGroup = await db.Group.create({
        name,
        description,
        date: new Date(),
        nr_members: 1
    });

    // add instance to user
    await addUserGroup.addUserGroup(userId, newGroup.id);

    return newGroup;

}







