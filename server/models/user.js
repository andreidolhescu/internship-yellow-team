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
    UserRole:
    {
      type: DataTypes.BOOLEAN,
    },
    Points: 
    {
      type: DataTypes.INTEGER,
    },
    PathforImage: 
    {
      type: DataTypes.STRING
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};