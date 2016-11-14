angular.module('starter')

.controller('AccidentesCtrl', function($scope, $state) {
   $scope.irReporte = function(){
    console.log("entro");
    $state.go("tab.accidentesReporte");
  }   

  $scope.IrCalificar = function(){
    console.log("entro Calificar");
    $state.go("tab.calificarServicio");
  }  
})


