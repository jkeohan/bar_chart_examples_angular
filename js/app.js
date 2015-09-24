var myApp = angular.module('myApp', [
  'ngRoute'//turns on deep linking
  // 'programControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {//$routeProvider service
	$routeProvider.
	when('/programoverview', { //when url is referenced
		templateUrl: "partials/programoverview.html", //display this partial
		controller: 'OverviewController' //use this controller
		}).
	otherwise({
		redirectTo: '/programoverview'
	});
}]);

// var myApp = angular.module('myApp', []);

// When AngularJS is used to compile HTML, the workflow typically looks something like this:
// compile - top-down.
// link - bottom-up.
// $digest - top-down (repeat until no dirty data).
