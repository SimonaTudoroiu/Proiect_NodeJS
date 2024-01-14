const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { JWT_SECRET } = require('../config/constants');

const login = async (username, password) => {

    try {
        const userProfile = await db.UserProfile.findOne({
            where: {
                username
            }
        });

        if (userProfile) {
            const isPasswordCorrect = await bcrypt.compare(password, userProfile.password);
            
            if (isPasswordCorrect) {
                const token = jwt.sign({ id: userProfile.id }, JWT_SECRET, { expiresIn: '1d' });
                return token;
            }
        
        }
        return null;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}


module.exports = login;