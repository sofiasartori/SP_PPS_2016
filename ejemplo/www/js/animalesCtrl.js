angular.module('starter.controllers', [])

.controller('AnimalesSueltosCtrl', function($scope, $state, $cordovaGeolocation) {
	var options = {timeout: 10000, enableHighAccuracy: true};
 
  	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    	var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    	var mapOptions = {
      		center: latLng,
      		zoom: 15,
      		mapTypeId: google.maps.MapTypeId.ROADMAP
    	};
 	$scope.mostrarAnimal = false;
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
  		var marker = new google.maps.Marker({
      	map: $scope.map,
      	animation: google.maps.Animation.DROP,
      	position: latLng
  		});      

  		var infoWindow = new google.maps.InfoWindow({
      		content: "Cuidado!!! Vaca suelta"
  		});
 
  		google.maps.event.addListener(marker, 'click', function () {
      		infoWindow.open($scope.map, marker);
      		$scope.mostrarAnimal=true;
  		});
 
	});	
 
  	}, function(error){
    	console.log("Could not get location");
  	});
  	
  	
});


