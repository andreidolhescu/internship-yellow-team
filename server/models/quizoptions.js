'use strict';
module.exports = (sequelize, DataTypes) => {
  var QuizOptions = sequelize.define('QuizOptions', {
    Option: 
    {
    	type: DataTypes.STRING(70),
    },
    isCorrect: 
    {
    	type: DataTypes.BOOLEAN,
    	defaultValue: false,
    }
  }, {});
  QuizOptions.associate = function(models) {
    QuizOptions.belongsTo(models.Quiz, {
    	foreignKey: 'quizId',
    	onDelete: 'CASCADE'
    });
    QuizOptions.hasMany(models.Answer, {
      foreignKey: 'quizoptionId',
      as: 'answers'
    });
  };
  return QuizOptions;
};