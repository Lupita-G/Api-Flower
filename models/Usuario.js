const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require('crypto');                             //Importando módulo crypto, pendiente de instalar.
const jwt = require('jsonwebtoken');                          //Importando módulo jsonwebtoken, pendiente de instalar.
const secret = require('../config').secret;



const UsuarioSchema = new mongoose.Schema({ 
    
    //Definiendo el objeto UsuarioSchema con el constructor Schema.
    rol: { type: String, enum: ['usuario', 'admin']},
    username: {                                                  //Definiendo cada campo con sus tipo sde datos y validaciones.
      type: String,
      unique: true, //este campo no se puede repetir
      lowercase: true,
      required: [true, "no puede estar vacío"],
      match: [/^[a-zA-Z0-9]+$/, "es inválido"],
      index: true,
    },                                           
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: {
      type: String,
      unique: true, //este campo no se puede repetir
      lowercase: true,
      required: [true, "no puede estar vacío"],
      match: [/\S+@\S+\.\S+/, "es inválido"],
      index: true,
    },
    telefono: String,
    hash: String, //este campo se utilizará para la sesión
    salt: String, //este campo se utilizará para la sesión
    },
    { timestamps: true }
    );

    // usando plugin de validación para que no se repitan correos ni usernames
    UsuarioSchema.plugin(uniqueValidator, { message: "Ya existe" }); 

    UsuarioSchema.methods.crearPassword = function (password) {
        this.salt = crypto.randomBytes(16).toString("hex"); // generando una "sal" random para cada usuario
        this.hash = crypto
          .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
          .toString("hex"); // generando un hash utilizando la sal
      };
      
      /**
       * Recibe el password, genera y compara el has con el de la base de datos
       */
      UsuarioSchema.methods.validarPassword = function (password) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
        return this.hash === hash;
      };
      
      UsuarioSchema.methods.generarJWT = function() {
        const today = new Date(); //genera la fecha actual para poder generar la expiración
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60); // 60 días antes de expirar
      
        return jwt.sign({
          id: this._id,
          username: this.username,
          exp: parseInt(exp.getTime() / 1000), //retorna el id de user, el user name , y la fecha de expiracion en 
          //milisegundos
        }, secret); //esta guardado en secreto
      };
      
      /**
       * Devuelve la representación de un usuario después de autenticar
       */
      UsuarioSchema.methods.toAuthJSON = function(){
        return {
          username: this.username,
          email: this.email,
          token: this.generarJWT()
        };
      };
      
      /**
      * Devuelve la representación de un usuario, sólo datos públicos
      */
      UsuarioSchema.methods.publicData = function(){
        return {
          id: this.id,
          rol: this.rol,
          username: this.username,
          email: this.email,
          nombre: this.nombre,
          apellido: this.apellido,
          telefono: this.telefono,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt
        };
      };

    mongoose.model("Usuario", UsuarioSchema);    //Define el modelo Usuario, utilizando el esquema UsuarioSchema.



