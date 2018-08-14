'use strict';
module.exports = (sequelize, DataTypes) => {
  var Quiz = sequelize.define('Quiz', {
    Question: 
    {
    	type: DataTypes.STRING,
    }
  }, {});
  Quiz.associate = function(models) {
    Quiz.belongsTo(models.Chapter, {
    	foreignKey: 'chapterId',
    	onDelete: 'CASCADE'
    });

  	Quiz.hasMany(models.QuestionOption, {
  		foreignKey: 'quizId',
  		as: 'quizOptions'
  	});
  };
  return Quiz;
};