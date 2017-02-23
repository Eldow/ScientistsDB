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
  $scope.search="";
}]);

// retrieve all scientists in the scope
scientistsApp.controller('listController', function($scope, $http){
  $scope.loading = true;
  $http.get('/api/scientists')
		.success(function(data) {
			var scientistsData = data;
      $scope.clicked = "";
      scientistsData.sort();
      $scope.scientists = {};
      for (var elem of scientistsData){
        if(elem.label){
          if(elem.label.charCodeAt(0)){
            if(elem.label.charCodeAt(0) > 47 && elem.label.charCodeAt(0) < 58){
              if (!$scope.scientists['0-9']){
                $scope.scientists['0-9'] = new Array();
              }
              $scope.scientists['0-9'].push(elem);
            }else{
              if (!$scope.scientists[elem.label.charAt(0)]){
                $scope.scientists[elem.label.charAt(0)] = new Array();
              }
              $scope.scientists[elem.label.charAt(0)].push(elem);
            }
          }
        }

      }
      $scope.categoryClicked = function(key){
        if($scope.clicked == key){
          $scope.clicked = "";
        }else{
          $scope.clicked = key;
        }
      }
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
      $scope.clicked = "";
      filterData.sort();
       $scope.fields = {};
        for (var elem of filterData){
          if(elem.charCodeAt(0)){
            if(elem.charCodeAt(0) > 47 && elem.charCodeAt(0) < 58){
              if (!$scope.fields['0-9']){
                $scope.fields['0-9'] = new Array();
              }
              $scope.fields['0-9'].push(elem);
            }else{
              if (!$scope.fields[elem.charAt(0)]){
                $scope.fields[elem.charAt(0)] = new Array();
              }
              $scope.fields[elem.charAt(0)].push(elem);
            }
          }
        }
        $scope.loading = false;
		});
    $scope.categoryClicked = function(key){
      if($scope.clicked == key){
        $scope.clicked = "";
      }else{
        $scope.clicked = key;
      }
    }
});

// retrieve one scientist in the scope
scientistsApp.controller('fieldListController', function($scope, $http, $routeParams){
  $scope.loading = true;
  $http.get('/api/fields/'+$routeParams.label)
		.success(function(data) {
      var scientistsData = data;
      $scope.clicked = "";
      scientistsData.sort();
      $scope.scientists = {};
      for (var elem of scientistsData){
        if(elem.label){
          if(elem.label.charCodeAt(0)){
            if(elem.label.charCodeAt(0) > 47 && elem.label.charCodeAt(0) < 58){
              if (!$scope.scientists['0-9']){
                $scope.scientists['0-9'] = new Array();
              }
              $scope.scientists['0-9'].push(elem);
            }else{
              if (!$scope.scientists[elem.label.charAt(0)]){
                $scope.scientists[elem.label.charAt(0)] = new Array();
              }
              $scope.scientists[elem.label.charAt(0)].push(elem);
            }
          }
        }
      }
      $scope.loading = false;
		}
  );
  $scope.categoryClicked = function(key){
    if($scope.clicked == key){
      $scope.clicked = "";
    }else{
      $scope.clicked = key;
    }
  }

});

// retrieves all the nationalities
scientistsApp.controller('nationalityController', function($scope, $http, $filter){
	$scope.loading = true;
	  $http.get('/api/nationalities')
		.success(function(data) {
      var filterData = data.map(function(elem){
        return $filter('cleanString')(elem);
      });
      $scope.clicked = "";
      filterData.sort();
       $scope.nationalities = {};
        for (var elem of filterData){
          if(elem.charCodeAt(0)){
            if(elem.charCodeAt(0) > 47 && elem.charCodeAt(0) < 58){
              if (!$scope.nationalities['0-9']){
                $scope.nationalities['0-9'] = new Array();
              }
              $scope.nationalities['0-9'].push(elem);
            }else{
              if (!$scope.nationalities[elem.charAt(0)]){
                $scope.nationalities[elem.charAt(0)] = new Array();
              }
              $scope.nationalities[elem.charAt(0)].push(elem);
            }
          }
        }
        $scope.loading = false;
		});
});

// retrieves scientists by nationality
scientistsApp.controller('nationalityListController', function($scope, $http, $routeParams){
	$scope.loading = true;
	  $http.get('/api/nationalities/'+$routeParams.label)
		.success(function(data) {
			var scientistsData = data;
      $scope.clicked = "";
      scientistsData.sort();
      $scope.scientists = {};
      for (var elem of scientistsData){
        if(elem.label){
          if(elem.label.charCodeAt(0)){
            if(elem.label.charCodeAt(0) > 47 && elem.label.charCodeAt(0) < 58){
              if (!$scope.scientists['0-9']){
                $scope.scientists['0-9'] = new Array();
              }
              $scope.scientists['0-9'].push(elem);
            }else{
              if (!$scope.scientists[elem.label.charAt(0)]){
                $scope.scientists[elem.label.charAt(0)] = new Array();
              }
              $scope.scientists[elem.label.charAt(0)].push(elem);
            }
          }
        }
      }
      $scope.loading = false;
		});
    $scope.categoryClicked = function(key){
      if($scope.clicked == key){
        $scope.clicked = "";
      }else{
        $scope.clicked = key;
      }
    }
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
