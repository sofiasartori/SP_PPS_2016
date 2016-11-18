angular.module('starter')

.controller('AccidentesCtrl', function($scope, $state, $cordovaGeolocation ) {
  var user = firebase.auth().currentUser;
  var options = {timeout: 10000, enableHighAccuracy: true};
  var ref = new Firebase("https://autopistas-cad17.firebaseio.com/");
  $scope.accidente={};
  $scope.accidente.mail=user.email;
  $scope.accidente.longitud;
  $scope.accidente.latitud;
  $scope.accidente.tipo="LLamada de emergencia";

  var starCountRef = firebase.database().ref('accidentes/');
  starCountRef.on('value', function(snapshot) {
    console.info(snapshot.val());
  });

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    $scope.accidente.longitud=position.coords.latitude; 
    $scope.accidente.latitud=position.coords.longitude;
  }, function(error){
      console.log("Could not get location");
  });
    
  $scope.CargarLlamada = function(){
  ref.push({
      email:$scope.accidente.mail,
      tipo: $scope.accidente.tipo,
      ubicacion:{
                  longitud: $scope.accidente.longitud,
                  latitud: $scope.accidente.latitud
                }      
    });

  }

   $scope.irReporte = function(){
    console.log("entro");
    $state.go("tab.accidentesReporte");
  }   

  $scope.IrCalificar = function(){
    console.log("entro Calificar");
    $state.go("tab.calificarServicio");
  }  


})


