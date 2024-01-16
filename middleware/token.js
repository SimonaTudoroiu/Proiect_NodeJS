const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/constants');
const db = require("../models");

const authenticateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization) {
    next();
    return;
  }

  const token = authorization.replace('Bearer ', '');

  const data = jwt.verify(token, JWT_SECRET);

  const user = await db.UserProfile.findByPk(data.userId);
  
  if(user) {
    req.user = user.dataValues;
  }

  next();
};

module.exports = authenticateToken;