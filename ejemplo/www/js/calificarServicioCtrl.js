angular.module('starter')

.controller('AccidentesCalificarCtrl', function($scope,$cordovaGeolocation,$ionicPopup,$state) {
  var user = firebase.auth().currentUser;
  var ref = new Firebase("https://autopistas-cad17.firebaseio.com/accidentes");
  $scope.accidente={};
  $scope.accidente.mail=user.email;
  $scope.accidente.meGusta=0;
  $scope.accidente.noMeGusta=0;
  $scope.accidente.comentario;


$scope.MeGusta = function(){
    $scope.accidente.meGusta=1;
    MostrarPopap();
 }
 $scope.NoMeGusta = function(){
    $scope.accidente.noMeGusta=1;
    MostrarPopap();
 }

  
 function CargarAccidente (){
  ref.push({
      email:$scope.accidente.mail,
      meGusta: $scope.accidente.meGusta,
      noMeGusta: $scope.accidente.noMeGusta, 
      comentario: $scope.accidente.comentario   
    });
  MostrarPopap();
  }

  $scope.Comentar = function(){
    if ($scope.accidente.comentario){
      CargarAccidente ();
    }
    else{
      MostrarPopapError();
      console.log("error");
    }
    
  }

  function MostrarPopap(){
  var alertPopup = $ionicPopup.alert({
     title: 'Notificacion!',
     template: 'Gracias se cargo correctamente.'
   });
    alertPopup.then(function(res) {
     history.back();
   });
  }

  function MostrarPopapError(){
    var alertPopup = $ionicPopup.alert({
       title: 'Notificacion!',
       template: 'Debe cargar un Comentario o ser de mas de 20 caracter'
     });
      alertPopup.then(function(res) {
     });
  }
    
});



