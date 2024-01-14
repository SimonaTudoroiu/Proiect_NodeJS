const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");


// register
const createUserProfile = async (username, password, mail, description, hobbies) => {

    try {
       const userProfiles = await db.UserProfile.findAll({
              where: {
                [Op.or]: [
                     { username },
                     { mail }
                ]
              }
         });

        if (userProfiles.length > 0) {
            return {
                message: "The username or email is already used!",
              };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUserProfile = await db.UserProfile.create({
            username,
            password: hashedPassword,
            mail,
            description,
            hobbies
        });


        return newUserProfile;
}
    catch (e) {
        console.log(e);
        return null;
    }
}

// delete user
const deleteUserProfile = async (id) => {
    try {
        const userProfile = await db.UserProfile.findOne({
            where: {
                id
            }
        });

        if (userProfile) {
            await userProfile.destroy();
            return true;
        }
        return false;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}


module.exports = {createUserProfile, deleteUserProfile};