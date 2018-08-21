'use strict';
module.exports = (sequelize, DataTypes) => {
  var Quiz = sequelize.define('Quiz', {
    Question: 
    {
    	type: DataTypes.STRING(70),
    }
  }, {});
  Quiz.associate = function(models) {
    Quiz.belongsTo(models.Chapter, {
    	foreignKey: 'chapterId',
    	onDelete: 'CASCADE'
    });

  	Quiz.hasMany(models.QuizOptions, {
  		foreignKey: 'quizId',
  		as: 'quizOptions'
  	});
    Quiz.hasMany(models.Answer, {
      foreignKey: 'quiz_answerId',
      as: 'quiz_answers'
    });
  };
  return Quiz;
};