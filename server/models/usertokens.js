'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserTokens = sequelize.define('UserTokens', {
    mail: 
    {
    	type: DataTypes.STRING,
    }
    token: {
    	type: DataTypes.STRING(500),
    }
  }, {});
  UserTokens.associate = function(models) {
    // associations can be defined here
  };
  return UserTokens;
};