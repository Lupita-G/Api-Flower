const mongoose = require('mongoose')
const Inventario = mongoose.model('Inventario')

function crearInventario(req, res, next) {
  var inventario = new Inventario(req.body)
  inventario.admin = req.usuario.id
  inventario.status = true
  inventario.save().then(inventario => {
    res.status(201).send(inventario)
  }).catch(next)
}

function obtenerInventarios(req, res, next) {
  Inventario.find().then(inventarios=>{
    res.send(inventarios)
  }).catch(next)
}


function modificarInventario(req, res, next) {
  console.log(req.usuario)
  Inventario.findById(req.inventario.id).then(inventario => {
    if (!inventario) { return res.sendStatus(401); }
    let nuevaInfo = req.body
    if (typeof nuevaInfo.nombre !== 'undefined')
      inventario.nombre = nuevaInfo.nombre
    if (typeof nuevaInfo.categoria !== 'undefined')
      inventario.categoria = nuevaInfo.categoria
    if (typeof nuevaInfo.fotos !== 'undefined')
      inventario.fotos = nuevaInfo.fotos
    if (typeof nuevaInfo.descripcion !== 'undefined')
      inventario.descripcion = nuevaInfo.descripcion
    if (typeof nuevaInfo.precio !== 'undefined')
      inventario.precio = nuevaInfo.precio
    if (typeof nuevaInfo.cantidad !== 'undefined')
      inventario.cantidad = nuevaInfo.cantidad
    if (typeof nuevaInfo.status !== 'undefined')
      inventario.status = nuevaInfo.status
      inventario.save().then(updatedInventario => {       //Guardando datos actualizados, modificado en MongoDB.
      res.status(201).json(updatedInventario.publicData())
    }).catch(next)
  }).catch(next)
}

module.exports = {
  crearInventario,
  obtenerInventarios,
  modificarInventario
}