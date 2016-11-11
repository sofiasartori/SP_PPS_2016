angular.module('starter.controllers', ['ionic'])

.controller('AccidentesCtrl', function($scope) {
  var ref = new Firebase("https://votaciones-f2766.firebaseio.com/");
  $scope.accidente={};
  $scope.accidente.nombre;
  $scope.accidente.direccion;
  $scope.accidente.tipo;
  $scope.accidente.telefono;

  $scope.CargarAccidente = function(){
  	 ref.push({
      nombre: $scope.nombre,
      direccion: $scope.direccion,
      tipo: $scope.tipo,
      tel: $scope.telefono
    });

  	$state.go("tab");
  }

	
   
})


