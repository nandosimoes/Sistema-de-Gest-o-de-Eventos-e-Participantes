const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Participante = require('./participante');

const Evento = sequelize.define('evento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    localizacao: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Evento.hasMany(Participante, {
    foreignKey: 'eventoId',
    as: 'participantes',
    onDelete: 'CASCADE'
});
Participante.belongsTo(Evento, {
    foreignKey: 'eventoId',
    as: 'evento'
});

module.exports = Evento;
