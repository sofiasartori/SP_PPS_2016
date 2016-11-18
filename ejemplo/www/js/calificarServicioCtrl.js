angular.module('starter')

.controller('AccidentesCalificarCtrl', function($scope,$cordovaGeolocation,$ionicPopup,$state) {
  var user = firebase.auth().currentUser;
  $scope.accidente={};
  $scope.accidente.mail=user.email;
  $scope.accidente.comentario="";

 var refCali = new Firebase("https://autopistas-cad17.firebaseio.com/");

  var starCountRef = firebase.database().ref('calificaciones/'+ user.i);
  starCountRef.on('value', function(snapshot) {
    console.info(snapshot.val());
  });


$scope.MeGusta = function(){
    CargarAccidentes({meGusta: 1,
                      noMeGusta: 0});
 }
 $scope.NoMeGusta = function(){
    CargarAccidentes({meGusta: 0,
                      noMeGusta: 1});
 }

  $scope.Comentar = function (){
    if ($scope.accidente.comentario!="" && $scope.accidente.comentario.length>20){
        CargarAccidentes({comentario: $scope.accidente.comentario});
    }
    else{
      MostrarPopapError();
      console.log("error");
    }
  }
    

  function CargarAccidentes(jsonUpdate){
      refCali.child('calificaciones/'+ user.i).update(jsonUpdate);
      MostrarPopap();
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
       template: 'Debe cargar un comentario y debe ser mas de 20 caracter'
     });
      alertPopup.then(function(res) {
     });
  }
    
});



