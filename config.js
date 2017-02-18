// define the angular app
var scientistsApp = angular.module('scientistsApp', ['ngRoute', 'ngAnimate']);

// configure client routes
scientistsApp.config(function($routeProvider){
  $routeProvider
    .when('/scientists', {
      templateUrl: 'scientist/client/list.html',
      controller: 'listController'
    })
    .when('/scientists/:id', {
      templateUrl: 'scientist/client/detail.html',
      controller: 'detailController'
    })
	.when('/fields', {
      templateUrl: 'scientist/client/field-list.html',
      controller: 'fieldController'
    })
    .otherwise({
      redirectTo: '/fields'
    });
});

// main page controller
scientistsApp.controller('mainController', ['$scope','$http', function($scope, $http) {
}]);

// retrieve all scientists in the scope
scientistsApp.controller('listController', function($scope, $http){
  $scope.loading = true;
  $http.get('/api/scientists')
		.success(function(data) {
			$scope.scientists = data;
      $scope.loading = false;
		});
});

// retrieve one scientist in the scope
scientistsApp.controller('detailController', function($scope, $http, $routeParams){
  $scope.loading = true;
  $http.get('/api/scientists/'+$routeParams.id)
		.success(function(data) {
			$scope.scientist = data;
      $scope.loading = false;
		});
});

// retrieves all the fields
scientistsApp.controller('fieldController', function($scope, $http){
	$scope.loading = true;
	  $http.get('/api/fields')
		.success(function(data) {
			$scope.fields = data;
      $scope.loading = false;
		});
});

// the loading animation component
scientistsApp.component('loadingAnimation', {
  template: '<div class="science"><div class="ring-container"><span class="ring-grey"></span><span class="ring-orange"></span><span class="ring-blue"></span></div></div>'
})

// this is used to clean messy strings
scientistsApp.filter('cleanString', function () {
  return function (input) {
      input = input.toString().replace(/_/g, ' ');
      return input.toString().replace(/,/g, ' | ');
  };
});
