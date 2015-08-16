var myApp = angular.module('myApp', [
  'ngRoute',//turns on deep linking
  'programControllers'
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





