'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      models.Post.belongsTo(models.Group, {
        foreignKey: 'groupId'
      });
      models.Post.hasMany(models.Comment);
    }
  }
  Post.init({
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    date: DataTypes.STRING,
    nr_likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};