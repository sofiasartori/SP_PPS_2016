angular
  .module('starter')
  .factory('FactoryUser', function(){
     	var objeto = {};
	    objeto.nombre = "Factory de Rutas";
	    objeto.firebase= "https://autopistas-cad17.firebaseio.com/user";
	    return objeto;
  })//Cierra factory