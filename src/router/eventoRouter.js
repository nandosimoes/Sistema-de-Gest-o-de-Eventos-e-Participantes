const { Router } = require('express');
const EventoController = require('../controller/eventoController');
const router = Router();

router.get('/', EventoController.getAll);
router.get('/:id', EventoController.getOne);
router.post('/', EventoController.create);
router.put('/:id', EventoController.update);
router.delete('/:id', EventoController.delete);
router.get('/:id/participante', EventoController.getParticipants);

module.exports = router;
