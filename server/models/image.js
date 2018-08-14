'use strict';
module.exports = (sequelize, DataTypes) => {
  var Image = sequelize.define('Image', {
    path: 
    {
    	type: DataTypes.STRING,
    },
  }, {});
  Image.associate = function(models) {
    Course.belongsTo(models.Course, {
      foreignKey: 'courseId',
      onDelete: 'CASCADE'
    });
  };
  return Image;
};