angular.module('starter')

.controller('LoginCtrl', function($scope, User, $state)
{
	console.log("estoy en login");
	 
	$scope.login=function()
	{	console.log("estoy en el metodo login");
		 User.Login($("#email").val(),$("#contrasena").val());
	};
	$scope.registrarse=function()
	{
		console.log("estoy en registearse");
		 $state.go("tab.crearusuario");
	};
	

});