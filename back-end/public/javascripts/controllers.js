var myApp = angular.module('deoxyApp',[]);

myApp.controller('mainController', ['$scope', function($scope) {
 function mainController ($scope, $http){
	$scope.geneData = {};

	return $http.get('localhost/api/genes')
	.then(function(response){
		return response.data
		console.log(data)
	})
	}
}]);
