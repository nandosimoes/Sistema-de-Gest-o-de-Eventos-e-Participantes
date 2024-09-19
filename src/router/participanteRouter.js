const { Router } = require('express');
const ParticipanteController = require('../controller/participanteController');
const router = Router();

router.get('/', ParticipanteController.getAll);
router.get('/:id', ParticipanteController.getOne);
router.post('/', ParticipanteController.create);
router.put('/:id', ParticipanteController.update);
router.delete('/:id', ParticipanteController.delete);
router.get('/por-evento/:eventoId', ParticipanteController.getByEvento);

module.exports = router;
