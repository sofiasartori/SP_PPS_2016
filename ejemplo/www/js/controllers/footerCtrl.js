angular.module('starter')
 .factory('login', function () {
   var logueado = false;
   var login = {};
   login.setLogueado = function (valor) {
     logueado = valor;
   };
   login.getLogueado = function () {
     return logueado;
   };
   return login;
 })
 .controller("FooterCtrl", ['$scope', '$rootScope', 'login', function ($scope, $state, login) {
   $scope.getLogueado = login.getLogueado;
 }])