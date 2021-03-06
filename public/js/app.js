'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
	'ngCookies',
	'message.flash'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/admin/login', {
		templateUrl: 'partials/admin/login.html',
		controller: 'AdminLoginCtrl'
	});
	$routeProvider.when('/admin/trainings',{
		templateUrl: 'partials/admin/trainings.html',
		controller: 'AdminPagesCtrl'
	});
	$routeProvider.when('/admin/add-edit-page/:id',{
		templateUrl: 'partials/admin/add-edit-page.html',
		controller: 'AddEditPageCtrl'
	});
	$routeProvider.otherwise({
		redirectTo: '/'
	});
	
	
	$locationProvider.html5Mode(true);
}]);
