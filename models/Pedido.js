const mongoose = require("mongoose");
//const InventarioSchema = mongoose.Schema("Inventario");

var PedidoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Usuario",
    },
    numeroPedido: {type: Number, unique: true, index: true},
    recibeNombre: { type: String },
    calle: {type: String},
    colonia: {type: String},
    ciudad: {type:String},
    cp: {type:String},
    estado: {Type:String},
    status: {type:String, enum: ['entregado', 'pendiente', 'cancelado']}
  },
  {timestamps: true }
);

  PedidoSchema.methods.publicData = function(){
  return {
     id: this.id,
     createdAt: this.createdAt,
     updatedAt: this.updatedAt,
     usuario: this.usuario,
     numeroPedido: this.numeroPedido,
     recibeNombre: this.recibeNombre,
     calle: this.calle,
     colonia: this.colonia,
     ciudad: this.ciudad,
     cp: this.cp,
     estado: this.estado
    };
  };
  
mongoose.model('Pedido', PedidoSchema)