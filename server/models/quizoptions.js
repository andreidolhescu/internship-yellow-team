'use strict';
module.exports = (sequelize, DataTypes) => {
  var QuizOptions = sequelize.define('QuizOptions', {
    Option: 
    {
    	type: DataTypes.STRING,
    },
    isCorrect: 
    {
    	type: DataTypes.BOOLEAN,
    	defaultValue: false,
    }
  }, {});
  QuizOptions.associate = function(models) {
    QuizOptions.belongsTo(models.Chapter, {
    	foreignKey: 'quizId',
    	onDelete: 'CASCADE'
    });
  };
  return QuizOptions;
};