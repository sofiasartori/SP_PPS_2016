angular.module('starter')

.controller('AccidentesCtrl', function($scope, $state) {
   $scope.irReporte = function(){
    console.log("entro");
    $state.go("tab.accidentesReporte");
  }   
})


