var scientistsApp = angular.module('scientistsApp', ['ngRoute', 'ngAnimate']);
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
    .otherwise({
      redirectTo: '/scientists'
    });
});
scientistsApp.controller('mainController', ['$scope','$http', function($scope, $http) {
	// GET =====================================================================
	// when landing on the page, get all scientists and show them
	// use the service to get all the todos

}]);

// retrieve all scientists in the scope
scientistsApp.controller('listController', function($scope, $http){
  $http.get('../../dataset.json')
		.success(function(data) {
			$scope.scientists = data.instances;
		});
});

// retrieve one scientist in the scope
scientistsApp.controller('detailController', function($scope, $http, $routeParams){
  $http.get('../../dataset.json')
		.success(function(data) {
			$scope.scientist = data.instances[$routeParams.id];
		});
});
