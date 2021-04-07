// realizar el modelo para los campos del diagrama 

const mongoose = require("mongoose");

var PedidoProductoSchema = new mongoose.Schema(
  {
    numeroPedido: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Pedido"
    },
    productoId: {     
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Inventario" },
    cantidad: {
      type: Number,
      required: true
    }
  },
  {timestamps: true }
);

  PedidoProductoSchema.methods.publicData = function(){
  return {
     id: this.id,
     createdAt: this.createdAt,
     updatedAt: this.updatedAt,
     numeroPedido: this.numeroPedido,
     productoId: this.productoId
    };
  };
  
mongoose.model('PedidoProducto', PedidoProductoSchema)