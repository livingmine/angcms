'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('AdminPagesCtrl', ['$scope', '$log', 'trainingsFactory', function($scope, $log, trainingsFactory) {
		trainingsFactory.getTrainings().then(
		function(res){
			$scope.allTrainings = res.data;
		},
		function(err){
			$log.error(err);
		});
		
		$scope.deleteTraining = function(id){
			trainingsFactory.deleteTraining(id);
		};
  }])
	.controller('AdminLoginCtrl', ['$scope', '$location', '$cookies', 'AuthService', 'flashMessageService', '$log', 
	function($scope, $location, $cookies, AuthService, flashMessageService, $log){
		$scope.credentials = {
			username: '',
			password: ''
		};
		$scope.login = function(credentials){
			AuthService.login(credentials).then(
				function(res, err){
					$cookies.loggedInUser = res.data;
					$location.path('/admin/trainings');
				},
				function(err){
					flashMessageService.setMessage(err.data);
					$log.log(err);
				}
			);
		};
	}]);
