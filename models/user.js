'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasOne(models.UserProfile);
      models.User.belongsToMany(models.Group, {
        through: 'UserGroup'
      })
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);
    }
  }
  User.init({
    profileId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};