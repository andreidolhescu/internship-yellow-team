'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    FirstName: 
    {
      type: DataTypes.STRING,
    },
    LastName: 
    {
      type: DataTypes.STRING,
    },
    Password: 
    {
      type: DataTypes.STRING,
    },
    Email: 
    {
      type: DataTypes.STRING,
    },
    Admin:
    {
      type: DataTypes.BOOLEAN,
    },
    Points: 
    {
      type: DataTypes.INTEGER,
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Image, {
      foreignKey: 'userId',
      as: 'images'
    });
  };
  return User;
};