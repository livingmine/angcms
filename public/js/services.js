'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.factory('trainingsFactory', ['$http', function($http){
	return {
		getTrainings: function(){
			return $http.get('/api/trainings');
		},
		
		saveTraining: function(trainingData){
			var id = trainingData._id;
			
			if(id === 0){
				return $http.post('/api/trainings/add', trainingData);
			}
			else{
				return $http.post('/api/trainings/update', trainingData);
			}
		},
		deleteTraining: function(id){
			return $http.get('/api/trainings/delete/' + id);
		},
		getTrainingContent: function(id){
			return $http.get('/api/trainings/details/' + id);
		}
	};
}])
.factory('AuthService', ['$http', function($http){
	return {
		login: function(credentials){
			return $http.post('/api/login', credentials);
		},
		logout: function(){
			return $http.get('/api/logout');
		}
	};
}]);
