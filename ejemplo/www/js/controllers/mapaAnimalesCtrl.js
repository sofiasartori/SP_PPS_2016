angular.module('starter.controllers')

.controller('MapaAnimalesCtrl', function($scope, $state, $cordovaGeolocation) {
  $("#map").hide();
  setTimeout(function() {
    $(".loader").hide();
    $("#map").show();
  }, 4000);
  var options = {timeout: 10000, enableHighAccuracy: true};
  var user = firebase.auth().currentUser;
  var base = new Firebase("https://autopistas-cad17.firebaseio.com/animales");
  $scope.animal = {};
  $scope.animal.longitud;
  $scope.animal.latitud;
  $scope.setMostrarAnimal = function(){
    document.getElementById("animalSuelto").style.display = "none";
    document.getElementById("animalSuelto2").style.display = "none";
    document.getElementById("animalGenerico").style.display = "";
  }
  $scope.setMostrarVaca= function() {
    document.getElementById("animalSuelto2").style.display = "none";
    document.getElementById("animalGenerico").style.display = "none";
    document.getElementById("animalSuelto").style.display = "";
  }
  $scope.setMostrarCaballo= function() {
    document.getElementById("animalSuelto").style.display = "none";
    document.getElementById("animalGenerico").style.display = "none";
    document.getElementById("animalSuelto2").style.display = "";
  }

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var latLng2 = new google.maps.LatLng(position.coords.latitude+0.001, position.coords.longitude+0.002);
 
      var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });    

      var marker2 = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng2
      }); 

      base.on('child_added', function (snapshot) {
        var ani=snapshot.val();
        console.log("ani: " + JSON.stringify(ani));
        var latLng = new google.maps.LatLng((ani.ubicacion.latitud).toString(), (ani.ubicacion.longitud).toString());
        console.log("latlg: " + typeof ani.ubicacion.latitud);
        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

        var infoWindow = new google.maps.InfoWindow({
          content: "Cuidado!!! Animal suelto"
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
          $scope.setMostrarAnimal( "");
        });
      });     

      var infoWindow = new google.maps.InfoWindow({
          content: "Cuidado!!! Vaca suelta"
      });

      var infoWindow2 = new google.maps.InfoWindow({
          content: "Cuidado!!! Caballo suelto"
      });
 
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
          $scope.setMostrarVaca( "");
      });

      google.maps.event.addListener(marker2, 'click', function () {
          infoWindow2.open($scope.map, marker2);
          $scope.setMostrarCaballo( "");
      });
 
  }); 
 
    }, function(error){
      console.log("Could not get location");
    });   
    
});