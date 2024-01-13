const bcrypt = require('bcrypt');
const db = require('../../models');
const{OP} = require('sequelize'); // operators
const {JWT_SECRET} = require('../../config/constants');

const addUser = async(username, password, mail, description, hobbies) => {
    try{
        const users = await db.UserProfile.findAll({
            where: {
                [OP.or]: [ // = username or mail
                    {username},
                    {mail},
                ],
            },
            });

        if (users.length > 0){
            return {
                message : "Username or mail already exists",
            };

    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 = saltRounds

    const user = await db.User.create({
        username,
        password: hashedPassword,
        mail,
        description,
        hobbies,
    });

    return user;

    }
    catch(e){
        console.log(e);
        
    }
    
};

module.exports = {
    addUser,
};



