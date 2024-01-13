const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../models');

const {JWT_SECRET} = require('../../config/constants');

const login = async(username, password) => {
    try{
        const user = await db.User.findOne({
            where: {
                username,
            }
        });

    
    if (user){
        const result = await bcrypt.compare(password, user.password);

        return result ? jwt.sign({id: user.id}, JWT_SECRET) : null; // if result is true, return the token, else return null
    }
}
    catch(e){
        console.log(e);
    }

    return null;
}

module.exports = {
    login,
};


    
