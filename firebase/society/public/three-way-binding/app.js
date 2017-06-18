'use strict';

var app = angular.module('firebaseApp', [
  'ngRoute',
  'firebase'
]);

// this is the Firebase URL we'll be talking to
// in case of your Firebase account, please modify
// the below URL appropriately
app.constant('FIREBASE_URI', 'https://society-5df42.firebaseio.com/');

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'main.html'
    })
    .when('/buildings', {
      templateUrl: 'building/buildings.tpl.html',
      controller: 'BuildingsCtrl'
    })
    .when('/buildings/:buildingIndex', {
      templateUrl: 'building/building.tpl.html',
      controller: 'BuildingCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
