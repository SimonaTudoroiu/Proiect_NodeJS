const jwt = require("jsonwebtoken");
const db = require("../models");

const { JWT_SECRET } = require('../config/constants');

const authorizationMiddleware = async (req, res, next) => {
  const userToken = req.headers.authorization;
  if (userToken) {
    try {
      const decoded = jwt.verify(userToken, JWT_SECRET);
      const userId = decoded.id;
      const user = await db.UserProfile.findByPk(userId);
      if (user) {
        req.user = user.dataValues;
        next();
      }
    } catch (err) {
      console.error("Error at authorization: ", err);
      next();
    }
  } else {
    next();
  }
};

module.exports = {authorizationMiddleware};