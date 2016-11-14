angular.module('starter')

.controller('AccidentesReporteCtrl', function($scope,$cordovaGeolocation,$ionicPopup,$state) {
  var user = firebase.auth().currentUser;
  var options = {timeout: 10000, enableHighAccuracy: true};
  var ref = new Firebase("https://autopistas-cad17.firebaseio.com/accidentes");
  $scope.accidente={};
  $scope.accidente.mail=user.email;
  $scope.accidente.longitud;
  $scope.accidente.latitud;
  $scope.accidente.tipo="Accidente";

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    $scope.accidente.longitud=position.coords.latitude; 
    $scope.accidente.latitud=position.coords.longitude;
  }, function(error){
      console.log("Could not get location");
  });
    

  
  $scope.CargarAccidente = function(){
  ref.push({
      email:$scope.accidente.mail,
      tipo: $scope.accidente.tipo,
      ubicacion:{
                  longitud: $scope.accidente.longitud,
                  latitud: $scope.accidente.latitud
                }      
    });

  var alertPopup = $ionicPopup.alert({
     title: 'Notificacion!',
     template: 'Gracias se cargo correctamente.'
   });
    alertPopup.then(function(res) {
     history.back();
   });

  }
  
});



