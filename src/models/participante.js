const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Participante = sequelize.define('participante', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eventoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'eventos',
            key: 'id'
        }
    }
});

module.exports = Participante;
