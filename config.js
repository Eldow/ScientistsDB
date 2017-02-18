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
    .when('/fields/:label', {
      templateUrl: 'scientist/client/list.html',
      controller: 'fieldListController'
    })
    .when('/nationalities',{
      templateUrl : 'scientist/client/nationality-list.html',
      controller: 'nationalityController'
    })
    .when('/nationalities/:label',{
      templateUrl : 'scientist/client/list.html',
      controller: 'nationalityListController'
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
scientistsApp.controller('fieldController', function($scope, $http, $filter){
	$scope.loading = true;
	  $http.get('/api/fields')
		.success(function(data) {
      var filterData = data.map(function(elem){
        return $filter('cleanString')(elem);
      });
			$scope.fields = filterData;
      $scope.loading = false;
		});
});

// retrieve one scientist in the scope
scientistsApp.controller('fieldListController', function($scope, $http, $routeParams){
  $scope.loading = true;
  $http.get('/api/fields/'+$routeParams.label)
		.success(function(data) {
			$scope.scientists = data;
      $scope.loading = false;
		});
});

// retrieves all the nationalities
scientistsApp.controller('nationalityController', function($scope, $http){
	$scope.loading = true;
	  $http.get('/api/nationalities')
		.success(function(data) {
			$scope.nationalities = data;
      $scope.loading = false;
		});
});

// retrieves scientists by nationality
scientistsApp.controller('nationalityListController', function($scope, $http, $routeParams){
	$scope.loading = true;
	  $http.get('/api/nationalities/'+$routeParams.label)
		.success(function(data) {
			$scope.scientists = data;
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
      input = input.toString().replace(/,/g, ' | ');
      input = input.trim();
      return input.toString().substr(0, 1).toUpperCase() + input.toString().substr(1);
  };
});
