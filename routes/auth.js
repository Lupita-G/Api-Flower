const jwt = require('express-jwt');
const secret = require('../config').secret;

function getTokenFromHeader(req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' || //si encuentra token o Bearer
    req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') { //va y revisa en las autorizacion 
    return req.headers.authorization.split(' ')[1];                                      // de la posicion 1
  }

  return null;
}

const auth = {  //estamos creando dos middlewares , requerido y opcional
  requerido: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'usuario', 
    getToken: getTokenFromHeader
  }),
  opcional: jwt({
    secret: secret,
    algorithms: ['HS256'],
    userProperty: 'usuario',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth;   