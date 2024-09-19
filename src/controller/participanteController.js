const Participante = require('../models/participante');
const Evento = require('../models/evento');

const ParticipanteController = {
    getAll: async (req, res) => {
        try {
            const participantes = await Participante.findAll();
            res.status(200).json(participantes);
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao buscar participantes. Acione o suporte.', error });
        }
    },

    getOne: async (req, res) => {
        try {
            const participante = await Participante.findByPk(req.params.id);
            if (!participante) {
                return res.status(404).json({ msg: 'Participante não encontrado.' });
            }
            res.status(200).json(participante);
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao buscar participante. Acione o suporte.', error });
        }
    },
    create: async (req, res) => {
        
        try {
            const { nome, email, eventoId } = req.body;
            if (!nome || !email || !eventoId) {
                return res.status(400).json({ msg: 'Os campos nome, email e eventoId são obrigatórios.' });
            }
            const participanteExistente = await Participante.findOne({ where: { email } });
            if (participanteExistente) {
                return res.status(400).json({ msg: `Participante com o email '${email}' já está inscrito em um evento.` });
            }

            const eventoExiste = await Evento.findByPk(eventoId);
            if (!eventoExiste) {
                return res.status(404).json({ msg: 'O evento informado não existe.' });
            }

            const novoParticipante = await Participante.create({ nome, email, eventoId });
            res.status(201).json(novoParticipante);
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao criar participante', error });
        }
    },

    update: async (req, res) => {
        try {
            const participante = await Participante.findByPk(req.params.id);
            if (!participante) {
                return res.status(404).json({ msg: 'Participante não encontrado.' });
            }
            const { nome, email, eventoId } = req.body;
            if (!nome || !email || !eventoId) {
                return res.status(400).json({ msg: 'Todos os campos (nome, email, eventoId) são obrigatórios.' });
            }
            
            const eventoExiste = await Evento.findByPk(eventoId);
            if (!eventoExiste) {
                return res.status(404).json({ msg: 'O evento informado não existe.' });
            }
            await participante.update({ nome, email, eventoId });
            res.status(200).json({ msg: 'Participante atualizado com sucesso.' });
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao atualizar participante. Acione o suporte.', error });
        }
    },

    delete: async (req, res) => {
        try {
            const participante = await Participante.findByPk(req.params.id);
            if (!participante) {
                return res.status(404).json({ msg: 'Participante não encontrado.' });
            }
            await participante.destroy();
            res.status(200).json({ msg: 'Participante excluído com sucesso.' });
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao excluir participante. Acione o suporte.', error });
        }
    },

    getByEvento: async (req, res) => {
        try {
            const participantes = await Participante.findAll({ where: { eventoId: req.params.eventoId } });
            res.status(200).json(participantes);
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao buscar participantes por evento. Acione o suporte.', error });
        }
    }
};

module.exports = ParticipanteController;
