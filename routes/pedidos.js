const router = require('express').Router();
const {
  crearPedido,
  modificarPedido,
  obtenerPedidos
} = require('../controllers/pedidos')
var auth = require('./auth');

router.get('/', auth.requerido, obtenerPedidos)
router.get('/:id', auth.requerido, obtenerPedidos)
router.post('/', auth.requerido, crearPedido)
router.put('/:id', auth.requerido, modificarPedido)

module.exports = router;