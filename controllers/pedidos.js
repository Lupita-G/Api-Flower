/// cuando genere el pedido, guardar a la tabla pedidos, y en la tabla pedido producto******** modelo save 

//invocar la función para dismimuir el inventario cuando el cliente requiera el producto 


const mongoose = require('mongoose')
const Pedido = mongoose.model('Pedido')
//const PedidoProducto = mongoose.model('PedidoProducto')
//const Inventario =mongoose.model('Inventario')

function crearPedido(req, res, next) {
  var pedido = new Pedido(req.body)
  pedido.recibeNombre = req.pedido.recibeNombre
  pedido.calle = req.pedido.calle
  pedido.colonia = req.pedido.colonia
  pedido.ciudad = req.pedido.ciudad
  pedido.cp = req.pedido.cp
  pedido.estado = req.pedido.estado
  pedido.status = 'pendiente'
  pedido.save().then(pedido => {
    res.status(201).send(pedido)
  }).catch(next)

  //disminuir inventario
  //salvar pedido-producto
}

//function crearPedidoProducto ()


function obtenerPedidos(req, res, next) {
  if(req.params.id){
    Pedido.findById(req.params.id)
			.populate('numeroPedido ', 'recibeNombre calle colonia ciudad cp estado status').then(pedidos => {
	      res.send(pedidos)
	    }).catch(next)
  } else {
    Pedido.find().then(pedidos=>{
      res.send(pedidos)
    }).catch(next)
  }
}


function modificarPedido(req, res, next) {
  console.log(req.pedido)
  Pedido.findById(req.pedido.id).then(pedidos => {
    if (!pedidos) { return res.sendStatus(401); }
    let nuevaInfo = req.body
    if (typeof nuevaInfo.recibeNombre !== 'undefined')
      pedidos.recibeNombre = nuevaInfo.recibeNombre
    if (typeof nuevaInfo.calle !== 'undefined')
      pedidos.calle = nuevaInfo.calle
    if (typeof nuevaInfo.colonia !== 'undefined')
      pedidos.colonia = nuevaInfo.colonia
    if (typeof nuevaInfo.ciudad !== 'undefined')
      pedidos.ciudad = nuevaInfo.ciudad
    if (typeof nuevaInfo.cp !== 'undefined')
      pedidos.cp = nuevaInfo.cp
    if (typeof nuevaInfo.estado !== 'undefined')
      pedidos.estado = nuevaInfo.estado
    pedidos.save().then(updatedPedidos => {                 //Guardando datos actualizados de usuario, modificado en MongoDB.
      res.status(201).json(updatedPedidos.publicData())
    }).catch(next)
  }).catch(next)
}

module.exports = {
  crearPedido,
  obtenerPedidos,
  modificarPedido,
}