angular.module('starter')

.controller('AccidentesCalificarCtrl', function($scope,$cordovaGeolocation,$ionicPopup,$state) {
  var user = firebase.auth().currentUser;
  $scope.calificaciones={};
  $scope.accidente={};
  $scope.accidente.mail=user.email;
  $scope.accidente.meGusta=0;
  $scope.accidente.noMeGusta=0;
  $scope.accidente.comentario="";
  $scope.meGusta;
  $scope.noMeGusta;
  $scope.comentario;


 var refCali = new Firebase("https://autopistas-cad17.firebaseio.com/calificaciones/"+ user.i);

  var starCountRef = firebase.database().ref('calificaciones/'+ user.i);
  starCountRef.on('value', function(snapshot) {
    $scope.meGusta=snapshot.val().meGusta;
    $scope.noMeGusta=snapshot.val().noMeGusta;
    $scope.comentario=snapshot.val().comentario;
  });

  var starCountRef = firebase.database().ref('calificaciones/');
  starCountRef.on('value', function(snapshot) {
    console.info(snapshot.val());
  });



$scope.MeGusta = function(){
  $scope.accidente.meGusta=1;
  $scope.accidente.noMeGusta=0;
  if($scope.accidente.comentario==$scope.comentario || $scope.accidente.comentario=="")
  $scope.accidente.comentario=$scope.comentario;
  CargarCalificacion()
 }
 $scope.NoMeGusta = function(){
  $scope.accidente.meGusta=0;
  $scope.accidente.noMeGusta=1;
  if($scope.accidente.comentario==$scope.comentario || $scope.accidente.comentario=="")
  $scope.accidente.comentario=$scope.comentario;
  CargarCalificacion()
 }

  $scope.Comentar = function (){
    if ($scope.accidente.comentario!="" && $scope.accidente.comentario.length>20){
       $scope.accidente.meGusta=$scope.meGusta;
       $scope.accidente.noMeGusta=$scope.noMeGusta;
       if($scope.accidente.comentario==$scope.comentario || $scope.accidente.comentario=="")
       $scope.accidente.comentario=$scope.comentario;
        CargarCalificacion();
    }
    else{
      MostrarPopapError();
      console.log("error");
    }
  }
    

  function CargarCalificacion(){
      refCali.set({
        email: $scope.accidente.mail,
        meGusta: $scope.accidente.meGusta,
        noMeGusta: $scope.accidente.noMeGusta,
        comentario: $scope.accidente.comentario
      });
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



