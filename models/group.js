'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Group.belongsToMany(models.User, {
        through: 'UserGroup'
      })
      models.Group.hasMany(models.Post);
    }
  }
  Group.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING, // a hobby
    date: DataTypes.STRING,
    nr_members: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};