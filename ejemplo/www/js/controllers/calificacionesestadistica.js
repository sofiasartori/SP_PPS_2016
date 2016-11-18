angular.module('starter')

.controller('CalificacionesEstadisticaCtrl', function($scope,Torta,$timeout) {

	  var ref = new Firebase("https://autopistas-cad17.firebaseio.com/calificaciones");
	
	   $("#tbltorta").hide();
	   var contadormegusta=0;
	   var contadornomegusta=0;
		//$scope.nomegusta=0;
		//$scope.megusta=0;
		ref.on('child_added', function (snapshot) {
				var lala=snapshot.val();
				 contadormegusta=contadormegusta+lala.MeGusta;
				 contadornomegusta=contadornomegusta+lala.NoMeGusta;
				
				if (lala === undefined) {
				 
				} else {
				
				   console.log(contadormegusta);
				    $scope.megusta=parseInt(contadormegusta);
				    $scope.nomegusta=parseInt(contadornomegusta);
				    $("#tbltorta").append("<thead><tr><th></th><th>Me gusta</th><th>No me gusta</th></tr></thead><tbody><tr><th></th><td>"+$scope.megusta+"</td><td>"+$scope.nomegusta+"</td></tr></tbody>");
				    $timeout(function(){
				    	 Torta.CrearGrafico();
				    }, 3000);
				   
				}

			});
})