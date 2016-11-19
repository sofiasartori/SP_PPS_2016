angular.module('starter.services', [])

.factory('Logueado', function() {
  var logueado = false;
   var login = {};
   login.setLogueado = function (valor) {
     logueado = valor;
   };
   login.getLogueado = function () {
     return logueado;
   };
   return login;
});
