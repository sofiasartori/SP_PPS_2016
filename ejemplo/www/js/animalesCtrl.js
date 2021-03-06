angular.module('starter.controllers', [])

.controller('AnimalesSueltosCtrl', function($scope, $state, $cordovaGeolocation, $ionicPopup, $cordovaVibration){
  $scope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
    alert(msg.title + ': ' + msg.text);
    $state.go("tab.mapaAnimales");
  });
  $scope.administrador=false;
  var options = {timeout: 10000, enableHighAccuracy: true};
  var user = firebase.auth().currentUser;
  if(user.email == "admin@hotmail.com")
  {
      $scope.administrador=true;
  }
  else
  {
      $scope.administrador=false;
  }  
  var base = new Firebase("https://autopistas-cad17.firebaseio.com/animales");
  $scope.animal = {};
  $scope.animal.longitud = '';
  $scope.animal.latitud = '';
	
  $scope.reportar = function(){
    $cordovaVibration.vibrate(100);
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        $scope.animal.longitud=position.coords.latitude; 
        $scope.animal.latitud=position.coords.longitude;
        base.push({
          ubicacion:{
            longitud: $scope.animal.longitud,
            latitud: $scope.animal.latitud
          }      
        });
        }, function(error){
          console.log("No se pudo obtener locacion");
        });
      
      var alerta = $ionicPopup.alert({
        title: 'Animal reportado!',
        template: 'Animal reportado con exito.'
      });
      alerta.then(function(res) {      
      });
  }

  $scope.irMapa = function(){
    console.log("hola");
    $state.go("tab.mapaAnimales");
  }

  $scope.irGrafico = function(){
    $state.go("tab.analiticasAnimales");
  }
  	
});


