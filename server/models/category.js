'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    CategoryName: 
    {
    	allowNull: false,
    	type: DataTypes.STRING,
    }
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};