angular.module('starter')


.controller('AccidentesCtrl', function($scope, $state,$timeout, $cordovaGeolocation,$ionicPopup, $cordovaProgress ) {
  var user = firebase.auth().currentUser;
  var options = {timeout: 10000, enableHighAccuracy: true};
  var ref = new Firebase("https://autopistas-cad17.firebaseio.com/");
  


  $scope.personas={};
  $scope.visible=false;
  $scope.accidente={};
  $scope.accidente.longitud;
  $scope.accidente.latitud;
  $scope.accidente.tipo="LLamada de emergencia";


  var starCountRef = firebase.database().ref('accidentes/');
  starCountRef.on('value', function(snapshot) {
    $scope.personas=snapshot.val();
    console.log($scope.personas);
     $timeout(function(){
               $scope.visible=true;
      }, 3000);
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


