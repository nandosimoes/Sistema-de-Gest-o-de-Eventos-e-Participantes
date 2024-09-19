const Evento = require('../models/evento');
const Participante = require('../models/participante');

const EventoController = {
    getAll: async (req, res) => {
        try {
            const eventos = await Evento.findAll();
            res.status(200).json(eventos);
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao buscar eventos. Acione o suporte.', error });
        }
    },

    getOne: async (req, res) => {
        try {
            const evento = await Evento.findByPk(req.params.id, {
                include: { model: Participante, as: 'participantes' }
            });
            if (!evento) {
                return res.status(404).json({ msg: 'Evento não encontrado.' });
            }
            res.status(200).json(evento);
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao buscar evento. Acione o suporte.', error });
        }
    },

    create: async (req, res) => {
        try {
            const { nome, data, localizacao } = req.body;
            if (!nome || !data || !localizacao) {
                return res.status(400).json({ msg: 'Todos os campos (nome, data, localização) são obrigatórios.' });
            }
            const novoEvento = await Evento.create({ nome, data, localizacao });
            res.status(201).json(novoEvento);
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao criar evento. Acione o suporte.', error });
        }
    },

    update: async (req, res) => {
        try {
            const evento = await Evento.findByPk(req.params.id);
            if (!evento) {
                return res.status(404).json({ msg: 'Evento não encontrado.' });
            }

            const { nome, data, localizacao } = req.body;
            if (!nome || !data || !localizacao) {
                return res.status(400).json({ msg: 'Todos os campos (nome, data, localização) são obrigatórios.' });
            }
            await evento.update({ nome, data, localizacao });
            res.status(200).json({ msg: 'Evento atualizado com sucesso.' });
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao atualizar evento. Acione o suporte.', error });
        }
    },

    delete: async (req, res) => {
        try {
            const evento = await Evento.findByPk(req.params.id);
            if (!evento) {
                return res.status(404).json({ msg: 'Evento não encontrado.' });
            }
            await evento.destroy();
            res.status(200).json({ msg: 'Evento excluído com sucesso.' });
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao excluir evento. Acione o suporte.', error });
        }
    },

    getParticipants: async (req, res) => {
        try {
            const participantes = await Participante.findAll({ where: { eventoId: req.params.id } });
            res.status(200).json(participantes);
        } catch (error) {
            res.status(500).json({ msg: 'Erro ao buscar participantes. Acione o suporte.', error });
        }
    }
};

module.exports = EventoController;
