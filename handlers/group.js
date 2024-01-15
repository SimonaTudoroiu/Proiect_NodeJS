const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");
const addUserGroup = require("./userGroup");
const verifyToken = require("../middleware/");
const { JWT_SECRET } = require('../config/constants');



const jwt = require('jsonwebtoken');



const addGroup = async (name, description, userId) => {

    const group = await db.Group.findOne({
        where: {
            name
        }
    });

    if (group) {
        return {
            message: "The group name is already used!",
        };
    }

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

const getAllGroups = async () => {
    const groups = await db.Group.findAll();

    return groups;
}

const getGroupByUserId = async (userId) => {
    const userGroups = await db.UserGroup.findAll({
        where: {
            userId
        }
    });

    const groups = [];

    for (let i = 0; i < userGroups.length; i++) {
        const group = await db.Group.findOne({
            where: {
                id: userGroups[i].groupId
            }
        });

        groups.push(group);
    }

    return groups;
}

getUnenteredGroups = async (userId) => {
    const userGroups = await db.UserGroup.findAll({
        where: {
            userId
        }
    });

    const groups = await db.Group.findAll();

    const unenteredGroups = [];

    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        let ok = true;

        for (let j = 0; j < userGroups.length; j++) {
            const userGroup = userGroups[j];

            if (userGroup.groupId === group.id) {
                ok = false;
            }
        }

        if (ok) {
            unenteredGroups.push(group);
        }
    }

    return unenteredGroups;
}

const getGroupByHobby = async (userId) => {
    const user = await db.User.findOne({
        where: {
            id: userId
        }
    });

    const userProfile = await db.UserProfile.findOne({
        where: {
            id: user.profileId
        }
    });

    const userHobbies = userProfile.hobbies.split(", ");

    const groups = getUnenteredGroups(userId);
    gr = [];

    // the description of the group contains only one hobby
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const groupDescription = group.description;

        for (let j = 0; j < userHobbies.length; j++) {
            const hobby = userHobbies[j];

            if (groupDescription.includes(hobby)) {
                gr.push(group);
            }
        }
    }


    return gr;
 
}


getGroupByName = async(name) => {
    const group = await db.Group.findOne({
        where: {
            name
        }
    });

    return group;
}

const enterGroup = async (userId, groupId) => {
    const userGroup = await db.UserGroup.findOne({
        where: {
            userId,
            groupId
        }
    });

    if (userGroup) {
        return {
            message: "The user is already in the group!",
        };
    }

    const newGroup = await db.UserGroup.create({
        userId,
        groupId,
    });

    const group = await db.Group.findOne({
        where: {
            id: groupId
        }
    });

    group.nr_members += 1;
    await group.save();

    return newGroup;
}

const leaveGroup = async (userId, groupId) => {
    const userGroup = await db.UserGroup.findOne({
        where: {
            userId,
            groupId
        }
    });

    if (userGroup) {
        await userGroup.destroy();

        const group = await db.Group.findOne({
            where: {
                id: groupId
            }
        });

        group.nr_members -= 1;
        await group.save();

        return true;
    }

    return false;
}



module.exports = {
    addGroup,
    getAllGroups,
    getGroupByUserId,
    getGroupByHobby,
    enterGroup,
    leaveGroup,
    getGroupByName
}










