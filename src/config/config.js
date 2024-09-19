const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('projeto03', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
