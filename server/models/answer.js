'use strict';
module.exports = (sequelize, DataTypes) => {
  var Answer = sequelize.define('Answer', {}, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.QuizOptions, {
    	foreignKey: 'quizoptionId',
    	onDelete: 'CASCADE'
    });
    Answer.belongsTo(models.User, {
    	foreignKey: 'userId',
    	onDelete: 'CASCADE'
    });
    Answer.belongsTo(models.Quiz, {
      foreignKey: 'quiz_answerId',
      onDelete: 'CASCADE'
    });
    Answer.belongsTo(models.Chapter, {
      foreignKey: 'chapterId',
      onDelete: 'CASCADE'
    });
  };
  return Answer;
};