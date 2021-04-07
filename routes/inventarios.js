const router = require('express').Router();
const {
  crearInventario,
  obtenerInventarios,
  modificarInventario
} = require('../controllers/Inventarios')
var auth = require('./auth');

router.get('/', auth.opcional,obtenerInventarios)
router.post('/', auth.requerido, crearInventario)
router.put('/:id',auth.requerido, modificarInventario)

module.exports = router;