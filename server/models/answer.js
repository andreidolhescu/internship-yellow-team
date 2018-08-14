'use strict';
module.exports = (sequelize, DataTypes) => {
  var Answer = sequelize.define('Answer', {}, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.QuizOptions, {
    	foreignKey: 'quizoptionId',
    	onDelete: 'CASCADE'
    });
    Answer.belongsTo(models.Users, {
    	foreignKey: 'userId',
    	onDelete: 'CASCADE'
    });
  };
  return Answer;
};