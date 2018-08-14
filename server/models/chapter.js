'use strict';
module.exports = (sequelize, DataTypes) => {
  var Chapter = sequelize.define('Chapter', {
    Title: 
    {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    Content: 
    {
    	type: DataTypes.STRING,
    	allowNull: false
    }
  }, {});
  Chapter.associate = function(models) {
    Chapter.belongsTo(models.Course, {
    	foreignKey: 'courseId',
    	onDelete: 'CASCADE'
    });

  	Chapter.hasMany(models.Question, {
  		foreignKey: 'chapterId',
  		as: 'questions'
  	});

  	Chapter.hasMany(models.Answer, {
  		foreignKey: 'chapterId',
  		as: 'answers'
  	});
  };
  return Chapter;
};