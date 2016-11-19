angular.module('starter.controllers', [])

.controller('AnimalesSueltosCtrl', function($scope, $state, $cordovaGeolocation, $ionicPopup, $cordovaVibration, $cordovaNativeAudio) {
  try{
    $cordovaNativeAudio.preloadSimple('corr', 'sounds/correct.mp3');
    }
  catch (e){
    console.log("no puede reproducir native audio");
  }
  var options = {timeout: 10000, enableHighAccuracy: true};
  var user = firebase.auth().currentUser;
  var base = new Firebase("https://autopistas-cad17.firebaseio.com/animales");
  $scope.animal = {};
  $scope.animal.longitud = '';
  $scope.animal.latitud = '';
	
  $scope.reportar = function(){
    //$cordovaNativeAudio.play('corr');
    //$cordovaVibration.vibrate(100);
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


