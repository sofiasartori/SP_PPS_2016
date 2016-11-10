angular.module('starter.controllers', [])

.controller('CrearUsuarioCtrl', function($scope, User)
{
	
	$scope.guardardatos=function(){

		//alert("lala");
		User.CrearUsuario($("#email").val(),$("#contrasena").val(),$("#nombre").val(),$("#apellido").val(),$("#telefono").val());

		
			
		
	};
	

});