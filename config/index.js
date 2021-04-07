module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
  }; // estamos creando dos variables de entorno, NODE ENV y si es igual a production  & la 
      //variable  SECRET es igual a secret algo va a suceder. 