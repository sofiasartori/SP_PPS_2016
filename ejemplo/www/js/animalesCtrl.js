angular.module('starter.controllers', [])

.controller('AnimalesSueltosCtrl', function($scope, $state, $cordovaGeolocation, $ionicPopup) {
	var options = {timeout: 10000, enableHighAccuracy: true};
  var user = firebase.auth().currentUser;
  var base = new Firebase("https://autopistas-cad17.firebaseio.com/animales");
  $scope.animal = {};
  $scope.animal.longitud;
  $scope.animal.latitud;

  $scope.labels = ["Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre"];
  $scope.series = ['Caballos', 'Vacas'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };

 	$scope.setMostrarVaca= function() {
		document.getElementById("animalSuelto2").style.display = "none";
		document.getElementById("animalSuelto").style.display = "";
	}
	$scope.setMostrarCaballo= function() {
		document.getElementById("animalSuelto").style.display = "none";
		document.getElementById("animalSuelto2").style.display = "";
	}
  $scope.reportar = function(){
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        $scope.animal.longitud=position.coords.latitude; 
        $scope.animal.latitud=position.coords.longitude;
        }, function(error){
          console.log("No se pudo obtener locacion");
        });
      base.push({
        ubicacion:{
          longitud: $scope.animal.longitud,
          latitud: $scope.animal.latitud
        }      
      });
      var alerta = $ionicPopup.alert({
        title: 'Animal reportado!',
        template: 'Animal reportado con exito.'
      });
      alerta.then(function(res) {      
      });
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


