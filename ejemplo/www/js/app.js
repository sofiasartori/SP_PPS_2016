// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic.cloud', 'ngMap', 'starter.controllers', 'starter.services', 'ngCordova', 'chart.js'])

.run(function($ionicPlatform, $ionicPush) {
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
  
  })
  $ionicPush.register().then(function(t) {
    return $ionicPush.saveToken(t);
  }).then(function(t) {
    console.log('Token saved:', t.token);
  });
  
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicCloudProvider) {
  $ionicConfigProvider.tabs.position('bottom'); 

  $ionicCloudProvider.init({
        "core": {
          "app_id": "2b129210"
        },
        "push": {
          "sender_id": "279922254509",
          "pluginConfig": {
            "android": {
              "iconColor": "#343434"
            }   
          }
        }
  });
  
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
  })
  .state('tab.mapaAnimales', {
    url: '/tab.mapaAnimales',
    views: {
      'tab-animalesSueltos': {
        templateUrl: 'templates/mapaAnimales.html',
        controller: 'MapaAnimalesCtrl'
      }
    }
  })
  .state('tab.analiticasAnimales', {
    url: '/tab.analiticasAnimales',
    views: {
      'tab-animalesSueltos': {
        templateUrl: 'templates/analiticasAnimales.html',
        controller: 'AnaliticasAnimalesCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/login');

});
