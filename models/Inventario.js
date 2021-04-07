const mongoose = require("mongoose");

const InventarioSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'
  },
   nombre: {type: String, required: true}, 
  categoria: { type: String, enum: ['docena', 'arreglo', 'otro'] },
  fotos: [String], 
  descripcion: {type:String, required: true}, 
  precio: { type:Number, required: true,},
  cantidad: {type: Number, required: true},
  status: {type:Boolean}

}, { timestamps: true })

InventarioSchema.methods.publicData = function(){
  return {
    id: this.id,
    admin: this.admin,
    nombre: this.nombre,
    categoria: this.categoria,
    fotos: this.fotos,
    descripcion: this.descripcion,
    precio: this.precio,
    cantidad: this.cantidad,
    status: this.status

  };
};

mongoose.model('Inventario', InventarioSchema)