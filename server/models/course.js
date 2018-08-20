'use strict';
module.exports = (sequelize, DataTypes) => {
  var Course = sequelize.define('Course', {
    Title: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Summary: 
    {
      type: DataTypes.STRING(70),
      allowNull: true,
    },
    Description: 
    {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    Tags: 
    {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {});
  Course.associate = models => {
    Course.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    });

    Course.hasMany(models.Image, {
      foreignKey: 'courseId',
      as: 'images'
    });

    Course.hasMany(models.Chapter, {
      foreignKey: 'courseId',
      as: 'chapters'
    });
  };
  return Course;
};