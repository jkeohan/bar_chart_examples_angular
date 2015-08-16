var programControllers = angular.module('programControllers', []);

programControllers.controller('OverviewController', ['$scope', '$http', function($scope, $http) {
  $http.get('js/programoverview/data/cm_sampledata.csv').success(function(data) {
    $scope.artists = data;
    $scope.artistOrder = 'name';
  });
}]);

//original code from video series
// programControllers.controller('OverviewController', ['$scope', '$http', function($scope, $http) {
//   $http.get('js/programoverview/data/cm_sampledata.csv').success(function(data) {
//     $scope.artists = data;
//     $scope.artistOrder = 'name';
//   });
}]);




