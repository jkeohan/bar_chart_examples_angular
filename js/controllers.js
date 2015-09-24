myApp.controller('OverviewController', function($scope, $http, $interval, $window) {
  angular.element($window).on('resize', function(){ $scope.$apply() })

	 var data = d3.range(~~(Math.random() * 10)).map(function(d){ 
      	return ~~(Math.random() * 80 + 10 ) } );
	 data.unshift(10)
   $scope.barData = data;    
	 // $http.get('barData.json').then(function(response){
  //     // your API would presumably be sending new data, not the same
  //     // data each time!
  //      var data = d3.range(~~(Math.random() * 10)).map(function(d){ 
  //     	return ~~(Math.random() * 80 +10 ) } );
  //     $scope.barData = data;
  //     }, function(err){
  //     throw err;
  //   });
  $interval(function(){
      var data = d3.range(~~(Math.random() * 10)).map(function(d){ 
      	return ~~(Math.random() * 80 + 10 ) } );
      data.unshift(10)
      $scope.barData = data;
  	}, 3000);
});

myApp.controller('MainCtrl', function($scope, $http, $interval){
	// d3.json("donut-data-api.json", function(d) { console.log(d)})
  $interval(function(){
    $http.get('donut-data-api.json').then(function(response){
      // your API would presumably be sending new data, not the same
      // data each time!
      var data = response.data.map(function(d){ return d * ( 1 - Math.random() / 10) });
      $scope.donutData = data;
    }, function(err){
      throw err;
    });
  }, 1000);
});

// original code from video series
// programControllers.controller('OverviewController', ['$scope', '$http', function($scope, $http) {
//   $http.get('js/programoverview/data/cm_sampledata.csv').success(function(data) {
//     $scope.artists = data;
//     $scope.artistOrder = 'name';
//   });
// }]);


myApp.controller('ScatterCtrl', function($scope, $window){
  angular.element($window).on('resize', function(){ $scope.$apply() })
  // world's largest employers
  // source: https://en.wikipedia.org/wiki/List_of_largest_employers
  $scope.employers = [
      { value: 3.2, name: 'United States Department of Defense' }
    , { value: 2.3, name: 'People\'s Liberation Army' }
    , { value: 2.1, name: 'Walmart' }
    , { value: 1.9, name: 'McDonald\'s' }
    , { value: 1.7, name: 'National Health Service' }
    , { value: 1.6, name: 'China National Petroleum Corporation' }
    , { value: 1.5, name: 'State Grid Corporation of China' }
    , { value: 1.4, name: 'Indian Railways' }
    , { value: 1.3, name: 'Indian Armed Forces' }
    , { value: 1.2, name: 'Hon Hai Precision Industry (Foxconn)' }
  ]
});

