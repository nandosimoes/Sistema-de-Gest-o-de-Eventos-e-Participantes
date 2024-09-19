require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/config');
const eventoRouter = require('./router/eventoRouter');
const participanteRouter = require('./router/participanteRouter');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/evento', eventoRouter);
app.use('/api/participante', participanteRouter);

app.get('/healthcheck', (req, res) => {
    return res.status(200).json({ msg: 'API funcionando!' });
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Conexão estabelecida com sucesso!');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(8080, () => {
            console.log(`Servidor rodando na porta 8008`);
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar no banco de dados:', error);
    });
