const Sequelize = require(
  'sequelize');
const db = require('./database');
const User = require("./User");

const Action = db.define('actions', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  actiontype: Sequelize.INTEGER
});
Action.associate = (models) => {
  Action.belongsTo(models.user);
};

module.exports = Action;
