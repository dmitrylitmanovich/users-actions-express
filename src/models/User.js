const Sequelize = require('sequelize');
const db = require('./database');

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  hash: Sequelize.STRING,
  name: Sequelize.STRING,
  email: Sequelize.STRING
});
User.associate = (models) => {
  User.hasMany(models.action);
};

module.exports = User;