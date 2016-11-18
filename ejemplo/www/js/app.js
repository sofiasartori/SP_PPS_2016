// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var push = new Ionic.Push({
      "onNotification": function(notification){
        alert('Received notification!');
      },
      "pluginConfig": {
        "android": {
          "iconColor": "blue"
         }
      }
    });

      var user = Ionic.User.current();

      user.set('name', 'Sofia');
      user.set('bio', 'hola');
      user.save();

      var callback = function(){
        push.addTokenToUser(user);
        user.save();
      };

      push.register(callback);
    });
  
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom'); 

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.login', {
    url: '/login',
    views: {
      'tab-login': {
        templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('tab.mapsAccidentes', {
    url: '/mapsAccidentes',
    views: {
      'tab-accidentes': {
        templateUrl: 'templates/mapsAccidentes.html',
        controller: 'AccidentesCtrl'
      }
    }
  })

  .state('tab.crearusuario', {
    url: '/crearusuario',
    views: {
      'tab-login': {
        templateUrl: 'templates/crearusuario.html',
        controller: 'CrearUsuarioCtrl'
      }
    }
  })

  .state('tab.accidentes', {
      url: '/accidentes',
      views: {
        'tab-accidentes': {
          templateUrl: 'templates/tab-accidentes.html',
          controller: 'AccidentesCtrl'
        }
      }
    })
  .state('tab.accidentesReporte', {
    url: '/tab.accidentesReporte',
    views: {
      'tab-accidentes': {
        templateUrl: 'templates/accidentes-reporte.html',
        controller: 'AccidentesReporteCtrl'
      }
    }
  })

  .state('tab.calificarServicio', {
    url: '/tab.calificarServicio',
    views: {
      'tab-accidentes': {
        templateUrl: 'templates/calificarServicio.html',
        controller: 'AccidentesCalificarCtrl'
      }
    }
  })

  .state('tab.animalesSueltos', {
    url: '/animalesSueltos',
    views: {
      'tab-animalesSueltos': {
        templateUrl: 'templates/tab-animalesSueltos.html',
        controller: 'AnimalesSueltosCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});
