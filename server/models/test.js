module.exports = (sequelize, DataTypes) => {

  const Test = sequelize.define('Test', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Test.associate = function(models) {
    // associations can be defined here
  };

  return Test;
};