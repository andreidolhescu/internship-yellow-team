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
    Mail: 
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
    Path: 
    {
      type: DataTypes.STRING,
    }
  }, {});
  User.associate = function(models) {
  };
  return User;
};